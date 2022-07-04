import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import router from './src/routes/routes.js';

const server = express();
server.use(cors());
server.use(express.json());
dotenv.config();

server.use(router);

server.listen(5000);