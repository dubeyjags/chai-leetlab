import { db } from "../libs/db.js";
import { getjudge0LanguageId, submitBatch } from "../libs/judge0.lib.js";

export const createProblem = async (req, res) => {
    // get all the data from the request body
    const { title, description, difficulty , tags, examples,constraints,hints, editorials, testcases, codeSnippets,referenceSolutions } = req.body;
    // 
    if (req.user.role !== "ADMIN") {
        return res.status(403).json({ message: "You are not allowed to create a problem" });        
    }
    
    try {
        for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
            
        const languageId = getjudge0LanguageId(language);
        if (!languageId) {
            return res.status(400).json({ message: `Language ${language} is not supported` });  
        }
        const submission = testcases.map((input,output) => ({
            input: input,
            output: output,
            languageId: languageId,
            source_code: solutionCode
        }));
        const submissionResult = await submitBatch(submission);
        console.log('submissionResult', submissionResult);

        const tokens = await submissionResult.map((result) => result.token);
        console.log('tokens', tokens);

        const  results = await pollBatchResults(tokens);

        for (let index = 0; index < results.length; index++) {
            const result = results[index];
            if (result.status.id !== 3) {
                return res.status(400).json({ message: `Test case ${index + 1} failed` });
            }
        }

        const problem = await db.problem.create({
            data: {
                title,
                description,
                difficulty,
                tags,
                examples,
                constraints,
                hints,
                editorials,
                testcases,
                codeSnippets,
                referenceSolutions,
                userId: req.user.id,
            }
        });

        return res.status(201).json({ message: "Problem created successfully", problem });

    }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
        
    }
    
}
export const getProblems = async (req, res) => {
    console.log('getProblems called');
    console.log(req.body);
}
export const getProblemById = async (req, res) => {
    console.log('getProblemById called');
    console.log(req.body);
    console.log(req.params.id);
}
export const updateProblem = async (req, res) => {
    console.log('updateProblem called');
    console.log(req.body);
    console.log(req.params.id);
    console.log(req.params.problemId);
}
export const deleteProblem = async (req, res) => {
    console.log('deleteProblem called');
    console.log(req.body);
    console.log(req.params.id);
    console.log(req.params.problemId);
}

export const getSolvedProblems = async (req, res) => {
    console.log('getSolvedProblems called');
    console.log(req.body);
}