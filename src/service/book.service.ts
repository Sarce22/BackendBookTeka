import { Book } from "../interfaces/book.interface"
import UserModel from "../models/book.model"

const createBook = async (book: Book) => {
    const userCreated = await UserModel.create(book)
    return userCreated
}

const getLogin = async (book: Book) => {
    const bookCreated = await UserModel.create(book)
    return bookCreated
}

export {createBook,getLogin}