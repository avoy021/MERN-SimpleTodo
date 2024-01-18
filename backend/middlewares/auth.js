import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';

const protectRoute = asyncHandler(async (req,res,next) => {
    try {
        const headers = req.headers.authorization;
        const token = headers.split(' ')[1];
        if(token) {
            const {id} = jwt.verify(token,process.env.JWT_SECRET);
            const user = await User.findById(id);
            if(user) {
                // console.log(user)
                req.user = {
                    id,
                    username: user["username"],
                }
                next();
            }
            else {
                res.status(401);
                throw new Error('User doesnt exist with this token');
            }
        }
    } catch (error) {
        res.status(500);
        throw new Error('Server error');
    }
})

export default protectRoute;
