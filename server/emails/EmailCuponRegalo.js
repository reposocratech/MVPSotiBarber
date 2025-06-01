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

const EmailCupon = ({ email }) => 
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
        React.createElement(Heading, { style: { color: '#333' } }, "¡Has alcanzado 10 cortes! 🎉"),
        React.createElement(Text, { style: { fontSize: '16px', margin: '20px 0' } }, 
          `Hola ${email}, en Soti Barber Studio queremos agradecer su fidelidad.`
        ),
        React.createElement(Text, { style: { fontSize: '16px', marginBottom: '20px' } }, 
          "Como regalo de agradecimiento, te queremos obsequiar con  un corte totalmente gratuito. 🎁"
        ),
        React.createElement(Text, { style: { fontSize: '16px', marginBottom: '20px' } }, 
          "Así que ya sabes, no te lo pierdas y pincha en el siguiente enlace para reservar tu cita"
        ),
        React.createElement(Button, {
          href: "http://localhost:5173/contact",
          style: {
            backgroundColor: '#000',
            color: '#fff',
            padding: '12px 20px',
            borderRadius: '5px',
            textDecoration: 'none',
            fontWeight: 'bold'
          }
        }, "Contacta con nosotros"),
        React.createElement(Text, { style: { fontSize: '16px', marginBottom: '20px' } }, 
          "O si lo prefieres llámanos directamente al número"
        ),
        React.createElement(Text, { style: { fontSize: '16px', marginBottom: '20px' } }, 
          "601 53 06 39"
        ),
        React.createElement(Text, {
          style: {
            color: '#aaa',
            fontSize: '12px',
            marginTop: '30px'
          }
        }, "© 2025 Soti Barber Studio - Todos los derechos reservados.")
      )
    )
  );

export default EmailCupon;
