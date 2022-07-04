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

const mongoClient = new MongoClient(process.env.MONGO_URL);

let db;
mongoClient.connect().then(() => {
	db = mongoClient.db("chat");
});


export async function postProfit(req, res) {
    const userSchema = joi.object({
        amount: joi.string().required().pattern(/^[0-9]{1,},[0-9]{2}$/),
        description: joi.string().required()
    })

    const valid = userSchema.validate(req.body);
    //token do header

    const userSession = await db.collection("sessions").findOne({token});
    if(userSession && valid) {
        
        await db.collection("sessions").insertOne({
            userId: user._id,
            token
        })
        const resObj = {
            name: user.name,
            token
        }
        res.status(201).send(resObj);
    }
    else{
        res.status(422).send();
        console.log("deu erro");
    }
}