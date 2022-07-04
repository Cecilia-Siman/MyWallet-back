import express from 'express';
import registerRouter from './registerRoute.js';
import loginRouter from './loginRoute.js';
import profitRouter from './profitRoute';
import lossRouter from './lossRoute';

const router = express.Router();
router.use(registerRouter);
router.use(loginRouter);
router.use(profitRouter);
router.use(lossRouter);
export default router;