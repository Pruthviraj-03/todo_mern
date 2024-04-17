import { Router } from "express";
import { getTodos, deleteTodo } from "../controllers/todos.controller.js";

const router = Router()

router.route('/todos').get(getTodos)
router.route('/todos/:todoId').delete(deleteTodo);

export { router }