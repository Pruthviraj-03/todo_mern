import React, { useState, useEffect } from 'react';
import { FaTrash, FaCopy, FaSyncAlt, FaCheck } from 'react-icons/fa';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChildTodo = ({ search, todo }) => {
    const [filteredTodos, setFilteredTodos] = useState([]);
    const [updatedText, setUpdatedText] = useState('');
    const [editingTaskId, setEditingTaskId] = useState(null);

    useEffect(() => {
        const filteredTasks = todo?.todotasks?.filter(task => 
            task.value.toLowerCase().includes(search.toLowerCase())
        ) || [];
        setFilteredTodos(filteredTasks);
    }, [search, todo]);

    const copyTodoNoti = () => {
        toast.info('Great!, You copied the todo task.', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    };

    const deleteTodoNoti = () => {
        toast.error('Oops!, You deleted the todo task.', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    };

    const handleDelete = async (taskId) => {
        try {
            await axios.delete(`/api/v2/todo/${todo.id}/task/${taskId}`);
            setFilteredTodos(filteredTodos.filter(task => task.id !== taskId));
            deleteTodoNoti();
        } catch (error) {
            console.error('Error deleting todo task:', error);
        }
    };
    
    const handleCopy = (taskValue) => {
        navigator.clipboard.writeText(taskValue);
        copyTodoNoti();
    };

    const handleCheckboxChange = async (taskId) => {
        try {
            await axios.put(`/api/v2/todo/${todo.id}/task/${taskId}/toggle`);
            const updatedTodos = filteredTodos.map(task =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            );
            setFilteredTodos(updatedTodos);
        } catch (error) {
            console.log(error, 'toggle checkbox is not working')
        }
    };

    const handleUpdate = async (taskId) => {
        try {
            await axios.put(`/api/v2/todo/${todo.id}/task/${taskId}/update`)
            const updatedTodos = filteredTodos.map(task =>
                task.id === taskId ? { ...task, value: updatedText } : task
            );
            setFilteredTodos(updatedTodos);
            setEditingTaskId(null);
        } catch (error) {
            console.log(error)
        }
    };

    const handleTaskValueChange = (newValue) => {
        setUpdatedText(newValue);
    };

    const handleStartEditing = (taskId) => {
        setEditingTaskId(taskId);
        const taskToUpdate = filteredTodos.find(task => task.id === taskId);
        setUpdatedText(taskToUpdate.value);
    };

    return (
        <>
            {filteredTodos.map((task, index) => (
                <div key={index} className='todopagenext'>
                    <div key={task.id} className='todovalue'>
                        <input type='checkbox' defaultChecked={task.completed} onChange={() => handleCheckboxChange(task.id)} />
                        {editingTaskId === task.id ? (
                            <>
                                <input
                                    type="text"
                                    style={{
                                        textDecoration: task.completed ? 'line-through' : 'none'
                                    }}
                                    value={updatedText}
                                    onChange={(e) => handleTaskValueChange(e.target.value)}
                                />
                                <div className='buttons'>
                                    <div className='updatebutton' title='update todo' onClick={() => handleUpdate(task.id)}>
                                        <FaCheck />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <input type='text' value={task.value} readOnly style={{ textDecoration: task.completed ? 'line-through' : 'none' }} />
                                <div className='buttons'>
                                    <div className='copybutton' title='copy todo' onClick={() => handleCopy(task.value)}>
                                        <FaCopy />
                                    </div>
                                    <div className='updatebutton' title='edit todo' onClick={() => handleStartEditing(task.id)}>
                                        <FaSyncAlt />
                                    </div>
                                    <div className='deleteTodos' title='delete todo' onClick={() => handleDelete(task.id)}>
                                        <FaTrash />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            ))}

            <ToastContainer />
        </>
    );
};

export default ChildTodo;
