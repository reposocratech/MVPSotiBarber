import React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Button,
  Img,
} from '@react-email/components';

const EmailBirthday = ({ email }) => 
    React.createElement(Html, null,
    React.createElement(Head),
    React.createElement(Body, { style: { backgroundColor: '#F4F4F4', padding: '20px' } },
      React.createElement(Container, {
        style: {
          backgroundColor: '#fff',
          padding: '30px',
          borderRadius: '8px'
        }
      },
        React.createElement(Img, {
          src: "cid:logoSoti",
          width: "100",
          alt: "Logo Soti"
        }),
        React.createElement(Heading, null, "Peluquería Soti"),
        React.createElement(Text, null, `Hola ${email},`),
        React.createElement(Text, null, "Gracias por registrarte en Peluquería Soti. Por favor, confirma tu correo electrónico:"),
       
        React.createElement(Text, null, "Si no solicitaste esta cuenta, puedes ignorar este correo."),
        React.createElement(Text, {
          style: {
            color: '#aaa',
            fontSize: '12px'
          }
        }, "© 2025 Peluquería Soti - Todos los derechos reservados.")
      )
    )
);

export default EmailBirthday;
