import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import router from './src/routes/routes.js';

const server = express();
server.use(cors());
server.use(express.json());
dotenv.config();

server.use(router);

server.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
});