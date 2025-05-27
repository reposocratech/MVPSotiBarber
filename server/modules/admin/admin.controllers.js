import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import adminDal from "./admin.dal.js"
import { hashString } from "../../utils/hashUtils.js"

dotenv.config();

class AdminControllers {

  createService = async (req, res)=>{
    try {
      const {service_name, estimated_time, price, service_description} = req.body

      let data ={
        service_name,
        estimated_time,
        price,
        service_description,
      }

      let result = await adminDal.createService(data);
      res.status(200).json({result, message:"creado correctamente", service:result})


      
    } catch (error) {
      console.log(error);
      res.status(500).json({message:"ups hay algún problema"})
    }
  }

  getAllServices = async(req, res)=>{
    try {
      let result = await adminDal.getAllServices();
      console.log(result)
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
      console.log(result);
      res.status(200).json({result})
    } catch (error) {
      console.log(error)
      res.status(500).json({message:"ups, hay algún problema"})
    }
  }

  editService = async(req, res)=>{
    try {
      let result = await adminDal.editService(req.body)
      console.log(result)
      res.status(200).json({result})
    } catch (error) {
      console.log(error)
      res.status(500).json({message:"ups, hay algún problema"})
    }
  }

  createEmployee = async(req, res) => {
    try {
      const data = {
        data: JSON.parse(req.body.employeeData),
        img: req.file
      }

      console.log("data en el back", data)
      await adminDal.createEmployee(data)
      res.status(200).json({message: "creado correctamente", img: req.file?.filename})
    } catch (error) {
      res.status(500).json({message: "ups, error 500"})
      console.log(error)
    }
  }

  editEmployee = async(req, res) => {
    try {
      console.log("req.body", req.body)
    } catch (error) {
      res.status(500).json({message: "error 500"})
    }
  }
}

export default new AdminControllers();