import React from 'react';
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

const EmailCredential = ({ email, token }) =>
  React.createElement(Html, null,
    React.createElement(Head),
    React.createElement(Body, { style: { backgroundColor: '#F4F4F4', padding: '20px' } },
      React.createElement(Container, {
        style: {
          backgroundColor: '#fff',
          padding: '30px',
          borderRadius: '8px',
          textAlign: 'center'
        }
      },
        React.createElement(Img, {
          src: "cid:logoSoti",
          width: "100",
          alt: "Logo Soti",
          style: { margin: '0 auto 20px' }
        }),
        React.createElement(Heading, null, "Soti Barber Studio"),
        React.createElement(Text, null, `Bienvenid@ al equipo`),
        React.createElement(Text, null, `Nos alegra darte la bienvenida a nuestro equipo. A continuación, encontrarás tus credenciales de acceso para comenzar a formar parte de esta gran familia.`),
        React.createElement(Text, null, `email: ${email}`),
        React.createElement(Text, null, `contraseña: 1234Ss$`),
        React.createElement(Text, null, `Recuerda cambiar tu contraseña al iniciar sesión`),
        React.createElement(Text, {
          style: {
            color: '#aaa',
            fontSize: '12px'
          }
        }, "© 2025 Soti Barber Studio - Todos los derechos reservados.")
      )
    )
  );

export default EmailCredential;