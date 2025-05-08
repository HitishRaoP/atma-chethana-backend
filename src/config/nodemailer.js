import nodemailer from "nodemailer";
import "dotenv/config";
import { SERVER_CONSTANTS } from "../constants/server-constants.js";

export const transporter = nodemailer.createTransport({
  host: SERVER_CONSTANTS.SMPT.HOST,
  port: SERVER_CONSTANTS.SMPT.PORT,
  auth: {
    user: SERVER_CONSTANTS.SMPT.USER,
    pass: SERVER_CONSTANTS.SMPT.PASSWORD,
  },
});
