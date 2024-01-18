import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';

const protectRoute = asyncHandler(async (req,res,next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        const headers = req.headers.authorization;
        token = headers.split(' ')[1];
        if(token) {
            try {
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
            } catch (error) {
                res.status(403);
                throw new Error('User doesnt exist with this token');
            }
    }}
        
    if(!token) {
        res.status(400);
        throw new Error('Token is missing');
    }
})

export default protectRoute;
