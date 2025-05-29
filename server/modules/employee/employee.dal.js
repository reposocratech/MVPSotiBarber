import executeQuery from "../../config/db.js";

class EmployeeDal {

 findAllClients = async () => {
  try{
  let sql = `SELECT user_id, user_name, lastname FROM user WHERE user_type = 3`;
  const result = await executeQuery(sql);
  return result;
  } 
  catch (error) {
      throw error;
    }
}

findUserByEmployee = async (user_id) => {
  try {
    const sql = "SELECT * FROM user WHERE user_id = ?";
    const result = await executeQuery(sql, [user_id]);
    return result;
  } catch (error) {
    throw error;
  }
}



}export default new EmployeeDal();