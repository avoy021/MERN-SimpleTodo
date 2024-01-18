import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true],
        unique: true
    },
    password: {
        type: String,
        required: [true,'Please add password']
    }
})

const User = mongoose.model('User',userSchema);

export default User;