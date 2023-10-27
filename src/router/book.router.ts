import {Router } from "express";
import { deleteBook, findBook, getAll, insertBook, login } from "../controllers/book.controller";


const router = Router()

router.post('/login', login)
router.post('/insertBook', insertBook)
router.delete('/deleteBook/:isbn',deleteBook)
router.get('/books', getAll);
router.get('/findBook/:isbn', findBook);



export {router}