/*import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "javisanchez800@gmail.com",
    pass: "lbesrynschzgdlij" // asegúrate de usar una contraseña de aplicación
  }
});

function sendContactEmail(name, email, message) {
  const contenidomensaje = `
    <div>
      <h2>Nuevo mensaje de contacto</h2>
      <p>Nombre: ${name}</p>
      <p>Email: ${email}</p>
      <p>Mensaje:<br/>${message}</p>
    </div>
  `;

  return transporter.sendMail({
    from: "Javi <javisanchez800@gmail.com>",
    to: email,
    subject: "Nuevo mensaje desde el formulario de contacto",
    //text:  te ha enviado un mensaje`, // fallback
    html: contenidomensaje
  });
}

export default sendContactEmail; */
