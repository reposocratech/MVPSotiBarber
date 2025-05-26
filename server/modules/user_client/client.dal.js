import executeQuery from "../../config/db.js";

class ClientDal {
  findUserByEmail = async(email) => {
    try {
      let sql = "select user_id from user where email = ?";
      let result = await executeQuery(sql, [email]);
      return result;
    } 
    catch (error) {
      throw error;
    }
  }

  register = async (data) => {
    try {
      const {email, hashedPassword} = data; 
      let values = [email, hashedPassword];
      let sql = "insert into user (email, password) values (?,?)";
      await executeQuery(sql, values);
    } 
    catch (error) {
      throw {message: "error de bd"}
    }
  }

  findUserByEmailLogin = async(email) =>{
    try{
      let sql = 'SELECT user_id, password FROM user WHERE email = ? AND user_is_deleted = 0'
      let result = await executeQuery(sql, [email]);
      return result;
    }catch (error){
      throw error;
    }
  }

  findUserById = async (id)=>{
    try {
      let sql = 'SELECT * FROM user WHERE user_id = ? AND user_is_deleted = 0'
      let result = await executeQuery(sql, [id])

      return result
    } catch (error) {
      throw {message: "error de bd"}
    }
  }

  findPasswordById = async(user_id) => {
    try {
      let sql = "select password from user where user_id = ? and user_is_deleted = 0"
      return await executeQuery(sql, [user_id])
    } catch (error) {
      throw error;
    }
  }

  passRecovery = async(hashedPassword, user_id) => {
    try {
      let sql = "update user set password = ? where user_id = ?";
      await executeQuery(sql, [hashedPassword, user_id]);
    } catch (error) {
      throw error;
    }
  }

  confirmAccount = async(user_id) => {
    try {
      let sql = "update user set user_is_confirmed = 1 where user_id = ?";
      await executeQuery(sql, [user_id])
    } catch (error) {
      throw error;
    }
  }

  completeFormRegister = async(data, user_id) => {
    const {user_name, lastname, birthdate, phone} = data;
    let values = [user_name, lastname, birthdate, phone, user_id]
    try {
      let sql = "update user set user_name = ?, lastname = ?, birth_date = ?, phone = ? where user_id = ? ";
      await executeQuery(sql, values);
    } catch (error) {
      throw error;
    }
  }

  editClient = async(data) => {
    try {
      
    } catch (error) {
      
    }
  }
}

export default new ClientDal();