import {Router } from "express";
import { deleteBook, filterCategory, findBook, findBookName, getAll, insertBook} from "../controllers/book.controller";
import { checkUserRole, deleteUser, findUser, getAllUsers, insertUser, login, validateTokenOk } from "../controllers/user.controller";

const router = Router()


//Para Libros
router.post('/insertBook', insertBook)
router.delete('/deleteBook/:isbn',deleteBook)
router.get('/books', getAll);
router.get('/findBook/:isbn', findBook);
router.get('/search/name', findBookName)
router.get('/filterCategory/:category', filterCategory)


//Para los usuarios
router.post('/login', login)
router.post('/validateToken', validateTokenOk)
router.post('/insertUser', insertUser)
router.post('/checkUserRole', checkUserRole)
router.get('/findUser/:id',findUser)
router.delete('/deleteUser/:id', deleteUser)
router.get('/users',getAllUsers)


export {router}