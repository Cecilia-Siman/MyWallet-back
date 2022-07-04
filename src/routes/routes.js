import express from 'express';
import registerRouter from './registerRoute.js';
import loginRouter from './loginRoute.js';
import profitRouter from './profitRoute.js';
import lossRouter from './lossRoute.js';
import expensesRouter from './expensesRoute.js';

const router = express.Router();
router.use(registerRouter);
router.use(loginRouter);
router.use(profitRouter);
router.use(lossRouter);
router.use(expensesRouter);
export default router;