import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Payload from "./payload.js";

dotenv.config();

const app = express();
app.use(express.json());

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(
      `${process.env.DB_URI}/${process.env.DB_NAME}`
    );

    console.log(
      `MongoDB connected successfully to ${connect.connection.name} [HOST - ${connect.connection.host}]`
    );
  } catch (error) {
    console.log("Error occured while connecting to Database", error);
    process.exit(1);
  }
};

connectDB();

app.post("/send-details", async (req, res) => {
    const { drona_android_payload } = req.body;

    const new_payload = await Payload.create({drona_android_payload});

    const createdPayload = await Payload.findById(new_payload._id);

    if(createdPayload){
        res.status(200).json({message: "Successfully created payload", data: createdPayload});
    } else {
        res.status(400).json({message: "Something went wrong"});
    }
});

app.listen(8080, () => {
  console.log("Server started successfully on 8080 port");
});
