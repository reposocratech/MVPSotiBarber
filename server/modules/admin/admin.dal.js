import executeQuery, { dbPool } from '../../config/db.js';
import enviarCuponRegalo from '../../services/cuponRegaloNodemailer.js';
import deleteFile from '../../utils/fileSystem.js';
import { hashString } from '../../utils/hashUtils.js';

class AdminDal {
  findUserByEmail = async (email) => {
    try {
      let sql = 'select user_id from user where email = ?';
      let result = await executeQuery(sql, [email]);
      return result;
    } catch (error) {
      throw error;
    }
  };

  createService = async (data) => {
    try {
      const { service_name, estimated_time, price, service_description } =
        data.data;

      let sql =
        'INSERT INTO service (service_name, estimated_time, price, service_description, service_avatar) VALUES (?,?,?,?,?)';

      const service_avatar = data.img ? data.img.filename : null;

      const values = [
        service_name,
        estimated_time,
        price,
        service_description,
        service_avatar,
      ];

      const result = await executeQuery(sql, values);

      return {
        service_id: result.insertId,
        service_name,
        price,
        estimated_time,
        service_description,
        service_is_enabled: 0,
        service_avatar,
        promo_name: null,
        promo_price: null,
        promo_start_date: null,
        promo_end_date:null
      };
    } catch (error) {
      throw { message: 'error de bd' };
    }
  };

