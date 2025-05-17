import { db } from "../libs/db.js";

export const getAllSubmissions = async (req, res) => { 
    try {
        const userId = req.user.id; // Extract userId from the authenticated request

        const submissions = await db.submission.findMany({
            where: {
                userId,
            }
        });
        res.status(200).json({
            status: "success",
            message: "Submissions fetched successfully",
            submissions,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "issue fetching submissions",
            error: error.message,
        });
    }
}

export const getSubmissionsForProblem = async (req, res) => { 
    try {
        const userId = req.user.id; // Extract userId from the authenticated request
        const { problemId } = req.params; // Extract problemId from the request parameters'
        const submissions = await db.submission.findMany({
            where: {
                userId,
                problemId
            }
        });
        
        res.status(200).json({
            status: "success",
            message: "Submissions fetched successfully",
            submissions,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Failed fetching submissions",
            error: error.message,
        });
    }
}

export const getAllSubmissionsForProblem = async (req, res) => { 
    try {
        const { problemId } = req.params; // Extract problemId from the request parameters'
        const submission = await db.submission.findMany({
            where: {
                problemId
            }
        });
        
        res.status(200).json({
            status: "success",
            message: "Submissions fetched successfully",
            count: submission,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Failed fetching submissions",
            error: error.message,
        });
    }
}
