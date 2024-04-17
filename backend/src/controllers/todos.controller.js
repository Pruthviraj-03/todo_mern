import { Todo } from '../models/todo.model.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { ApiError } from '../utils/ApiError.js'
import { asyncHandler } from '../utils/AsyncHandler.js'

const getTodos = asyncHandler(async (req, res) => {
    try {
        const todos = await Todo.find()
        return res.json(
            new ApiResponse(200,todos,"Get all todos successfully")
        )
    } catch (error) {
        throw new ApiError(404, "Failed to fectch the todos")
    }
})

const deleteTodo = asyncHandler(async (req, res) => {
    try {
        const { todoId } = req.params;
        await Todo.findByIdAndDelete(todoId);
        return res.json(
            new ApiResponse(200, {}, "Todo deleted successfully")
        );
    } catch (error) {
        throw new ApiError(404, 'Failed to delete todo');
    }
});

export { getTodos, deleteTodo };
