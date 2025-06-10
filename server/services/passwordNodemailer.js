import React from "react";
import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import {fileURLToPath} from 'url'
import path from "path";
import EmailCredential from "../emails/EmailCredential.js";
import EmailChangePassword from "../emails/EmailChangePassword.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: `${process.env.EMAIL_USER}`,
    pass: `${process.env.EMAIL_PASS}`
  }
})

async function sendMailCredential(email, tokenFP){

  const htmlEmail = await render(React.createElement(EmailChangePassword, { email, token: tokenFP }));
  const logoPath = path.join(__dirname, '../public/images/logo/logo_texto.png')

  transporter.sendMail({
    from: `Soti Barber Studio <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Cambio de contraseña",
    text: "",
    html: htmlEmail,
    attachments: [
      {
        filename: "logoSoti.png",
        path: logoPath,
        cid: "logoSoti",
      },
    ],
  });
}

  







export default sendMailCredential;