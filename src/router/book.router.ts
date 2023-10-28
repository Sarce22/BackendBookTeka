import {Router } from "express";
import { deleteBook, findBook, getAll, insertBook} from "../controllers/book.controller";


const router = Router()


//Para Libros
router.post('/insertBook', insertBook)
router.delete('/deleteBook/:isbn',deleteBook)
router.get('/books', getAll);
router.get('/findBook/:isbn', findBook);

//Para los usuarios



export {router}