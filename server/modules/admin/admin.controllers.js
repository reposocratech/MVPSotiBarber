import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import adminDal from "./admin.dal.js"


class AdminControllers {

  createService = async (req, res)=>{
    try {
      console.log(req.body)
      const {service_name, estimated_time, price, service_description} = req.body

      let data ={
        service_name,
        estimated_time,
        price,
        service_description,
      }

      let result = await adminDal.createService(data);
      console.log("RESUUULT", result)
      res.status(200).json(result)


      
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
}

export default new AdminControllers();