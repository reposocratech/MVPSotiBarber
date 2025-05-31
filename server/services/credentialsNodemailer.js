import React from "react";
import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import {fileURLToPath} from 'url'
import path from "path";
import EmailCredential from "../emails/EmailCredential.js";

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

  const htmlEmail = await render(React.createElement(EmailCredential, { email, token: tokenFP }));
  const logoPath = path.join(__dirname, '../public/images/logo/logo_texto.png')

  transporter.sendMail({
    from: "Miriam <miriamespejortega@gmail.com>",
    to: email,
    subject: "Estas son tus credenciales de la barbería",
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