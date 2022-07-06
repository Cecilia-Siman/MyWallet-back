import joi from 'joi';
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import dayjs from 'dayjs';

const server = express();
server.use(cors());
server.use(express.json());
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

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

    const token = req.headers.token;
    const userSession = await db.collection("sessions").findOne({token});

    if(userSession && !valid.error) {
        const newExp = {
            id: userSession._id,
            amount: req.body.amount,
            type: 'profit',
            description: req.body.description,
            date: dayjs().format('DD/MM'), 
            email: userSession.email
        }
        await db.collection("expenses").insertOne(newExp);
        res.status(201).send(newExp);
    }
    else{
        res.status(422).send();
        //console.log(valid);
    }
}