import {Router } from "express";
import { insertBook, login } from "../controllers/book.controller";

const router = Router()

router.post('/login', login)
router.post('/insertBook', insertBook)

export {router}