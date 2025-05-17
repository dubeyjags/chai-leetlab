import {db} from "../libs/db.js";
import { getLanguageName, pollBatchResults, submitBatch } from "../libs/judge0.lib.js";

export const executeCode = async (req, res) => {
    const { source_code, language_id, stdin,  expected_output, problemId } = req.body;
    const userId = req.user.id; // Extract userId from the authenticated request

    try {
        // Validate the input
        if (!Array.isArray(stdin) || 
            stdin.length === 0 || 
            !Array.isArray(expected_output) || 
            expected_output.length !== stdin.length) {
            return res.status(400).json({ error: 'Invalid and missing test cases' });
        }
        
        // prepare each test case for judge0 batch submission

        const submissions = stdin.map((input) => ({
            source_code,
            language_id,
            stdin:input
        }));
        
        // Submit the batch of test cases to Judge0
        const submitResponse = await submitBatch(submissions);
        
        const tokens = submitResponse.map((response) => response.token);

        // Poll for the results of the batch submission
        const results = await pollBatchResults(tokens);
        console.log("results", results);
        // Check if the results match the expected output

        // analyze the test cases
        let allPassed = true;
        const detailedResults = results.map((result, index) => {
            const expected = expected_output[index];
            const actual = result.stdout.trim();
            const isPassed = actual === expected;
            // console.log(`Test case ${index + 1}:input "${stdin[index]}" expected "${expected}", actual "${actual}" - ${isPassed ? 'Passed' : 'Failed'}`);
            
            if (!isPassed)  allPassed = false;
            return {
                testcase: index + 1,
                input: stdin[index],
                expected,
                actual,
                isPassed,
                stderr: result.stderr,
                compile_output: result.compile_output,
                time: result.time && result.time ? `${result.time} ms` : null,
                status: result.status.description,
                memory: result.memory && result.memory ? `${result.memory} KB` : null,
                exit_code: result.exit_code,
            };
        });
        
        // Save the results to the database (if needed)

        const submission = await db.submission.create({   
            data: {
                userId,
                problemId,
                sourceCode: source_code,
                language: getLanguageName(language_id),
                stdin: JSON.stringify(stdin),
                stdout: JSON.stringify(detailedResults.map((result) => result.actual)),
                stderr: detailedResults.some((result) => result.stderr) ? JSON.stringify(detailedResults.map((result) => result.stderr)) : null,
                compileOutput: JSON.stringify(detailedResults.map((result) => result.compile_output)),
                status: allPassed ? 'Accepted' : 'Wrong Answer',
                memory: JSON.stringify(detailedResults.map((result) => result.memory)),
                time: JSON.stringify(detailedResults.map((result) => result.time)),
            },
        });
        if (allPassed) {
            await db.ProblemSolved.upsert({
                where: { 
                    userId_problemId: {
                        userId,
                        problemId,
                    },
                 },
                 update:{},
                create: {
                    userId,
                    problemId,
                }
            });
        }
        // save individual test case results to the database
        const testCaseResults = detailedResults.map((result) => ({
            submissionId: submission.id,
            testCase: result.testcase,
            expected: result.expected,
            passed: result.isPassed,
            stderr: result.stderr,
            compileOutput: result.compile_output,
            time: result.time,
            status: result.status,
            memory: result.memory,
        }));
        await db.TestCaseResult.createMany({
            data: testCaseResults,
        });

        const submissionWithTestcase = await db.submission.findUnique({
            where: {
                id: submission.id,
            },
            include: {
                testCase: true,
            },
        });

 
        // Return the result
        return res.status(200).json({ 
            success: true,
            message: 'Code executed successfully',
            submission: submissionWithTestcase,
         });
    } catch (error) {
        console.error('Error executing code:', error);
        return res.status(500).json({ error: 'Error in code execution' });
    }
}

// Example of a function to handle the execution of code
