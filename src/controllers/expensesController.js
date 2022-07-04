import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

const server = express();
server.use(cors());
server.use(express.json());
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URL);

let db;
mongoClient.connect().then(() => {
	db = mongoClient.db("chat");
});


export async function getExpenses(req, res) {

    const token = req.headers.token;
    const userSession = await db.collection("sessions").findOne({token});

    if(userSession) {
        const expenses = await db.collection("expenses").find({email:userSession.email}).toArray();
        res.status(201).send(expenses);
        console.log(expenses);
    }
    else{
        res.status(422).send();
    }
}