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

const EmailChangePassword = ({ email, token }) =>
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
        React.createElement(Text, null, `Cambia tu contraseña pulsando aquí: `),
        React.createElement(Button, {
                  href: `http://localhost:5173/changePassword/?token=${token}`,
                  style: {
                    backgroundColor: '#8C52FF',
                    color: '#fff',
                    padding: '12px 20px',
                    borderRadius: '5px',
                    textDecoration: 'none',
                  }
                }, "Cambia tu contraseña"),
        React.createElement(Text, {
          style: {
            color: '#aaa',
            fontSize: '12px'
          }
        }, "© 2025 Soti Barber Studio - Todos los derechos reservados.")
      )
    )
  );

export default EmailChangePassword;