import React from 'react';

import './TaskList.css'

const TaskList = ({ tasks, onEdit, onDelete, filter }) => {
  const filteredTasks = tasks.filter(
    (task) =>
      (filter.status ? task.status === filter.status : true) &&
      (filter.priority ? task.priority === filter.priority : true)
  );

  const getPriority = (priority) => {
    if(priority == 'medium')
      return 'bg-warning'
    if(priority == 'high')
      return 'bg-success'
    return 'bg-danger'
  }

  return (
    <ul className="list-group">
      {filteredTasks.map((task) => (
        <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center fade-in todo-item">
          <span>
            <strong style={{
              marginRight: '5px'
            }} className='text-white'>{task.title}</strong> 
            <span className={`badge ${getPriority(task.priority)}`} style={{
              marginRight: '5px'
            }}>
              {task.priority}
            </span>
            <span className={`badge ${task.status === 'completed' ? 'bg-success' : 'bg-primary'}`}>
              {task.status}
            </span>
          </span>
          <div>
            <i className="fas fa-edit text-white" style={{marginRight: '7px'}} onClick={() => onEdit(task)}></i>
            <i className="fas fa-trash-alt text-danger ml-5" onClick={() => onDelete(task.id)}></i>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
