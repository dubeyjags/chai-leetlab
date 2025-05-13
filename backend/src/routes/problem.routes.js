import express from 'express';
import { createProblem, getProblems, getProblemById, updateProblem, deleteProblem, getSolvedProblems } from '../controllers/problem.controller.js';
import { authMiddleware, checkAdmin } from '../middlewares/auth.middleware.js';

const problemRoutes = express.Router();

problemRoutes.post('/create-problem',authMiddleware, checkAdmin, createProblem);
problemRoutes.get('/get-problems', authMiddleware, getProblems);
problemRoutes.get('/get-problem/:id', authMiddleware, getProblemById);
problemRoutes.put('/update-problem/:id', authMiddleware, checkAdmin, updateProblem);
problemRoutes.delete('/delete-problem/:id', authMiddleware, checkAdmin, deleteProblem);
problemRoutes.get('/get-solved-problems', authMiddleware, getSolvedProblems);

export default problemRoutes;