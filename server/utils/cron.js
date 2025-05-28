import cron from 'node-cron';

export const felicitar = () => cron.schedule('0 10 * * *', async()=>{
  try {
    /* const cumples = await obtenerCumples(); */
    /* await enviarCumples(cumples); */
    console.log("Feliz cumpleaños");
    

  } catch (error) {
    console.log(error);
    
  }
})