import { Request, Response } from "express"
import { createBook, deleteBookByISBN, findBookByCategory, findBookByISBN, findBookByName, getAllBooks } from "../service/book.service"
import handleError from "../utils/error.handle"
import { Constants } from "../utils/constants"


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

const filterCategory = async (req: Request, res: Response) => {
    try {
        const category = req.params.category as string
        console.log(category);
        
        if (!category) {
            return res.status(400).send({ message: 'El parámetro "Category" es requerido en la consulta.' });
        }

        const book = await findBookByCategory(category)
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

export { login, insertBook, deleteBook, getAll, findBook, findBookName, filterCategory }