import express from 'express';
import { postProfit } from '../controllers/profitController.js';

const profitRouter = express.Router();
profitRouter.post('/entrada', postProfit);
export default profitRouter;