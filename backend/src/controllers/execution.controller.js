import { pollBatchResults, submitBatch } from "../libs/judge0.lib.js";

export const executeCode = async (req, res) => {
    const { code, language, stdin,  expected_output, problemId } = req.body;
    const userId = req.user.id; // Extract userId from the authenticated request

    try {
        // Validate the input
        if (!code || !language || !stdin || !expected_output || !problemId) {
            return res.status(400).json({ error: 'Invalid and missing testcases' });
        }
        const submission = {
            code,
            language,
            stdin,
            expected_output,
            base64_encoded: false,
            wait: false,
        };
        // Execute the code using a third-party service or library
        const results = await submitBatch(submission);

        const tokens = results.map((result) => result.token);

        const submissionResult = pollBatchResults(tokens);

        console.log('submissionResult:', submissionResult);
        

        // Return the result
        return res.status(200).json({ 
            message: 'Code executed successfully',
            results: submissionResult,
         });
    } catch (error) {
        console.error('Error executing code:', error);
        return res.status(500).json({ error: 'Error in code execution' });
    }
}

// Example of a function to handle the execution of code
