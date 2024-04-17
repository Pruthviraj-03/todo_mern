import { Todo } from '../models/todo.model.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { ApiError } from '../utils/ApiError.js'
import { asyncHandler } from '../utils/AsyncHandler.js'

const getTodoDetails = asyncHandler(async (req, res) => {
    try {
        const { todoId } = req.params;
        await Todo.findById(todoId);
        return res.json(
            new ApiResponse(200, {}, "Todo found successfully")
        );
    } catch (error) {
        throw new ApiError(404, 'Failed to found todo');
    }
});

const addTodo = asyncHandler(async (req, res) => {
    try {
        const { title, todotasks } = req.body

        if(!title.trim()){
            throw new ApiError('Title value is required')
        }

        const newTodo = new Todo({
            title,
            todotasks,
            createdAt: new Date(),
            updatedAt: new Date()
        })

        await newTodo.save()

        return res.json(
            new ApiResponse(201, newTodo, "Todo added successfully")
        );

    } catch (error) {
        throw new ApiError('Failed to add the new todo')
    }
});

const addTodoTask = asyncHandler(async (req, res) => {
    try {
      const { todoId } = req.params;
      const { id, value, completed, createdAt, updatedAt } = req.body;
  
      const todo = await Todo.findById(todoId);
      if (!todo) {
        throw new ApiError(404, 'Todo not found');
      }
  
      todo.todotasks.push({ id, value, completed, createdAt, updatedAt });
      todo.updatedAt = new Date();
      await todo.save();
  
      return res.json(new ApiResponse(200, {}, 'Task added to todo successfully'));

    } catch (error) {
      throw new ApiError(500, 'Failed to add task to todo');
    }
});

const updateTodoTitle = asyncHandler(async (req, res) => {
    try {
        const { todoId } = req.params;
        const { title } = req.body;

        const todo = await Todo.findById(todoId);
        if (!todo) {
        throw new ApiError(404, 'Todo not found');
        }

        todo.title = title;
        todo.updatedAt = new Date();
        await todo.save();

        return res.json(new ApiResponse(200, {}, 'Todo title updated successfully'));
    } catch (error) {
        throw new ApiError(500, 'Failed to update the title of the todo');
    }
});

const doneTodo = asyncHandler(async (req, res) => {
    try {
        const { todoId } = req.params
        const { title, todotasks } = req.body

        const todo = await Todo.findById(todoId);
        if (!todo) {
        throw new ApiError(404, 'Todo not found');
        }

        todo.title = title,
        todo.todotasks = todotasks,
        todo.updatedAt = new Date();
        await todo.save();

        return res.json(new ApiResponse(200, {}, 'Todo updated successfully'));
    } catch (error) {
        throw new ApiError(500, 'Failed to update todo')
    }
})
  
const deleteTodoTask = asyncHandler(async (req, res) => {
    try {
        const { todoId, taskId } = req.params;
        const todo = await Todo.findById(todoId);
        if (!todo) {
            throw new ApiError(404, 'Todo not found');
        }
        todo.todotasks = todo.todotasks.filter(task => task._id !== taskId);
        await todo.save();
        return res.json(new ApiResponse(200, {}, "Todo task deleted successfully"));
    } catch (error) {
        throw new ApiError(500, 'Failed to delete todo task');
    }
});

const toggleTodoTaskCompletion = asyncHandler(async (req, res) => {
    try {
        const { todoId, taskId } = req.params;
        const todo = await Todo.findById(todoId);
        if (!todo) {
            throw new ApiError(404, 'Todo not found');
        }

        const task = todo.todotasks.find(task => task._id === taskId);
        if (!task) {
            throw new ApiError(404, 'Todo task not found');
        }

        task.completed = !task.completed;
        await todo.save();
        
        return res.json(new ApiResponse(200, {}, "Todo task completion status updated successfully"));
    } catch (error) {
        throw new ApiError(500, 'Failed to update todo task completion status');
    }
});

const updateTodoTask = asyncHandler(async (req, res) => {
    try {
        const { todoId, taskId } = req.params;
        const { updatedValue } = req.body;

        const todo = await Todo.findById(todoId);
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        const task = todo.todotasks.find(task => task._id === taskId);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        task.value = updatedValue;
        await todo.save();

        return res.json(new ApiResponse(200, {}, "Task value updated successfully"));

    } catch (error) {
        throw new ApiError(500, 'Failed to update task value')
    }
})

export { getTodoDetails, addTodo, addTodoTask, updateTodoTitle, doneTodo, deleteTodoTask, toggleTodoTaskCompletion, updateTodoTask };