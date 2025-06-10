import React from "react";
import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import {fileURLToPath} from 'url'
import path from "path";
import EmailConfirm from "../emails/EmailConfirm.js";

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

async function sendMail(email, tokenconfirm){

  const htmlEmail = await render(React.createElement(EmailConfirm, { email, token: tokenconfirm }));
  const logoPath = path.join(__dirname, '../public/images/logo/logo_texto.png')

  transporter.sendMail({
    from: `Soti Barber Studio <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Confirma tu cuenta - Soti Barber Studio",
    text: "Por favor, confirma tu cuenta haciendo clic en el botón del correo.",
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

  







export default sendMail;