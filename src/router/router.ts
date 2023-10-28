import {Router } from "express";
import { deleteBook, findBook, getAll, insertBook} from "../controllers/book.controller";
import { checkUserRole, insertUser, login, validateTokenOk } from "../controllers/user.controller";

const router = Router()


//Para Libros
router.post('/insertBook', insertBook)
router.delete('/deleteBook/:isbn',deleteBook)
router.get('/books', getAll);
router.get('/findBook/:isbn', findBook);

//Para los usuarios

router.post('/login', login)
router.post('/validateToken', validateTokenOk)
router.post('/insertUser', insertUser)
router.post('/checkUserRole', checkUserRole)


export {router}