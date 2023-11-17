import { Request, Response } from "express"
import { createBook, deleteBookByISBN, findBookByISBN, findBookByName, findBooksByCategory, getAllBooks, updateBookByIsbn } from "../service/book.service"
import handleError from "../utils/error.handle"
import { Constants } from "../utils/constants"
import { Book } from "../interfaces/book.interface"


const login = async (req: Request, res: Response) => {
    try {
        const { email } = req.body
        res.status(200).send({ email })
    } catch (error) {

    }
}

const insertBook = async (req: Request, res: Response) => {
    try {
        const { body } = req
        const responseBook = await createBook(body)
        res.status(200).send({ responseBook })
    } catch (error) {
        console.log(error);
        handleError(res, Constants.MSG_ERROR_APLICACION)
    }
}

const deleteBook = async (req: Request, res: Response) => {
    try {
        const { isbn } = req.params;
        const result = await deleteBookByISBN(isbn);
        if (result) {
            res.status(200).send({ message: 'Libro eliminado correctamente' });
        } else {
            res.status(404).send({ message: 'Libro no encontrado' });
        }
    } catch (error) {
        console.log(error);
        handleError(res, Constants.MSG_ERROR_APLICACION);
    }
}


const getAll = async (req: Request, res: Response) => {
    try {
        const books = await getAllBooks();
        res.status(200).send(books);
        console.log(books);

    } catch (error) {
        console.log(error);
        handleError(res, Constants.MSG_ERROR_APLICACION);
    }
}

const findBook = async (req: Request, res: Response) => {
    try {
        const isbn = req.params.isbn; // Obtiene el ISBN desde los parámetros de la URL
        const book = await findBookByISBN(isbn);
        console.log(book);

        if (book) {
            res.status(200).send(book);
        } else {
            res.status(404).send({ message: 'Libro no encontrado' });
        }
    } catch (error) {
        console.log(error);
        handleError(res, Constants.MSG_ERROR_APLICACION);
    }
}



const findBookName = async (req: Request, res: Response) => {
    try {
        const name = req.query.name as string
        if (!name) {
            return res.status(400).send({ message: 'El parámetro "name" es requerido en la consulta.' });
        }

        const book = await findBookByName(name)
        console.log('controller', book);

        if (book) {
            res.status(200).send(book);
        } else {
            res.status(404).send({ message: 'Libro no encontrado' });
        }
    } catch (error) {
        console.log(error);
        handleError(res, Constants.MSG_ERROR_APLICACION);
    }
}

const findBookByCategory = async (req: Request, res: Response) => {
    try {
        const category = req.query.category as string;
        if (!category) {
            return res.status(400).send({ message: 'El parámetro "category" es requerido en la consulta.' });
        }

        const books = await findBooksByCategory(category);
        console.log('controller', books);

        if (books.length > 0) {
            res.status(200).send(books);
        } else {
            res.status(404).send({ message: 'Libros no encontrados en esta categoría' });
        }
    } catch (error) {
        console.log(error);
        handleError(res, Constants.MSG_ERROR_APLICACION);
    }
}




const updateBook = async (req: Request, res: Response) => {
    try {
        const bookIsbn: string = req.params.isbn;
        const updatedBookData: Partial<Book> = req.body;
  
        const updatedBook = await updateBookByIsbn(bookIsbn, updatedBookData);
  
        if (updatedBook === Constants.MSG_ERROR_USUARIO_NO_ECONTRADO) {
            console.log("User not found during update.");
            return res.status(404).send({ message: 'Usuario no encontrado', error: true });
        }
  
        res.status(200).send(updatedBook);
    } catch (error) {
        console.error("Error during user update:", error);
        handleError(res, Constants.MSG_ERROR_APLICACION);
    }
  };

export { login, insertBook, deleteBook, getAll, findBook, findBookName, findBookByCategory, updateBook }