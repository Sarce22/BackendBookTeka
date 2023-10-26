import { Book } from "../interfaces/book.interface"
import BookModel from "../models/book.model"


const createBook = async (book: Book) => {
    const bookCreated = await BookModel.create(book);
    return bookCreated;
}

const deleteBookByISBN = async (isbn: string) => {
    try {
        
        const result = await BookModel.deleteOne({ isbn });
        
        
        if (result.deletedCount === 1) {
            return true; 
        } else {
            return false; 
        }
    } catch (error) {
        
        throw error;
    }
}

const getLogin = async (book: Book) => {
    const bookCreated = await BookModel.create(book)
    return bookCreated
}

export { createBook, getLogin, deleteBookByISBN }