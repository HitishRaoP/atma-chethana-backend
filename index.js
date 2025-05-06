import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { CounsellorRouter } from "./src/routes/councellor.route.js";
import { AuthRouter } from "./src/routes/auth.route.js";

async function init() {
  const app = express();

  app.use(express.json());

  app.use(cookieParser());

  app.use(
    cors({
      origin: `${process.env.FRONTEND_URL}`,
      methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
      credentials: true,
    })
  );

  app.use(express.urlencoded({ extended: false }));

  app.use(cors());

  app.get("/", (req, res) => {
    res.json({
      message: "Server is Up and Running",
    });
  });

  app.use("/api/user", AuthRouter);

  app.use("/api/counsellor", CounsellorRouter);

  app.listen(process.env.PORT, () => {
    console.log(`Server is Running on http://localhost:${process.env.PORT}`);
  });
}

init();
