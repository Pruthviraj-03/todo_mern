import { combineReducers } from 'redux';
import initialTodoReducer from './initialTodoSlice';

const rootReducer = combineReducers({
  initialTodo: initialTodoReducer,
});

export default rootReducer;