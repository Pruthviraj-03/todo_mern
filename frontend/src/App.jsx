import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Todo from './Pages/Todo';
import Todos from './Pages/Todos';
import TodoDetails from './Pages/TodoDetails';
import CreateTodo from './Pages/CreateTodo';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<Todos />} />
          <Route exact path='/todo' element={<Todo />} />
          <Route exact path='/createtodo' element={<CreateTodo />} />
          <Route path="/todo/:id" element={<TodoDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
