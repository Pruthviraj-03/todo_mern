import { createSlice, nanoid } from '@reduxjs/toolkit';
  
const initialState = {
  todos: [],
};

export const initialTodoSlice = createSlice({
  name: 'initialTodo',
  initialState,
  reducers: {

    updateTodoTitle: (state, action) => {
      const { todoId, title } = action.payload;
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === todoId ? { ...todo, title: title, updatedAt: new Date() } : todo
        )
      };
    },        

    addTodoTask: (state, action) => {
      const { todoId, task } = action.payload;
      const todoToUpdate = state.todos.find(todo => todo.id === todoId);
      if (todoToUpdate) {
        todoToUpdate.todotasks.push(task);
        todoToUpdate.updatedAt = new Date();
      }
    },
    
    deleteTodoTask: (state, action) => {
      const { taskId } = action.payload;
      state.todos.forEach(todo => {
        todo.todotasks = todo.todotasks.filter(task => task.id !== taskId);
      });
    },

    deleteTodo: (state, action) => {
      const { todoId } = action.payload;
      state.todos = state.todos.filter(todo => todo.id !== todoId);
    },
    
    copyTodo: (state, action) => {
      const { taskValue } = action.payload;
      navigator.clipboard.writeText(taskValue);
    },
    
    checkboxTodo: (state, action) => {
      const { taskId } = action.payload;
      state.todos.forEach(todo => {
        todo.todotasks.forEach(task => {
          if (task.id === taskId) {
            task.completed = !task.completed;
          }
        });
      });
    },

    categorizeTodos: (state, action) => {
      const { category } = action.payload;
      state.todos = state.todos.map(todo => {
        let filteredTasks;
        if (category === 'all') {
          filteredTasks = todo.todotasks;
        } else if (category === 'completed') {
          filteredTasks = todo.todotasks.filter(task => task.completed);
        } else if (category === 'active') {
          filteredTasks = todo.todotasks.filter(task => !task.completed);
        }
        return { 
          ...todo, 
          todotasks: filteredTasks 
        };
      });
    },    

    updateTodo: (state, action) => {
      const { taskId, taskNewText } = action.payload;
      state.todos = state.todos.map((todo) => {
        todo.todotasks = todo.todotasks.map((task) =>
          task.id === taskId ? { ...task, value: taskNewText } : task
        );
        return todo;
      });
    },

    doneTodo: (state, action) => {
      const { id, title, todotasks } = action.payload;
      const todoToUpdate = state.todos.find(todo => todo.id === id);
      if (todoToUpdate) {
        todoToUpdate.title = title;
        todoToUpdate.todotasks = todotasks;
        todoToUpdate.updatedAt = new Date();
      }
    },

    addTodo: (state, action) => {
      const { id, title, todotasks } = action.payload;
      if(title.length > 0){
        const newTodo = {
          id,
          title,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          todotasks,
        };
        state.todos.push(newTodo);
      }
    }  
  }
});

export const { addTodoTask,
  deleteTodo,
  deleteTodoTask,
  copyTodo,
  checkboxTodo,
  categorizeTodos,
  updateTodo,
  updateTodoTitle,
  doneTodo,
  addTodo } = initialTodoSlice.actions;
export default initialTodoSlice.reducer;
