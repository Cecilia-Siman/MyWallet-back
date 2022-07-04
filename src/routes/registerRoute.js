import express from 'express';
import { postRegister } from '../controllers/registerController.js';

const registerRouter = express.Router();
registerRouter.post('/cadastro', postRegister);
export default registerRouter;