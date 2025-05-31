import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import adminDal from "./admin.dal.js"
import { hashString } from "../../utils/hashUtils.js"

dotenv.config();

class AdminControllers {

  createService = async (req, res)=>{
    try {
     
      const data = {
        data: JSON.parse(req.body.data),
        img: req.file
      }

      let result = await adminDal.createService(data);
      res.status(200).json({ message:"creado correctamente", service:result})


      
    } catch (error) {
      console.log(error);
      res.status(500).json({message:"ups hay algún problema"})
    }
  }

  getAllServices = async(req, res)=>{
    try {
      let result = await adminDal.getAllServices();
      res.status(200).json({services:result});
    } catch (error) {
      console.log(error)
      res.status(500).json({message:"ups, hay algún problema"})
    }
  }

  enabledService = async(req, res)=>{

    const {id} = req.params;
    const {service_is_enabled} = req.body

    try {
      let result = await adminDal.enabledService(id, service_is_enabled);
      res.status(200).json({result})
    } catch (error) {
      console.log(error)
      res.status(500).json({message:"ups, hay algún problema"})
    }
  }

  editService = async(req, res)=>{
    try {
      const data = {
        data: JSON.parse(req.body.data),
        img: req.file
      }

      let result = await adminDal.editService(data)
      res.status(200).json({result})
    } catch (error) {
      console.log(error)
      res.status(500).json({message:"ups, hay algún problema"})
    }
  }

  createEmployee = async(req, res) => {
    try {
      const data = {
        data: JSON.parse(req.body.data),
        img: req.file
      }

      await adminDal.createEmployee(data)
      res.status(200).json({message: "creado correctamente", img: req.file?.filename})
    } catch (error) {
      res.status(500).json({message: "ups, error 500"})
      console.log(error)
    }
  }

  editEmployee = async(req, res) => {
    try {
      const data = {
        data: JSON.parse(req.body.data),
        img: req.file
      }

      let result = await adminDal.editEmployee(data)
      res.status(200).json({result})
    } catch (error) {
      res.status(500).json({message: "error 500"})
    }
  }

    getAllEmployees = async(req, res)=>{
    try {
      let result = await adminDal.getAllEmployees();
      res.status(200).json({employees:result});
    } catch (error) {
      console.log(error)
      res.status(500).json({message:"ups, hay algún problema"})
    }
  }

  
  enabledService = async(req, res)=>{

    const {id} = req.params;
    const {service_is_enabled} = req.body

    try {
      let result = await adminDal.enabledService(id, service_is_enabled);
      res.status(200).json({result})
    } catch (error) {
      console.log(error)
      res.status(500).json({message:"ups, hay algún problema"})
    }
  } 

    enabledEmployee = async(req, res)=>{

    const {id} = req.params;
    const {user_is_enabled} = req.body

    try {
      let result = await adminDal.enabledEmployee(id, user_is_enabled);
      res.status(200).json({result})
    } catch (error) {
      console.log(error)
      res.status(500).json({message:"ups, hay algún problema"})
    }
  } 

  clientListAppointment = async (req, res) => {
    try {
      const clients = await adminDal.clientListAppointment(req.query.search)
      res.status(200).json({message: "clientes extraidos correctamente", clients: clients})
    } catch (error) {
      res.status(500).json({message: "error 500"})
    }
  }

  createAppointment = async(req, res) => {
    try {
      let result = await adminDal.createAppointment(req.body);
     
      res.status(200).json({message: "creado correctamente", result})
      
    } catch (error) {
      console.log("error created appointment", error);
      
      res.status(500).json({message: "error 500"})
    }
  }

  deleteService = async(req, res) =>{
    const {id} = req.body

    try {
      let result = await adminDal.deleteService(id);
      res.status(200).json({message: "borrado correctamente"})
    } catch (error) {

      res.status(500).json({message: "error 500"})
    }
  }

     getAllClients = async(req, res)=>{
    try {
      let result = await adminDal.getAllClients();
      res.status(200).json({clients:result});
    } catch (error) {
      console.log(error)
      res.status(500).json({message:"ups, hay algún problema"})
    }
  }

  enabledClient = async(req, res)=>{

    const {id} = req.params;
    const {user_is_enabled} = req.body

    try {
      let result = await adminDal.enabledClient(id, user_is_enabled);
      res.status(200).json({result})
    } catch (error) {
      console.log(error)
      res.status(500).json({message:"ups, hay algún problema"})
    }
  } 
  
  getAllAppointments = async (req, res) => {
    
    try {
      let result = await adminDal.getAllAppointments();
      res.status(200).json({message:"todo ok", result});
      
    } catch (error) {
      console.log(error);
      res.status(500).json({message:"ups, hay algún problema"})
      
    }
  }

  getOneService = async(req, res)=>{

    try {
      const {id} = req.params;
      let result = await adminDal.getOneService(id);
      res.status(200).json({result})

    } catch (error) {
      console.log(error)
      res.status(500).json({message:"ups, hay algún problema"})
    }
  
  }

  getOneAppointment = async(req, res) => {
    const {id} = req.params;

    try {
      let result = await adminDal.getOneAppointment(id)
      res.status(200).json({message: "cita enviada correctamente", result})
    } catch (error) {
      console.log(error)
      res.status(500).json({message: "error 500"})
    }
  }
  
  editAppointment = async(req, res) => {
    try {
      await adminDal.editAppointment(req.body);
    } catch (error) {
      console.log(error)
      res.status(500).json({message: "error 500"})
    }
  }

  cancelAppointment = async(req, res) =>{
    const {appointment_id} = req.body
    try {

      await adminDal.cancelAppointment(appointment_id);      
      res.status(200).json({ message: "cita cancel ok" });
    } catch (error) {
      console.log(error)
      res.status(500).json({message: "error 500"})
    }
  }
}

export default new AdminControllers();