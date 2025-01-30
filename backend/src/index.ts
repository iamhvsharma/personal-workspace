require("dotenv").config()

import express from "express";
import connectDB from "./db";
import { app } from "./app";

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("ERR: ", error);
      throw error;
    });

    app.listen(process.env.PORT, () => {
        console.log(`Server is serving on PORT: ${process.env.PORT}`)
    })
  })
  .catch((error) => {
    console.log(`MONGODB Connection failed!`, error);
  });
