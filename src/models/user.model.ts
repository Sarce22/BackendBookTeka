import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique:true },
    password: { type: String, required: true },
    role: { type: String, required: true }
}, {
    timestamps: true,
    versionKey: false
}
)
const UserModel = model('users', UserSchema)
export default UserModel
