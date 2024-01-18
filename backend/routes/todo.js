import express from 'express';
import protectRoute from '../middlewares/auth.js';
import { addTodo,updateTodo,removeTodo,getTodos } from '../controllers/todoController.js';

const router = express.Router();

router.get('/',protectRoute, getTodos)
router.post('/', protectRoute, addTodo);
router.put('/', protectRoute, updateTodo);
router.delete('/', protectRoute, removeTodo);

export default router;