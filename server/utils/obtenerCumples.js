import executeQuery from '../config/db.js'


export const obtenerCumples = async ()=>{
  
     let sql =  `
    SELECT user_id, user_name, lastname, email, birth_date
    FROM user
    WHERE DATE_FORMAT(birth_date, '%m-%d') = DATE_FORMAT(CURDATE(), '%m-%d')
    AND user_is_deleted = 0
  `;

  try {
    const result = await executeQuery(sql);
    return result;
  } catch (error) {

    console.log('Error al obtener cumples', error);
    
    
  }
} 