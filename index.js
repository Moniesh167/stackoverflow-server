import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import admin from 'firebase-admin'
import { initializeApp } from 'firebase-admin/app';
export const Admin = admin
const credential = Admin.credential;
import { Stripe } from 'stripe'

import userRoutes from "./routes/users.js";
import questionRoutes from "./routes/Questions.js";
import answerRoutes from "./routes/Answers.js";
import connectDB from "./connectMongoDb.js";
import callRoutes from './routes/calls.js'
import PlanRoutes from './routes/plan.js';

dotenv.config();
const app = express();
export const stripe = new Stripe(process.env.STRIPE_KEY);
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
connectDB();

// app.use('/',(req, res) => {
//     res.send("This is a stack overflow clone API")
// })




initializeApp({
  credential: credential.cert({
    "type": process.env.type,
    "project_id": process.env.project_id,
    "private_key_id": process.env.private_key_id,
    "private_key": process.env.private_key,
    "client_email":process.env.client_email,
    "client_id": process.env.client_id,
    "auth_uri": process.env.auth_uri,
    "token_uri": process.env.token_uri,
    "auth_provider_x509_cert_url": process.env.auth_provider_x509_cert_url,
    "client_x509_cert_url":process.env.client_x509_cert_url,
    "universe_domain": process.env.universe_domain
  }
  
  ),
  databaseURL: "https://stackoverflow-9563d-default-rtdb.asia-southeast1.firebasedatabase.app"
});

app.use("/user", userRoutes);
app.use("/questions", questionRoutes);
app.use("/answer", answerRoutes);
app.use('/calls',callRoutes)
app.use('/plan',PlanRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});


