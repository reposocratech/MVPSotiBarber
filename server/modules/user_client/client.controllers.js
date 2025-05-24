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
        await clientDal.register(data);
        const result = await clientDal.findUserByEmail(email);
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
      // console.log("emaaaaiiiiil", email)
      const result = await clientDal.findUserByEmail(email)
      // console.log("resuuuult", result)

      const tokenFP = jwt.sign({user_id: result[0]?.user_id}, process.env.TOKEN_KEY_FORGETPASSWORD)
      sendMailPassword(email, tokenFP)

      // console.log("user_id", user_id)
      // console.log("tokenFP", tokenFP)
    } catch (error) {
      console.log("errForgetPassword", error)
    }
  }

  passRecovery = async(req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(" ")[1];
      const {newPassword} = req.body;
      // console.log("tokensitoooo", token)

      const decoded = jwt.verify(token, process.env.TOKEN_KEY_FORGETPASSWORD)
      const user_id = decoded.user_id;

      const result = await clientDal.findPasswordById(user_id)
      let prevpass = result[0].password;
      // console.log("antigua contra", prevpass)

      if(!prevpass) {
        res.status(401).json({message: "no autorizado"})
      } else {
        let newPasswordHashed = await hashString(newPassword)
        await clientDal.passRecovery(newPasswordHashed, user_id);
        res.status(200).json({message: "contraseña actualiza correctamente"})
      }

      console.log("tokensitoooo", req.body)
    } catch (error) {
      res.status(400).json({message: "token inválido"})
    }
  }

  confirmAccount = async(req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(" ")[1];

      const decoded = jwt.verify(token, process.env.TOKEN_KEY_CONFIRM)
      console.log("tokensito", token)
      const user_id = decoded.user_id;
      console.log("user_id", user_id)

      await clientDal.confirmAccount(user_id)

      return res.status(200).json({message: "cuenta confirmada correctamente"})
      
    } catch (error) {
      console.log(error)
      return res.status(500).json({message: "error al confirmar la cuenta"})
    }
  }

  completeFormRegister = async(req, res) => {
    try {
      // console.log("req.body", req.body)
      const {name, lastname, birthdate, phone} = req.body;
      const data = {name, lastname, birthdate, phone}

      // console.log("recupero token", req.headers.authorization)
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(" ")[1];

      const decoded = jwt.verify(token, process.env.TOKEN_KEY)
      const user_id = decoded.user_id;
      // console.log("user_idddd", user_id)

      await clientDal.completeFormRegister(data, user_id);

      return res.status(200).json({message: "formulario completado con exito"})
    } catch (error) {
      return res.status(500).json({message: "ups, error 500"})
    }
  }
}

export default new ClientControllers();