import executeQuery from "../../config/db.js";

class AdminDal {

  createService = async(data) =>{
    
    try {
      const {service_name, estimated_time, price, service_description} = data;

      let values = [service_name, estimated_time, price, service_description]

      let sql = "INSERT INTO service (service_name, estimated_time, price, service_description) VALUES (?,?,?,?)"

      await executeQuery(sql, values);
      
    } catch (error) {
      throw {message: "error de bd"}
    }
  }

  getAllServices = async()=>{
    try {
      let sql = 'SELECT * FROM service WHERE service_is_deleted = 0'
      let result = await executeQuery(sql)
      console.log("SERVICESENELDAL", result)
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

}

export default new AdminDal();