import { Book } from "../interfaces/book.interface"
import BookModel from "../models/book.model"
import { Constants } from "../utils/constants";

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

const updateBookByIsbn = async (bookIsbn: string, updatedBookData: Partial<Book>) => {
    try {
        console.log("Updating book with isbn:", bookIsbn);
        console.log("Updated data:", updatedBookData);

        const book = await BookModel.findOneAndUpdate({ isbn: bookIsbn }, updatedBookData, { new: true });

        console.log("Updated book:", book);

        if (!book) {
            console.log("Book not found during update.");
            return Constants.MSG_ERROR_USUARIO_NO_ECONTRADO;
        }

        
        return book;
    } catch (error) {
        console.error("Error during book update:", error);
        throw error;
    }
};
export { createBook, deleteBookByISBN, getAllBooks, findBookByISBN, findBookByName, findBookByCategory, updateBookByIsbn }