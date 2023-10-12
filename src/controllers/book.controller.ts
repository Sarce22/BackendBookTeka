import { Request, Response } from "express"
import { createBook } from "../service/book.service"


const login = async (req: Request, res: Response) => {
    try {
        const { email } = req.body
        res.status(200).send({email})
    } catch (error) {
        
    }
}

const insertBook = async (req: Request, res: Response) => {
    try {
        const { body } = req
        const responseBook = await createBook(body)
        res.status(200).send({ responseBook })
    } catch (error) {

    }
}

export {login, insertBook}