import express, { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { getAllSubmissions, getAllSubmissionsForProblem, getSubmissionsForProblem } from '../controllers/submission.controller.js';

const submissionRoutes = express.Router();

submissionRoutes.get('/get-all-submissions', authMiddleware, getAllSubmissions);
submissionRoutes.get('/get-submissions/:problemId', authMiddleware, getSubmissionsForProblem);
submissionRoutes.get('/get-submissions-count/:problemId', authMiddleware, getAllSubmissionsForProblem);

export default submissionRoutes;