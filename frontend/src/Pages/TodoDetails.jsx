import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Todo from './Todo';
import { useParams } from 'react-router-dom';

const TodoDetails = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodoDetails = async () => {
      try {
        const response = await axios.get(`/api/v2/todo/${id}`);
        setTodo(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching todo details:', error);
        setLoading(false);
      }
    };

    fetchTodoDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!todo) {
    return <div>Todo not found</div>;
  }

  return (
    <>
      <Todo todo={todo} />
    </>
  );
};

export default TodoDetails;
