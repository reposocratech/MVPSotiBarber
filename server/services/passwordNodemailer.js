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
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "miriamespejortega@gmail.com",
    pass: "ulpmynrvlgmudkqc"
  }
})

async function sendMailCredential(email, tokenFP){

  const htmlEmail = await render(React.createElement(EmailChangePassword, { email, token: tokenFP }));
  const logoPath = path.join(__dirname, '../public/images/logo/logo_texto.png')

  transporter.sendMail({
    from: "Miriam <miriamespejortega@gmail.com>",
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