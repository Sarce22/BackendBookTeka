import { Book } from "../interfaces/book.interface"
import BookModel from "../models/book.model"

// crea libro
const createBook = async (book: Book) => {
    const bookCreated = await BookModel.create(book);
    console.log(book);
    return bookCreated;


}

//Elimina libro
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

//Obtiene todos los libros
const getAllBooks = async () => {
    try {
        const books = await BookModel.find();
        return books;
    } catch (error) {
        throw error;
    }
}


//Busca por isbn del libro
const findBookByISBN = async (isbn: string) => {
    try {
        const book = await BookModel.findOne({ isbn });
        return book;
    } catch (error) {
        throw error;
    }
}

//Busca por el nombre del libro
const findBookByName = async (partialName: string) => {
    try {
        const books = await BookModel.find({ name: { $regex: partialName, $options: 'i' } });
        console.log(books);
        return books;
    } catch (error) {
        throw error;
    }
}

const findBookByCategory = async (category: string) => {
    try {
        const books = await BookModel.find({ category: category });
        console.log('service',category,books);
        
        return books;
    } catch (error) {
        console.error(error);
        throw new Error('Error al buscar libros por categoría');
    }
}
export { createBook, deleteBookByISBN, getAllBooks, findBookByISBN, findBookByName, findBookByCategory }