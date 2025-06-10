import React from "react";
import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import {fileURLToPath} from 'url'
import path from "path";
import EmailCredential from "../emails/EmailCredential.js";

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

  const htmlEmail = await render(React.createElement(EmailCredential, { email, token: tokenFP }));
  const logoPath = path.join(__dirname, '../public/images/logo/logo_texto.png')

  transporter.sendMail({
    from: `Soti Barber Studio <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Bienvenido al equipo 🎉",
    text: `email: ${email}
    password: 1234Ss$
    Por favor, cambia la contraseña accediendo <a href='http://localhost:5173/changePassword/?token=${tokenFP}'>aquí</a>`,
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