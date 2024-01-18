import express from 'express';
import protectRoute from '../middlewares/auth.js';
import { addTodo,updateTodo,removeTodo } from '../controllers/todoController.js';

const router = express.Router();

router.post('/addTodo', protectRoute, addTodo);
router.put('/updateTodo', protectRoute, updateTodo);
router.delete('/removeTodo', protectRoute, removeTodo);

export default router;