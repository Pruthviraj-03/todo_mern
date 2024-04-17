import { Router } from 'express'
import { addTodo, getTodoDetails, addTodoTask, updateTodoTitle, doneTodo, deleteTodoTask, toggleTodoTaskCompletion, updateTodoTask } from '../controllers/todo.controller.js'
const router = Router()

router.route('/todo/:todoId').get(getTodoDetails)
router.route('/todo').post(addTodo)
router.route('/todo/:todoId').post(addTodoTask)
router.route('/todo/:todoId').put(updateTodoTitle)
router.route('/todo/:todoId').put(doneTodo)
router.route('/todo/:todoId/task/taskId').delete(deleteTodoTask)
router.route('/todo/:todoId/task/:taskId/toggle').put(toggleTodoTaskCompletion)
router.route('/todo/:todoId/task/:taskId/update').put(updateTodoTask)

export { router }