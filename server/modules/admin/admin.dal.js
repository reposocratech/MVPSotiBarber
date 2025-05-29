import executeQuery from "../../config/db.js";
import { hashString } from "../../utils/hashUtils.js";

class AdminDal {

  createService = async(data) =>{
    // eiofjeroifjreoifjreoigfhjreg
    
    try {
      const {service_name, estimated_time, price, service_description} = data;

      let values = [service_name, estimated_time, price, service_description]

      let sql = "INSERT INTO service (service_name, estimated_time, price, service_description) VALUES (?,?,?,?)"

      const result = await executeQuery(sql, values);

      //return para que me devulva el user_id ¿¿¿¿ES CORRECTO ASÍ?????
      return {
        service_id: result.insertId,
        service_name,
        price,
        estimated_time,
        service_description,
        service_is_enabled: 0,
      };
      
    } catch (error) {
      throw {message: "error de bd"}
    }
  }

  getAllServices = async()=>{
    try {
      let sql = 'SELECT * FROM service WHERE service_is_deleted = 0'
      let result = await executeQuery(sql)
      // console.log("SERVICESENELDAL", result)
      return result
    } catch (error) {
      console.log(error)
      throw error;      
    }
  }

  enabledService = async(id, service_is_enabled)=>{

    try {
      let sql = 'UPDATE service SET service_is_enabled = ? WHERE service_id = ?'
      let values = [service_is_enabled, id]

      await executeQuery(sql, values)
      
    } catch (error) {
      console.log(error)
      throw error;    
    }

  }

  editService = async(editService)=>{

    const {service_name, price, estimated_time, service_description, promo_name, promo_price, promo_start_date, promo_end_date, service_id} = editService

    try {
      
      let sql = 'UPDATE service SET service_name = ?, price = ?, estimated_time = ?, service_description = ?, promo_name = ?, promo_price = ?, promo_start_date = ?, promo_end_date = ? WHERE service_id = ?'
      let values = [service_name, price, estimated_time, service_description, promo_name, promo_price, promo_start_date, promo_end_date, service_id]

      await executeQuery(sql, values)

    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  createEmployee = async(data) => {
    // console.log("dataaaaa dal", data)
    const {user_name, lastname, phone, email, password, description} = data.data;
    try {
      const hashedPassword = await hashString(password)

      let sql = "insert into user (user_name, lastname, email, phone, password, description, user_type) values (?,?,?,?,?,?,?)"
      let values = [user_name, lastname, email, phone, hashedPassword, description, 2]

      if(data.img){
        sql = "insert into user (user_name, lastname, email, phone, password, description, user_type, avatar) values (?,?,?,?,?,?,?,?)";
        values = [user_name, lastname, email, phone, hashedPassword, description, 2, data.img.filename]
      }
      await executeQuery(sql, values);
    } catch (error) {
      throw error;
    }
  }


   getAllEmployees = async()=>{
    try {
      let sql = 'SELECT * FROM user WHERE user.user_type = 2 and user_is_deleted = 0'
      let result = await executeQuery(sql)
      // console.log("Employeeeees", result)
      return result
    } catch (error) {
      console.log(error)
      throw error;      
    }
  }

    enabledEmployee = async(id, user_is_enabled)=>{

    try {
      let sql = 'UPDATE user SET user_is_enabled = ? WHERE user_id = ?'
      let values = [user_is_enabled, id]

      await executeQuery(sql, values)
      
    } catch (error) {
      console.log(error)
      throw error;    
    }

  }


  editEmployee = async(data) => {
    const {user_name, lastname, phone, description, avatar, user_id} = data.data;

    try {
      let sql = "update user set user_name = ?, lastname = ?, phone = ?, description = ? where user_id = ?";

      let values = [user_name, lastname, phone, description, user_id]

      if (data.img) {
        sql = "update user set user_name = ?, lastname = ?, phone = ?, description = ?, avatar = ? where user_id = ?";
        values = [user_name, lastname, phone, description, avatar, user_id]

        await executeQuery(sql, values)
      }
    } catch (error) {
      throw error
    }
  }

  clientListAppointment = async (search) => {
    try {
      let textoBuscado = (search);
      let palabras = textoBuscado.split(" ");

      let sql = `select user_id, user_name, lastname, phone, email from user where user_type = 3 and user_is_deleted = 0`;

      for (let palabra of palabras) {
        sql += ` and (user_name like "%${palabra}%" or lastname like "%${palabra}%" or phone like "%${palabra}%" or email like "%${palabra}%")`
      }

      const result = await executeQuery (sql)
      return result;
    } catch (error) {
      throw error;
    }
  }

  createAppointment = async(data) => {
    const {date, hour, client_name, client_lastname, employee, phone, observations} = data;

    try {
      
    } catch (error) {
      throw error
    }
  }

  deleteService = async(id) =>{
    try {
      let sql = "UPDATE service SET service_is_deleted = 1 WHERE service_id = ?";

      await executeQuery(sql, [id])
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

    getAllClients = async()=>{
    try {
      let sql = 'SELECT * FROM user WHERE user.user_type = 3 and user_is_deleted = 0'
      let result = await executeQuery(sql)
      // console.log("Clieentsss", result)
      return result
    } catch (error) {
      console.log(error)
      throw error;      
    }
  }

      enabledClient = async(id, user_is_enabled)=>{

    try {
      let sql = 'UPDATE user SET user_is_enabled = ? WHERE user_id = ?'
      let values = [user_is_enabled, id]

      await executeQuery(sql, values)
      
    } catch (error) {
      console.log(error)
      throw error;    
    }

  }
}

export default new AdminDal();