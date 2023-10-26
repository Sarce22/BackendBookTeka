import {Router } from "express";
import { deleteBook, insertBook, login } from "../controllers/book.controller";


const router = Router()

router.post('/login', login)
router.post('/insertBook', insertBook)
router.delete('/deleteBook/:isbn',deleteBook)

export {router}