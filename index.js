import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// import { SERVER_CONSTANTS } from "./src/constants/server-constants.js";

import connectDB  from './src/db/db.js';


import userRouter from './src/routes/authRoutes.js';

import counsellorRouter from './src/routes/councellorRoute.js';



async function init() {
  const app = express();

  const corsOptions = {
    origin:`${process.env.FRONTEND_URL}`,
    methods:"GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials:true,
  }


  app.use(express.json());
  app.use(cookieParser());
  app.use(cors(corsOptions));
  app.use(express.urlencoded({extended:false}));

  connectDB();

  app.get("/", (req, res) => {
    res.json({
      message: "Server is Up and Running",
    });
  });


  app.use('/api/user',userRouter);
  app.use('/api/counsellor',counsellorRouter);


  app.listen(process.env.PORT, () => {
    console.log(`Server is Running on http://localhost:${process.env.PORT}`);
  });
}

init();
