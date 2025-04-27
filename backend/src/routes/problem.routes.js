import express from 'express';
import { createProblem, getProblems, getProblemById, updateProblem, deleteProblem } from '../controllers/problem.controller.js';

const problemRoutes = express.Router();

problemRoutes.post('/create-problem', createProblem);
problemRoutes.get('/get-problems', getProblems);
problemRoutes.get('/get-problem/:id', getProblemById);
problemRoutes.put('/update-problem/:id', updateProblem);
problemRoutes.delete('/delete-problem/:id', deleteProblem);


export default problemRoutes;