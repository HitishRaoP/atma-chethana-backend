import "dotenv/config";
import express from "express";
import cors from "cors";
import { SERVER_CONSTANTS } from "./src/constants/server-constants.js";

async function init() {
  const app = express();

  app.use(express.json());

  app.use(cors());

  app.get("/", (req, res) => {
    res.json({
      message: "Server is Up and Running",
    });
  });

  app.listen(SERVER_CONSTANTS.PORT, () => {
    console.log(`Server is Running on http://localhost:${SERVER_CONSTANTS.PORT}`);
  });
}

init();
