import React from "react";
import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";
import EmailCupon from "../emails/EmailCuponRegalo.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "miriamespejortega@gmail.com",
    pass: "ulpmynrvlgmudkqc"
  },
});

const enviarCuponRegalo = async (email, name) => {
  try {
    const htmlEmail = await render(
      React.createElement(EmailCupon, { email, name })
    );

    const logoPath = path.join(__dirname, "../public/images/logo/logo_texto.png");

    await transporter.sendMail({
      from: "Miriam <miriamespejortega@gmail.com>",
      to: email,
      subject: "🎁 ¡Enhorabuena, Aquí tienes tu corte gratuito!",
      text:"Gracias por tu fidelidad, no te olvides de canjear tu regalo en la próxima visita",
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

export default enviarCuponRegalo;
