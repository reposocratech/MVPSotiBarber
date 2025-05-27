import clientDal from "../user_client/client.dal.js"; 

class EmployeeControllers{

 getAllClients = async (req, res) => {
  try {
    const result = await clientDal.findAllClients();
    if (!result || result.length === 0) {
        return res.status(404).json({ message: "No hay clientes registrados" });
      }
    res.status(200).json(result);
  } catch (error) {
    console.error("Error al obtener lista de clientes:", error);
    res.status(500).json({ message: "Error al mostrar clientes" });
  }
}

getClientByEmployee = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await clientDal.findUserByEmployee(id);

      if (result.length === 0) {
        return res.status(404).json({ message: "Cliente no encontrado" });
      }

      res.status(200).json(result[0]);
    } catch (error) {
      console.error("Error al obtener perfil del cliente:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  };
}


export default new EmployeeControllers();