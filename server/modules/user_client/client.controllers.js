import { compareString, hashString } from '../../utils/hashUtils.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import clientDal from './client.dal.js';
import sendMail from '../../services/nodemailer.js';
import sendMailPassword from '../../services/passwordNodemailer.js';
import sendContactEmail from '../../services/contactNodemailer.js';

dotenv.config();

class ClientControllers {
  register = async (req, res) => {
    try {
      const { email, password, repPassword } = req.body;
      let result = await clientDal.findUserByEmail(email);

      if (result.length) {
        throw { message: 'usuario ya existe' };
      } else {
        const hashedPassword = await hashString(password);
        const data = { email, hashedPassword };
        await clientDal.register(data);
        const result = await clientDal.findUserByEmail(email);
        const tokenconfirm = jwt.sign(
          { user_id: result[0]?.user_id },
          process.env.TOKEN_KEY_CONFIRM
        );
        sendMail(email, tokenconfirm);
        res.status(201).json({ tokenconfirm, message: 'creado correctamente' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'email o contraseñas no válidas' });
    }
  };

  login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await clientDal.findUserByEmailLogin(email);

    if (result.length === 0) {
      return res.status(401).json({ message: 'Email o contraseña no válidas' });
    }
   
    const user = result[0];
    const match = await compareString(password, user.password);

    if (!match) {
      return res.status(401).json({ message: 'Email o contraseña no válidas' });

    }

  
    if (!user.user_is_confirmed) {
      return res.status(403).json({ message: 'Debes verificar tu cuenta antes de iniciar sesión.' });
    }

    const token = jwt.sign(
      { user_id: user.user_id },
      process.env.TOKEN_KEY,
      { expiresIn: '1d' }
    );

    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'ups, esto es un error 500' });
  }
};

  userById = async (req, res) => {
    try {
      const { user_id } = req;
      let result = await clientDal.findUserById(user_id);

      let userData = {
        user: {
          user_id: result[0].user_id,
          user_name: result[0].user_name,
          lastname: result[0].lastname,
          email: result[0].email,
          phone: result[0].phone,
          user_type: result[0].user_type,
          avatar: result[0].avatar,
          birth_date: result[0].birth_date,
          decription: result[0].description,
          registered_date: result[0].registered_date,
        },
      };
      res.status(200).json(userData);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'ups, error 500' });
    }
  };

  forgetPassword = async (req, res) => {
    try {
      const { email } = req.body;
      const result = await clientDal.findUserByEmail(email);

      const tokenFP = jwt.sign(
        { user_id: result[0]?.user_id },
        process.env.TOKEN_KEY_FORGETPASSWORD
      );
      sendMailPassword(email, tokenFP);
    } catch (error) {
      console.log('errForgetPassword', error);
    }
  };

  passRecovery = async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(' ')[1];
      const { newPassword } = req.body;

      const decoded = jwt.verify(token, process.env.TOKEN_KEY_FORGETPASSWORD);
      const user_id = decoded.user_id;

      const result = await clientDal.findPasswordById(user_id);
      let prevpass = result[0].password;

      if (!prevpass) {
        res.status(401).json({ message: 'no autorizado' });
      } else {
        let newPasswordHashed = await hashString(newPassword);
        await clientDal.passRecovery(newPasswordHashed, user_id);
        res.status(200).json({ message: 'contraseña actualiza correctamente' });
      }
    } catch (error) {
      res.status(400).json({ message: 'token inválido' });
    }
  };

  confirmAccount = async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(' ')[1];

      const decoded = jwt.verify(token, process.env.TOKEN_KEY_CONFIRM);
      const user_id = decoded.user_id;

      await clientDal.confirmAccount(user_id);

      return res
        .status(200)
        .json({ message: 'cuenta confirmada correctamente' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'error al confirmar la cuenta' });
    }
  };

  completeFormRegister = async (req, res) => {
    try {
      const { user_name, lastname, birth_date, phone } = req.body;
      const data = { user_name, lastname, birth_date, phone };

      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(' ')[1];

      const decoded = jwt.verify(token, process.env.TOKEN_KEY);
      const user_id = decoded.user_id;

      await clientDal.completeFormRegister(data, user_id);

      return res
        .status(200)
        .json({ message: 'formulario completado con exito' });
    } catch (error) {
      return res.status(500).json({ message: 'ups, error 500' });
    }
  };

  contactForm = async (req, res) => {
    try {
      const { name, email, message } = req.body;
      await sendContactEmail(name, email, message);
      res.status(200).json({ message: 'Mensaje enviado' });
    } catch (error) {
      console.error('Error al enviar mensaje de contacto:', error);
      res.status(500).json({ message: 'Error al enviar el mensaje' });
    }
  };

  editClient = async (req, res) => {
    try {
      const data = {
        data: JSON.parse(req.body.data),
        avatar: req.file,
      };
      const result = await clientDal.editClient(data);

      res.status(200).json({ message: 'Update ok', img: req.file?.filename });
    } catch (error) {
      console.log(error);

      res.status(500).json({ message: 'Error al editar usuario' });
    }
  };

  getAppointmentsByClientId = async (req, res) => {
    const clientId = req.params.id;

    try {
      const appointments = await clientDal.findAppointmentsByClientId(clientId);
      res.status(200).json(appointments);
    } catch (error) {
      console.error('Error al obtener citas del cliente:', error);
      res.status(500).json({ message: 'Error al obtener citas del cliente' });
    }
  };

  getCortesCount = async (req, res) => {
    try {
      const { id } = req.params;
      const totalCortes = await clientDal.countCortesByClientId(id);
      res.json({ totalCortes });
    } catch (error) {
      res.status(500).json({ message: 'Error al contar cortes', error });
    }
  };

  getAllImages = async (req, res) => {
    try {
      const result = await clientDal.getImages();

      res.status(200).json({ message: 'images', result });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error al contar cortes', error });
    }
  };
}

export default new ClientControllers();
