import { Request, Response } from "express"
import { addToFavorites, createUser, deleteUserById, findUserById, getAllUser, getLogin, getUserRolById, updateUserById } from "../service/user.service"
import handleError from "../utils/error.handle"
import { Constants } from "../utils/constants"
import { User } from "../interfaces/user.interface"

const login = async (req: Request, res: Response) => {
    try {
        
        const user: User = req.body  
        console.log(user);
        
        const userDB = await getLogin(user)
        if (userDB === Constants.MSG_ERROR_PASSWORD_INCORRECTO)
            return res.status(500).send({ msg: Constants.MSG_ERROR_PASSWORD_INCORRECTO, error: true })
        
        if (userDB === Constants.MSG_ERROR_USUARIO_NO_ECONTRADO)
            return res.status(500).send({ msg:Constants.MSG_ERROR_USUARIO_NO_ECONTRADO, error: true })          
        res.status(200).send({ data:userDB })
    } catch (error) {
        console.log(error);     
        handleError(res,Constants.MSG_ERROR_APLICACION)
    }
    
}

//Agregar
const insertUser = async (req: Request, res: Response) => {
    try {
        const { body } = req
        const responseUser = await createUser(body)
        res.status(200).send({ responseUser })
    } catch (error) {
        console.log(error);        
        handleError(res, Constants.MSG_ERROR_APLICACION)
    }
}

//Eliminar

const deleteUser = async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.id, 10); // Convierte la cadena en un número
      const result = await deleteUserById(userId);
  
      if (result) {
        res.status(200).send({ message: 'Usuario eliminado correctamente' });
      } else {
        res.status(404).send({ message: 'Usuario no encontrado' });
      }
    } catch (error) {
      console.error(error);
      handleError(res, Constants.MSG_ERROR_APLICACION);
    }
  };

  //Buscar

  const findUser = async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.id, 10); // Convierte la cadena en un número
      const user = await findUserById(userId);
  
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(404).send({ message: 'Usuario no encontrado' });
      }
    } catch (error) {
      console.error(error);
      handleError(res, Constants.MSG_ERROR_APLICACION);
    }
  };


  //TODOS
  const getAllUsers = async (req: Request, res: Response) => {
    try {
        const user = await getAllUser();
        res.status(200).send(user);
    } catch (error) {
        console.log(error);
        handleError(res, Constants.MSG_ERROR_APLICACION);
    }
}


const validateTokenOk = (req: Request, res: Response) => {
    return res.status(200).send({ msg: Constants.MSG_SUCCESS_TOKEN, error: false })
} 

const checkUserRole = async (req: Request, res: Response) => {
    try {

        const userId: string = req.body._id
        console.log(userId);

        const userDB = await getUserRolById(userId)

        if (userDB === Constants.MSG_ERROR_USUARIO_NO_ECONTRADO)
            return res.status(500).send({ msg: Constants.MSG_ERROR_USUARIO_NO_ECONTRADO, error: true })
        res.status(200).send({ data: userDB })
    } catch (error) {
        console.log(error);
        handleError(res, Constants.MSG_ERROR_APLICACION)
    }
}


const updateUser = async (req: Request, res: Response) => {
  try {
      const userId: string = req.params.id;
      const updatedUserData: Partial<User> = req.body;

      const updatedUser = await updateUserById(userId, updatedUserData);

      if (updatedUser === Constants.MSG_ERROR_USUARIO_NO_ECONTRADO) {
          console.log("User not found during update.");
          return res.status(404).send({ message: 'Usuario no encontrado', error: true });
      }

      res.status(200).send(updatedUser);
  } catch (error) {
      console.error("Error during user update:", error);
      handleError(res, Constants.MSG_ERROR_APLICACION);
  }
};


const addBookToFavorites = async (req: Request, res: Response) => {
  try {
      const { userId, bookId } = req.body; // Esperamos userId y bookId en el cuerpo de la solicitud

      const result = await addToFavorites(userId, bookId);

      switch (result) {
          case Constants.MSG_ERROR_USUARIO_NO_ENCONTRADO:
              return res.status(404).send({ message: 'Usuario no encontrado' });
          case Constants.MSG_ERROR_LIBRO_NO_ENCONTRADO:
              return res.status(404).send({ message: 'Libro no encontrado' });
          case Constants.MSG_LIBRO_YA_EN_FAVORITOS:
              return res.status(400).send({ message: 'El libro ya está en favoritos del usuario' });
          case Constants.MSG_LIBRO_AGREGADO_FAVORITOS_EXITOSAMENTE:
              return res.status(200).send({ message: 'Libro agregado a favoritos exitosamente' });
          default:
              return res.status(500).send({ message: 'Error al procesar la solicitud' });
      }
  } catch (error) {
      console.error(error);
      return res.status(500).send({ message: 'Error al procesar la solicitud' });
  }
};





export { login, insertUser, validateTokenOk, checkUserRole,deleteUser, findUser,getAllUsers, updateUser, addBookToFavorites }
