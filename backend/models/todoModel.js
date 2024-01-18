import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true]
    },
    todos: [
        {
            id: {
                type: String,
                required: [true]
            },
            content: {
                type: String,
                required: [true]
            }
        }
    ]
})

const Todo = mongoose.model('Todo',todoSchema);

export default Todo;
