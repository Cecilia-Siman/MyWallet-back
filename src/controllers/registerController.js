import bcrypt from 'bcrypt';
import joi from 'joi';
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


export async function postRegister(req, res) {
    const userSchema = joi.object({
        name: joi.string().required(),
        email: joi.string().required().email(),
        password: joi.string().required().pattern(/[a-zA-Z0-9]{6,}/),
        passwordConfirm: joi.any().equal(joi.ref('password')).required().messages({ 'different password':'password does not match' }),
    });

    const valid = userSchema.validate(req.body);
    const repEmail = await db.collection("users").findOne({email: req.body.email});
    if (!valid.error  && !repEmail){
        const cryptPassword = bcrypt.hashSync(req.body.password, 10);

        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: cryptPassword,
        };

        await db.collection("users").insertOne(newUser);
        res.status(201).send();
    }
    else{
        res.status(422).send(valid.error);
        //console.log(valid.error);
    }
}