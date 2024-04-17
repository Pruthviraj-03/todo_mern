import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ParentTodo = ({ search }) => {

  const [todos, setTodos] = useState([]);

  const deleteTodoNoti = () => {
    toast.error('Oops!, You delete the todo.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        style: {
            background: "#ff6f61",
            color: "#ffffff", 
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", 
            fontSize: "16px",
            fontWeight: "bold", 
        },
    });
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('/api/v1/todos'); 
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  const handleDelete = async (todoId) => {
    try {
      await axios.delete(`/api/v1/todos/${todoId}`); 
      setTodos(todos.filter(todo => todo.id !== todoId)); 
      deleteTodoNoti()
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const filteredTodos = Array.isArray(todos) ? todos.filter(todo => todo.title.toLowerCase().includes(search.toLowerCase())) : [];

  return (
    <>
      {filteredTodos.map(todo => (
        <div key={todo.id} className='box md:w-40 md:h-44 md:ml-2 lg:w-44 lg:h-48 lg:ml-3' title='open todo'>
          <Link to={`/todo/${todo.id}`}>
            <h3>{todo.title}</h3>
          </Link>
          <div className='deletetodo' title='delete todo' onClick={() => handleDelete(todo.id)}>
            <FaTrash />
          </div>
        </div>
      ))}
      <ToastContainer />
    </>
  );
};

export default ParentTodo;



