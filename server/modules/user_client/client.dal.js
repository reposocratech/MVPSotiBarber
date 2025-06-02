import executeQuery from "../../config/db.js";

class ClientDal {
  findUserByEmail = async (email) => {
    try {
      let sql = 'select user_id from user where email = ?';
      let result = await executeQuery(sql, [email]);
      return result;
    } catch (error) {
      throw error;
    }
  };

  register = async (data) => {
    try {
      const { email, hashedPassword } = data;
      let values = [email, hashedPassword];
      let sql = 'insert into user (email, password) values (?,?)';
      await executeQuery(sql, values);
    } catch (error) {
      throw { message: 'error de bd' };
    }
  };
  
  findUserByEmailLogin = async (email) => {
    try {
      let sql =
        'SELECT user_id, password, user_is_confirmed FROM user WHERE email = ? AND user_is_deleted = 0';
      let result = await executeQuery(sql, [email]);
      return result;
    } catch (error) {
      throw error;
    }
  };

  findUserById = async (id) => {
    try {
      let sql = 'SELECT * FROM user WHERE user_id = ? AND user_is_deleted = 0';
      let result = await executeQuery(sql, [id]);

      return result;
    } catch (error) {
      throw { message: 'error de bd' };
    }
  };

  findPasswordById = async (user_id) => {
    try {
      let sql =
        'select password from user where user_id = ? and user_is_deleted = 0';
      return await executeQuery(sql, [user_id]);
    } catch (error) {
      throw error;
    }
  };

  passRecovery = async (hashedPassword, user_id) => {
    try {
      let sql = 'update user set password = ? where user_id = ?';
      await executeQuery(sql, [hashedPassword, user_id]);
    } catch (error) {
      throw error;
    }
  };

  confirmAccount = async (user_id) => {
    try {
      let sql = 'update user set user_is_confirmed = 1 where user_id = ?';
      await executeQuery(sql, [user_id]);
    } catch (error) {
      throw error;
    }
  };

  completeFormRegister = async (data, user_id) => {
    const { user_name, lastname, birthdate, phone } = data;
    let values = [user_name, lastname, birthdate, phone, user_id];
    try {
      let sql =
        'update user set user_name = ?, lastname = ?, birth_date = ?, phone = ? where user_id = ? ';
      await executeQuery(sql, values);
    } catch (error) {
      throw error;
    }
  };

  editClient = async (data) => {
    const { user_id, user_name, lastname, birth_date, phone } = data.data;

    try {
      let sql =
        'UPDATE user SET user_name=?, lastname=?, birth_date=?,phone=? WHERE user_id = ?';
      let values = [user_name, lastname, birth_date, phone, user_id];

      if (data.avatar) {
        sql =
          'UPDATE user SET user_name=?, lastname=?, birth_date=?, phone=?, avatar=? WHERE user_id = ?';
        values = [
          user_name,
          lastname,
          birth_date,
          phone,
          data.avatar.filename,
          user_id,
        ];
      }

      await executeQuery(sql, values);
    } catch (error) {
      throw error;
    }
  };

  findAppointmentsByClientId = async (clientId) => {
    try {
      const sql = `SELECT a.start_date, s.service_name AS tipo_cita,
      CONCAT(u.user_name, ' ', u.lastname) AS empleado,
       s.price AS precio,
      s.service_name AS nombre_servicio,
      a.status
      FROM appointment a
      JOIN service s ON s.service_id = a.service_id
      JOIN user u ON u.user_id = a.employee_user_id
      WHERE a.client_user_id = ?
      ORDER BY a.start_date DESC;
    `;
      const result = await executeQuery(sql, [clientId]);
      return result;
    } catch (error) {
      throw error;
    }
  };

  countCortesByClientId = async (clientId) => {
  try {
    const sql = `
      SELECT COUNT(*) AS totalCortes
      FROM appointment a
      JOIN service s ON s.service_id = a.service_id
      WHERE a.client_user_id = ?
        AND a.status NOT IN (2, 3)
        AND (
          LOWER(s.service_name) LIKE 'corte%' OR
          LOWER(s.service_name) LIKE '% corte%' OR
          LOWER(s.service_name) LIKE 'rapado%' OR
          LOWER(s.service_name) LIKE '% rapado%'
        )
    `;
    const result = await executeQuery(sql, [clientId]);
    return result[0].totalCortes;
  } catch (error) {
    throw error;
  }
};

  getImages = async()=>{
    try {
      let sql = 'SELECT * FROM image WHERE image_is_deleted = 0'
      let result = await executeQuery(sql)
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }




}

export default new ClientDal();