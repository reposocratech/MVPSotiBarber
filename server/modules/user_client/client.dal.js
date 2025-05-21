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
}

export default new ClientDal();