  getAllServices = async () => {
    try {
      let sql = 'SELECT * FROM service WHERE service_is_deleted = 0';
      let result = await executeQuery(sql);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  enabledService = async (id, service_is_enabled) => {
    try {
      let sql =
        'UPDATE service SET service_is_enabled = ? WHERE service_id = ?';
      let values = [service_is_enabled, id];

      await executeQuery(sql, values);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  editService = async (data) => {
    const {
      service_name,
      price,
      estimated_time,
      service_description,
      promo_name,
      promo_price,
      promo_start_date,
      promo_end_date,
      service_id,
    } = data.data;

    try {
      let sql =
        'UPDATE service SET service_name = ?, price = ?, estimated_time = ?, service_description = ?, promo_name = ?, promo_price = ?, promo_start_date = ?, promo_end_date = ? WHERE service_id = ?';

      let values = [
        service_name,
        price,
        estimated_time,
        service_description,
        promo_name,
        promo_price,
        promo_start_date,
        promo_end_date,
        service_id,
      ];

      if (data.img) {
        sql =
          'UPDATE service SET service_name = ?, price = ?, estimated_time = ?, service_description = ?, promo_name = ?, promo_price = ?, promo_start_date = ?, promo_end_date = ?, service_avatar = ? WHERE service_id = ?';

        values = [
          service_name,
          price,
          estimated_time,
          service_description,
          promo_name,
          promo_price,
          promo_start_date,
          promo_end_date,
          data.img.filename,
          service_id,
        ];
      }

      await executeQuery(sql, values);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  createEmployee = async (data) => {
    const { user_name, lastname, phone, email, password, description } =
      data.data;
    try {
      const hashedPassword = await hashString(password);

      let sql =
        'insert into user (user_name, lastname, email, phone, password, description, user_type, user_is_confirmed) values (?,?,?,?,?,?,?,?)';
      let values = [
        user_name,
        lastname,
        email,
        phone,
        hashedPassword,
        description,
        2,
        1
      ];

      if (data.img) {
        sql =
          'insert into user (user_name, lastname, email, phone, password, description, user_type, avatar) values (?,?,?,?,?,?,?,?)';
        values = [
          user_name,
          lastname,
          email,
          phone,
          hashedPassword,
          description,
          2,
          data.img.filename,
        ];
      }
      await executeQuery(sql, values);
    } catch (error) {
      throw error;
    }
  };

  getAllEmployees = async () => {
    try {
      let sql =
        'SELECT * FROM user WHERE user.user_type = 2 and user_is_deleted = 0';
      let result = await executeQuery(sql);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  enabledEmployee = async (id, user_is_enabled) => {
    try {
      let sql = 'UPDATE user SET user_is_enabled = ? WHERE user_id = ?';
      let values = [user_is_enabled, id];

      await executeQuery(sql, values);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  editEmployee = async (data) => {
    const { user_name, lastname, phone, description, user_id } = data.data;

    try {
      let sql =
        'update user set user_name = ?, lastname = ?, phone = ?, description = ? where user_id = ?';

      let values = [user_name, lastname, phone, description, user_id];

      if (data.img) {
        sql =
          'update user set user_name = ?, lastname = ?, phone = ?, description = ?, avatar = ? where user_id = ?';
        values = [
          user_name,
          lastname,
          phone,
          description,
          data.img.filename,
          user_id,
        ];
      }
      await executeQuery(sql, values);
    } catch (error) {
      throw error;
    }
  };

  clientListAppointment = async (search) => {
    try {
      let textoBuscado = search;
      let palabras = textoBuscado.split(' ');

      let sql = `select user_id, user_name, lastname, phone, email from user where user_type = 3 and user_is_deleted = 0`;

      for (let palabra of palabras) {
        sql += ` and (user_name like "%${palabra}%" or lastname like "%${palabra}%" or phone like "%${palabra}%" or email like "%${palabra}%")`;
      }

      const result = await executeQuery(sql);
      return result;
    } catch (error) {
      throw error;
    }
  };

  createAppointment = async (data) => {
  const {
    client_id,
    created_by_user_id,
    employee_id,
    end_date,
    end_hour,
    observations,
    service_id,
    start_date,
    start_hour,
  } = data;

  const connection = await dbPool.getConnection();
  try {
    await connection.beginTransaction();

    const [res] = await connection.query(
      'SELECT IFNULL(MAX(appointment_id), 0) AS max_id FROM appointment'
    );
    let maxId = Number(res[0].max_id) + 1;


    const insertSql = `
      INSERT INTO appointment (
        appointment_id, client_user_id, created_by_user_id,
        employee_user_id, end_date, end_hour, observation,
        service_id, start_date, start_hour
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      maxId,
      client_id,
      created_by_user_id,
      employee_id,
      end_date,
      end_hour,
      observations,
      service_id,
      start_date,
      start_hour,
    ];

    await connection.query(insertSql, values);

    const [servicio] = await connection.query(
      'SELECT service_name FROM service WHERE service_id = ?',
      [service_id]
    );

    const serviceName = servicio[0]?.service_name?.toLowerCase() || '';

    if (serviceName.includes('corte') || serviceName.includes('rapa')) {
    const [result] = await connection.query(
      `SELECT COUNT(*) AS total_servicios
       FROM appointment a
       LEFT JOIN service s ON a.service_id = s.service_id
       WHERE a.client_user_id = ?
         AND a.status = 1
         AND (s.service_name LIKE '%corte%' OR s.service_name LIKE '%rapa%')`,
      [client_id]
    );

    const totalServicios = result[0]?.total_servicios || 0;

    console.log("Total de cortes/rapados:", totalServicios);

    if (totalServicios % 10 === 0) {
    
      const [userResult] = await connection.query(
        'SELECT email, user_name FROM user WHERE user_id = ? AND user_is_deleted = 0',
        [client_id]
      );

      const email = userResult[0]?.email;
      const user_name = userResult[0]?.user_name;

      if (email && user_name) {
        await enviarCuponRegalo(email, user_name);
        console.log(`Enviado email de recompensa a ${user_name} (${email})`);
      } else {
        console.log("No se encontró email o nombre para el cliente:", client_id);
      }
    }
  }

    await connection.commit();
  } catch (error) {
    console.log("Error al crear cita:", error);
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

  deleteService = async (id) => {
    try {
      let sql =
        'UPDATE service SET service_is_deleted = 1 WHERE service_id = ?';

      await executeQuery(sql, [id]);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  getAllClients = async () => {
    try {
      let sql =
        'SELECT * FROM user WHERE user.user_type = 3 and user_is_deleted = 0';
      let result = await executeQuery(sql);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  enabledClient = async (id, user_is_enabled) => {
    try {
      let sql = 'UPDATE user SET user_is_enabled = ? WHERE user_id = ?';
      let values = [user_is_enabled, id];

      await executeQuery(sql, values);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  getAllAppointments = async () => {
    try {
      let sql = `SELECT a.employee_user_id, a.appointment_id, a.start_date, a.end_date, a.start_hour, a.end_hour, a.observation, a.status, client.user_name AS client_name,
   client.lastname AS client_lastname,
   employee.user_name AS employee_name, employee.lastname AS employee_lastname,
   creator.user_name AS created_by_name, creator.lastname AS created_by_lastname,
   s.service_name
  FROM appointment a
  LEFT JOIN user client ON a.client_user_id = client.user_id
  LEFT JOIN user employee ON a.employee_user_id = employee.user_id
  LEFT JOIN user creator ON a.created_by_user_id = creator.user_id
  LEFT JOIN service s ON a.service_id = s.service_id
  WHERE a.status != 2`;
      let result = await executeQuery(sql);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  getOneService = async (id) => {
    try {
      let sql = 'SELECT * FROM service WHERE service_id = ?';
      let values = [id];
      const [result] = await executeQuery(sql, values);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  getOneAppointment = async (id) => {
    try {
      let sql = `SELECT a.employee_user_id, a.client_user_id, a.service_id, a.appointment_id, a.start_date, a.end_date, a.start_hour, a.end_hour, a.observation, a.status, client.user_name AS client_name,
   client.lastname AS client_lastname, client.phone as client_phone,
   employee.user_name AS employee_name, employee.lastname AS employee_lastname,
   creator.user_name AS created_by_name, creator.lastname AS created_by_lastname,
   s.service_name
  FROM appointment a
  LEFT JOIN user client ON a.client_user_id = client.user_id
  LEFT JOIN user employee ON a.employee_user_id = employee.user_id
  LEFT JOIN user creator ON a.created_by_user_id = creator.user_id
  LEFT JOIN service s ON a.service_id = s.service_id
  WHERE a.status != 2 and appointment_id = ?`;
      let result = await executeQuery(sql, [id]);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  editAppointment = async (data) => {
    const {
      employee_user_id,
      client_user_id,
      service_id,
      appointment_id,
      start_date,
      end_date,
      start_hour,
      end_hour,
      observation,
      status,
    } = data;

    try {
      let sql =
        'update appointment set employee_user_id = ?, client_user_id = ?, service_id = ?, start_date = ?, end_date = ?, start_hour = ?, end_hour = ?, observation = ?, status = ? where appointment_id = ?';
      let values = [
        employee_user_id,
        client_user_id,
        service_id,
        start_date,
        end_date,
        start_hour,
        end_hour,
        observation,
        status,
        appointment_id,
      ];

      await executeQuery(sql, values);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  cancelAppointment = async (id) => {
    try {
      let sql = 'UPDATE appointment SET status = 2 WHERE appointment_id = ?';
      await executeQuery(sql, [id]);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  
  addImages = async (service_id, images) => {
    const connection = await dbPool.getConnection();
    try {
      await connection.beginTransaction()
      let sqlId = "SELECT IFNULL(MAX(image_id),0) AS max_id FROM image WHERE service_id=?"
      let [result] = await connection.query(sqlId, [service_id]);
      let maxIdImage = result[0].max_id;

      images.forEach(async(elem)=>{
        maxIdImage++;
        let sqlImage = 'INSERT INTO image (service_id, image_id, image_name) VALUES (?,?,?)';

        let values = [service_id, maxIdImage, elem.filename];

        await connection.query(sqlImage, values);
      })

      // let sqlNewImages = 'SELECT * FROM image WHERE service_id = ? AND image_is_deleted = 0'
      // let resultNewImgs = await connection.query(sqlNewImages, [service_id]);
      
      await connection.commit();
      // return resultNewImgs;
      
 
    } catch (error) {
      console.log(error);
      await connection.rollback();
      throw error;
    }
    finally {
      connection.release()
    }
  }

  getImages = async(id)=>{
    try {
      let sql = 'SELECT * FROM image WHERE service_id = ? AND image_is_deleted = 0 order by image_id'
      let result = await executeQuery(sql, [id])
      return result;

    } catch (error) {
      console.log(error);
      throw error;
      
    }
  }

  delImage = async(service_id, image_id, file_name)=>{
    try {
      let sql = "delete from image where service_id=? AND image_id =?"
      let values = [service_id, image_id]

      await executeQuery(sql, values);

      deleteFile(file_name, "servicesImages");
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  reorderServiceImages = async(images) => {
    const {service_id} = images[0]
    let connection = await dbPool.getConnection()
    console.log("imagesss", images)
    try {
      await connection.beginTransaction()
      let sql = "delete from image where service_id = ?"
      await connection.execute(sql, [service_id])

      let imageId = 0;
      for(const img of images) {
        imageId++;

        let sqlSave = "insert into image (image_id, service_id, image_name) values (?,?,?)"
        let values = [imageId, service_id, img.image_name]

        await connection.execute(sqlSave, values)
      }

      await connection.commit();

    } catch (error) {
      await connection.rollback()
      console.log(error)
      throw error;
    } finally {
      connection.release();
    }
  }
}

export default new AdminDal();
