import { pollBatchResults, submitBatch } from "../libs/judge0.lib.js";

export const executeCode = async (req, res) => {
    console.log("req", req.body);
    console.log("req.user", req.user);
    console.log("res", res.body);
    
    
    
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

        const submission = stdin.map((input) => ({
            source_code,
            language_id,
            stdin:input
        }));
        
        // Submit the batch of test cases to Judge0
        const submitResponse = await submitBatch(submission);
        
        const tokens = submitResponse.map((response) => response.token);

        // Poll for the results of the batch submission
        const results = await pollBatchResults(tokens);
        console.log("results", results);
        // Check if the results match the expected output


        // Return the result
        return res.status(200).json({ 
            message: 'Code executed successfully',
            results: submitResponse,
         });
    } catch (error) {
        console.error('Error executing code:', error);
        return res.status(500).json({ error: 'Error in code execution' });
    }
}

// Example of a function to handle the execution of code
