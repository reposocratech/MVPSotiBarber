import React from "react";
import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import EmailBirthday from "../emails/EmailBirthday.js";
import path from "path";
import { fileURLToPath } from "url";

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
});

const sendBirthdayMail = async (email, name) => {
  try {
    const htmlEmail = await render(
      React.createElement(EmailBirthday, { email, name })
    );

    const logoPath = path.join(__dirname, "../public/images/logo/logo_texto.png");

    await transporter.sendMail({
      from: `Soti Barber Studio <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🎂 ¡Feliz cumpleaños!",
      html: htmlEmail,
      attachments: [
        {
          filename: "logoSoti.png",
          path: logoPath,
          cid: "logoSoti",
        },
      ],
    });

  } catch (error) {
    console.error(`Error al enviar a ${email}:`, error);
  }
};

export default sendBirthdayMail;
