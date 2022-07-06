import bcrypt from 'bcrypt';
import joi from 'joi';
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { v4 as uuid } from 'uuid';

const server = express();
server.use(cors());
server.use(express.json());
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

let db;
mongoClient.connect().then(() => {
	db = mongoClient.db("chat");
});


export async function postLogin(req, res) {
    const user = await db.collection("users").findOne({email: req.body.email});
    if(user && bcrypt.compareSync(req.body.password, user.password)) {
        const token = uuid();
        
        await db.collection("sessions").insertOne({
            userId: user._id,
            token,
            email: req.body.email,
        })
        const resObj = {
            name: user.name,
            token
        }
        res.status(201).send(resObj);
    }
    else{
        res.status(422).send(user);
        console.log("deu erro");
    }
}