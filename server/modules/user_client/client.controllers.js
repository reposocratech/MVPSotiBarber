import { compareString, hashString } from "../../utils/hashUtils.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import clientDal from "./client.dal.js";
import sendMail from "../../services/nodemailer.js";
import sendMailPassword from "../../services/passwordNodemailer.js";

dotenv.config();


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
        const result = await clientDal.findUserByEmail(email);
        await clientDal.register(data);
        const tokenconfirm = jwt.sign({user_id:result[0]?.user_id},process.env.TOKEN_KEY_CONFIRM)
        sendMail(email, tokenconfirm)
        console.log(tokenconfirm);
        res.status(201).json({tokenconfirm, message: "creado correctamente"});
      }
    } 

    catch (error) {
      console.log(error);
      res.status(500).json({message: "tururu"});
    }
  }

  login = async(req, res)=>{
    try {
      const {email, password} = req.body;

      const result = await clientDal.findUserByEmailLogin(email);
      
      console.log("LOOOGINRESULLT", result)

      if(result.length === 0){
        res.status(401).json({message:"Email no existe"});
      }else{
        let match = await compareString(password, result[0].password);

        if(!match){
          res.status(401).json({message:"Contraseña no válida"})
        }else{
          const token = jwt.sign({user_id:result[0].user_id}, process.env.TOKEN_KEY, {expiresIn:'1d'});
          res.status(200).json({token})
        }
      }
      
    } catch (error) {
      console.log(error);
      res.status(500).json({message:"ups, esto es un error 500"})
    }

  }

  userById = async (req, res) =>{
    try {
      console.log("REEEEEQ", req)
      const {user_id} = req;
      console.log("**********", user_id)
      let result = await clientDal.findUserById(user_id)

      let userData = {
        user:{
             user_id: result[0].user_id,
           user_name: result[0].user_name,
           lastname: result[0].lastname,
           email: result[0].email,
           phone: result[0].phone,
           user_type: result[0].user_type,
           avatar: result[0].avatar,
           birth_date: result[0].birth_date,
           registered_date: result[0].registered_date
        }
     
      }
      res.status(200).json(userData)

    } catch (error) {
      console.log(error);      
      res.status(500).json({message:"ups, error 500"})
    }
  }

  forgetPassword = async(req, res) => {
    try {
      const {email} = req.body;
      const result = await clientDal.findUserByEmail(email)
      const tokenFP = jwt.sign({user_id: result[0].user_id}, process.env.TOKEN_KEY_FORGETPASSWORD)
      sendMailPassword(email, tokenFP)
      // console.log("tokenFP", tokenFP)
    } catch (error) {
      console.log("errForgetPassword", error)
    }
  }
}

export default new ClientControllers();