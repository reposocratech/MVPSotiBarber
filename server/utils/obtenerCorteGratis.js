
export const enviarRegalo = async ()=> {

  let sql = ` SELECT a.client_user_id AS user_id, u.email, u.user_name, COUNT(*) AS total_servicios
    FROM appoinment a
    LEFT JOIN service s ON a.service_id = s.service_id
    LEFT JOIN user u ON a.client_user_id = u.user_id
    WHERE a.status = 1
      AND u.user_is_deleted = 0
      AND (s.service_name LIKE '%corte%' OR s.service_name LIKE '%rapa%')
    GROUP BY a.client_user_id
    HAVING total_servicios % 10 = 0`;

     try {
    const result = await executeQuery(sql);
    return result;
  } catch (error) {
    console.error('Error al obtener clientes con recompensa:', error);
    
  }

};