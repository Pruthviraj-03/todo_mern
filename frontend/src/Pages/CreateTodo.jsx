import React, { useState } from 'react';
import { FaSearch, FaCheck, FaArrowLeft, FaEllipsisV, FaPlus } from 'react-icons/fa';
import StatsBox from '../Components/StatsBox';
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import TodoTask from '../Components/TodoTask';

const CreateTodo = () => {
  const [openStats, setOpenStats] = useState(false);
  const [search, setSearch] = useState('');
  const [todoText, setTodoText] = useState('');
  const [temporaryTodo, setTemporaryTodo] = useState({
    title: '',
    todotasks: []
  });
  const [isBackButtonVisible, setBackButtonVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState([])
  const [filteredTodos, setFilteredTodos] = useState(todos);

  const handleOpenStats = () => {
    setOpenStats(!openStats);
  };

  const formatDate = (date) => {
    return date.toLocaleString('en-US', {
      day: 'numeric',
      month: 'long',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  }

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleInputChange = (e) => {
    setTodoText(e.target.value);
  };

  const handleAddTodoTask = () => {
    if (todoText.trim() !== '') {
      const newTask = {
        value: todoText,
        completed: false
      };

      setTemporaryTodo(prevTodo => ({
        ...prevTodo,
        todotasks: [...prevTodo.todotasks, newTask]
      }));
      console.log('Task added:', newTask.value);
      setTodoText('');
    }
  };

  const handleFilterTodos = (category) => {
    console.log('Selected category:', category);
    let filteredTodos = [];
    if (category === 'all') {
      filteredTodos = todos;
    } else if (category === 'completed') {
      filteredTodos = todos.filter(todo => todo.todotasks.some(task => task.completed));
    } else if (category === 'active') {
      filteredTodos = todos.filter(todo => todo.todotasks.some(task => !task.completed));
    }
    setFilteredTodos(filteredTodos);
  };

  const handleAddTodo = async () => {
    try {
      const todoData = {
        title: title,
        todotasks: temporaryTodo.todotasks
      };
      await axios.post('/api/v2/todo', todoData);
      console.log('todo added')
      setBackButtonVisible(true);
    } catch (error){
      console.error('Error adding todo:', error);
    }
  };                      

  return (
    <>
      <div className='secondpage'>
        <div className='todo lg:w-1/3 md:w-1/2'>
          <div className='underbox'>
            <div className="titlebar">
              <input
                placeholder="Title"
                value={title}
                onChange={handleTitleChange}
              />
              {isBackButtonVisible ? (
                <Link to="/">
                  <div className='backButton md:mt-2 md:ml-2 lg:mt-2 lg:ml-8' title='back'>
                    <FaArrowLeft />
                  </div>
                </Link>
              ) : (
                <div className='donetodo md:mt-2 md:ml-2 lg:mt-2 lg:ml-8' onClick={handleAddTodo} >
                  <FaCheck />
                </div>
              )}
            </div>

            {/* <div className='datebar'>
              {todo.updatedAt !== todo.createdAt && (
                <span>{formatDate(todo.updatedAt)}</span>
              )}
            </div> */}

            <div className="addtodobar">
              <input
                placeholder="Add todo"
                value={todoText}
                onChange={handleInputChange}
              />
              <div className='addTodo' title='add' onClick={handleAddTodoTask}>
                <FaPlus />
              </div>
            </div>

            <form>
              <div className='searchBar'>
                <input
                  type='text'
                  placeholder='Search Todos'
                  value={search}
                  onChange={handleSearch}
                  title='search todo'
                />
                <div className='searchIcon' title='search'>
                  <FaSearch />
                </div>
              </div>
            </form>

            <div className='statsbar'>
              <span>Stats of your todos</span>
              <div className='horizontaldots' title='open the stats' onClick={handleOpenStats}>
                <FaEllipsisV />
              </div>
            </div>

            {/* {openStats && <StatsBox todos={todos} todoId={todoId} />} */}

            <div className='checktodos'>
              <div className='activetodos' title='active todos' onClick={() => handleFilterTodos('active')}>
                <h3>active</h3>
              </div>
              <div className='completedtodos' title='completed todos' onClick={() => handleFilterTodos('completed')}>
                <h3>completed</h3>
              </div>
              <div className='alltodos' title='all todos' onClick={() => handleFilterTodos('all')}>
                <h3>all</h3>
              </div>
            </div>

            <div className={`allTodos ${openStats ? 'stats-open' : 'stats-closed'}`}>
              <TodoTask search={search} todo={temporaryTodo} />
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default CreateTodo;

