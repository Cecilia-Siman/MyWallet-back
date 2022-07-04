import express from 'express';
import { postLoss } from '../controllers/lossController.js';

const lossRouter = express.Router();
lossRouter.post('/saida', postLoss);
export default lossRouter;