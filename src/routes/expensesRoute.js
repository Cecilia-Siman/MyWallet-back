import express from 'express';
import { getExpenses } from '../controllers/expensesController.js';

const expensesRouter = express.Router();
expensesRouter.get('/despesas',getExpenses);
export default expensesRouter;

