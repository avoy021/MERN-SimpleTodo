import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import userRoute from './routes/user.js';
import todoRoute from './routes/todo.js';
import connectDB from './config/connectDB.js';
import errorHandler from './middlewares/errorHandler.js';

const __dirname = path.resolve();
dotenv.config({ path: __dirname + '/backend/config/config.env'});

const PORT = process.env.PORT || 5000;
connectDB();

const app = express();

app.use(express.json());
app.use('/api/user', userRoute);
app.use('/api/todo', todoRoute);

app.get('/', (req,res) => {
    res.send('Home Page');
})

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));