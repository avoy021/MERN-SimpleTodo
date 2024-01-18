import mongoose from "mongoose";
import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import asyncHandler from 'express-async-handler';

export const signup = asyncHandler(async (req,res) => {
    const { username,password } = req.body;
    if(!username || !password) {
        res.status(400);
        throw new Error('Username or password is missing');
    } 
    
    const existingUser = await User.findOne({username});
    if(existingUser) {
        res.status(400);
        throw new Error('User with this username already exists');
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = { 
        username,
        password:hashedPassword
     };
    const user = await User.create(newUser);

    if(newUser) {
        return res.status(201).json(user);
    }
    else {
        res.status(500);
        throw new Error('Server error');
    }
})

export const login = asyncHandler(async (req,res) => {
    const { username,password } = req.body;
    if(!username || !password) {
        res.status(400);
        throw new Error('Username or password is missing');
    }
    
    const user = await User.findOne({username});
    if(!user) {
        res.status(401);
        throw new Error('User with this username doesnt exist');
    }

    if(await bcrypt.compare(password,user.password)) {
        const data = {
            username,
            token: generateJWT(user['_id'])
        }
        return res.status(200).json(data);
    }
    else {
        res.status(401);
        throw new Error('Password incorrect');
    }
})

function generateJWT(id) {
    return jwt.sign({id},process.env.JWT_SECRET,{ expiresIn: '30d'});
}