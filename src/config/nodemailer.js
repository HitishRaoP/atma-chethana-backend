import nodemailer from "nodemailer";
import "dotenv/config";
import { SERVER_CONSTANTS } from "../constants/server-constants.js";


export const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  auth: {
    user: '8a038b001@smtp-brevo.com',
    pass: '2GjUdtSJNX0L91pT'
  },
});