import { hashString } from "../../utils/hashUtils.js";
import clientDal from "./client.dal.js";

class ClientControllers {

  register = async (req, res) => {
    try {
      const {email, password, repPassword} = req.body;
      let result = await clientDal.findUserByEmail(email);

      if (result.length) {
        throw {message: "usuario ya existe"}
      }

      else {
        const hashedPassword = await hashString(password);
        const data = {email, hashedPassword};
        await clientDal.register(data);
        res.status(201).json({message: "creado correctamente"});
      }
    } 

    catch (error) {
      console.log(error);
      res.status(500).json({message: "tururu"});
    }
  }
}

export default new ClientControllers();