import { Schema, model } from "mongoose";

const BookSchema = new Schema({
    name: { type: String, required: true },
    price: { type: String, required: true },
    isbn: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    urlImage: { type: String, require: true },
    category: { type: String, require: true }
}, {
    timestamps: true,
    versionKey: false
})

const BookModel = model('books', BookSchema)
export default BookModel