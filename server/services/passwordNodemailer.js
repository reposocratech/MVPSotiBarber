import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "miriamespejortega@gmail.com",
    pass: "ulpmynrvlgmudkqc"
  }
})

function sendMailPassword(email, tokenFP){
  let mensaje = `
    <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <div style='background-color: yellow';>
      <h1>Cambia tu contraseña accediendo <a href="http://localhost:5173/changePassword/?token=${tokenFP}">aquí</a></h1>
    </div>
  </body>
  </html> 
  `

  transporter.sendMail({
    from: "Miriam <miriamespejortega@gmail.com>",
    to: email,
    subject: "bienvenid@",
    text: "hola", /* si hay un fallo al mandar el html se manda este texto */
    html: mensaje
  })
}

export default sendMailPassword;