// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: "javisanchez800@gmail.com",
//     pass: "lbesrynschzgdlij" // asegúrate de usar una contraseña de aplicación
//   }
// });

// function sendContactEmail(name, email, message) {
//   const contenidomensaje = `
//     <div>
//       <h2>Nuevo mensaje de contacto</h2>
//       <p>Nombre: ${name}</p>
//       <p>Email: ${email}</p>
//       <p>Mensaje:<br/>${message}</p>
//     </div>
//   `;

//   return transporter.sendMail({
//     from: "Javi <javisanchez800@gmail.com>",
//     to: "javisanchez800@gmail.com", //luego poner simplemente email
//     subject: "Nuevo mensaje desde el formulario de contacto",
//     html: contenidomensaje
//   });
// }

// export default sendContactEmail; 

import React from "react";
import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import {fileURLToPath} from 'url'
import path from "path";
import EmailContact from "../emails/EmailContact.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "javisanchez800@gmail.com",
    pass: "lbesrynschzgdlij"
  }
})

async function sendMailContact(name, email, message){

  const htmlEmail = await render(React.createElement(EmailContact, { name, email, message }));
  const logoPath = path.join(__dirname, '../public/images/logo/logo_texto.png')

  transporter.sendMail({
    from: "Miriam <miriamespejortega@gmail.com>",
    to: email,
    subject: "Nuevo mensaje de contacto",
    text: ``,
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

  







export default sendMailContact;