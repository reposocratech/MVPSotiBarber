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
}

export default new ClientDal();