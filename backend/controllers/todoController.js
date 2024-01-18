import mongoose from "mongoose";
import Todo from '../models/todoModel.js';
import {v4 as uuidv4} from 'uuid';
import asyncHandler from "express-async-handler";


export const addTodo = asyncHandler(async (req,res) => {
    const {userId,username} = req.user;
    const {content} = req.body;

    if(!content) {
        res.status(400);
        throw new Error('Please enter the todo');
    }

    const userTodos = await Todo.findOne({username});
    let newTodo = {
        id: uuidv4(),
        content
    };
    if(userTodos) {
        userTodos["todos"].push(newTodo);
        const todoSaved = await userTodos.save();
        return res.status(201).json(newTodo);
    }
    else {
        let data = {
            username,
            todos: [newTodo]
        }
        const todo = await Todo.create(data);
        return res.status(201).json(newTodo);
    }

    res.status(500);
    throw new Error('Server error');
})

export const updateTodo = asyncHandler(async (req,res) => {
    const {userId,username} = req.user;
    const {content,todoId} = req.body;

    if(!content || !todoId) {
        res.status(400);
        throw new Error('Todo content || or Todo Id is missing');
    }
    const userTodos = await Todo.findOne({username});

    if(userTodos) {
        let indexOfTodo = -1;
        userTodos = userTodos['todos'].map((todo,index) => {
            if(todo['id'] === todoId) {
                todo['content'] = content;
                indexOfTodo = index;
            }
            return todo;
        })

        let updatedTodo = await userTodos.save();
        return res.status(200).json(updatedTodo['todos'][indexOfTodo]);
    } 
    else {
        res.status(404);
        throw new Error('User not found');
    } 
})

export const removeTodo = asyncHandler(async (req,res) => {
    const {userId,username} = req.user;
    const {todoId} = req.body;

    if(!todoId) {
        res.status(400);
        throw new Error('Todo Id is missing');
    }
    const userTodos = await Todo.findOne({username});

    if(userTodos) {
        let indexOfTodo = -1;
        userTodos = userTodos['todos'].filter(todo => todo['id'] !== todoId)

        let updatedTodo = await userTodos.save();
        return res.status(200).json(todoId);
    } 
    else {
        res.status(404);
        throw new Error('User not found');
    } 
})
