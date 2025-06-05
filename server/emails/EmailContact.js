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

const EmailContact = ({ name, email, message }) =>
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
        React.createElement(Text, null, `Nuevo mensaje de contacto`),
        React.createElement(Text, null, `Nombre: ${name}`),
        React.createElement(Text, null, `Email: ${email}`),
        React.createElement(Text, null, `${message}`),
        React.createElement(Text, {
          style: {
            color: '#aaa',
            fontSize: '12px'
          }
        }, "© 2025 Soti Barber Studio - Todos los derechos reservados.")
      )
    )
  );

export default EmailContact;