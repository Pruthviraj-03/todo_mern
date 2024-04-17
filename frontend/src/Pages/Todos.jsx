import React, { useState } from 'react';
import { FaSearch, FaPlus } from 'react-icons/fa';
import ParentTodo from '../Components/ParentTodo';
import { Link } from 'react-router-dom';
import "../index.css"

const Todos = () => {
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    setSearch(e.target.value);
    console.log('Search value:', e.target.value);
  };

  return (
    <>
      <div className='firstpage'>
        <div className='todos lg:w-1/3 md:w-1/2'>
          <div className='underbox'>
            <div className='topline md:text-3xl'>
              <span>Create Your Todos</span>
            </div>

            <form>
              <div className='searchbar' title='search todo'>
                <div className='searchicon'>
                  <FaSearch />
                </div>
                <input
                  value={search}
                  onChange={handleSearch}
                  placeholder='Search Todo'
                />
              </div>
            </form>

            <div className='todoboxes'>
                <ParentTodo  search={search} />
              <Link to='/createtodo'>
                <div className='addtodos md:top-1/2 md:left-1/2 md:mt-44 md:ml-28 lg:top-1/2 lg:left-1/2 lg:mt-44 lg:ml-32' title='create todo'>
                  <FaPlus />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Todos;
