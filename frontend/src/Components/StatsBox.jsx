import React from 'react';
import "../index.css";
import storage from "../image/storage.jpg";

const StatsBox = ({ todos, todoId }) => {
  const currentTodo = todos.find(todo => todo.id === todoId);

  if (!currentTodo) return null; 

  const totalTasks = currentTodo.todotasks.length;
  const completedTasks = currentTodo.todotasks.filter(task => task.completed).length;
  const incompleteTasks = totalTasks - completedTasks;
  const completionPercentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  return (
    <>
        <div className='statsbox'>
            <div className='statsimage'>
                <img src={storage} alt="storage"></img>
            </div>
            <div className='statsdata'>
                <div className='totaldatabar'>
                    <span className='value'>Total</span>
                    <div className='progressbar'>
                        <div className='totalprogress' style={{ width: `${completionPercentage}%` }}></div>
                    </div>
                    <span className='count'>{totalTasks}</span>
                </div>
                <div className='completedatabar'>
                    <span className='value'>Complete</span>
                    <div className='progressbar'>
                        <div className='completeprogress' style={{ width: `${(completedTasks / totalTasks) * 100}%`, backgroundColor: 'green' }}></div>
                    </div>
                    <span className='count'>{completedTasks}</span>
                </div>
                <div className='incompletedatabar'>
                    <span className='value'>Incomplete</span>
                    <div className='progressbar'>
                        <div className='incompleteprogress' style={{ width: `${(incompleteTasks / totalTasks) * 100}%`, backgroundColor: 'red' }}></div>
                    </div>
                    <span className='count'>{incompleteTasks}</span>
                </div>
                <div className='completiondatabar'>
                    <span className='value'>Completion</span>
                    <div className='progressbar'>
                        <div className='completionprogress' style={{ width: `${completionPercentage}%`, backgroundColor: completionPercentage === 100 ? 'green' : 'red' }}></div>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}

export default StatsBox;
