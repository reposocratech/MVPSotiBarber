import cron from 'node-cron';
import { obtenerCumples } from './obtenerCumples.js';
import sendBirthdayMail from '../services/felicitacionNodemailer.js';

export const felicitar = () => cron.schedule('0 10 * * *', async()=>{
  try {
    const cumples = await obtenerCumples(); 

    if(cumples.length === 0){
      console.log("Hoy no hay cumpleaños");
      
    }
    for (const usuario of cumples) {
      
      await sendBirthdayMail(usuario.email, usuario.user_name); 
      console.log("Feliz cumpleaños");
    }
    

  } catch (error) {
    console.log(error);
    
  }
})