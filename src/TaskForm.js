import React, { useState, useEffect } from 'react';

import './TaskForm.css'

const TaskForm = ({ onSubmit, task }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setPriority(task.priority);
      setStatus(task.status);
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit({ title, priority, status, id: task?.id || Date.now() });
      setTitle('');
      setPriority('medium');
      setStatus('pending');
    }
  };

  return (
    <form className="form-inline mb-3" onSubmit={handleSubmit}>
    <div className="row">
      <div className="col-md-5">
        <input
          type="text"
          className="form-control mr-2 mb-2 input"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="col-md-2">
        <select
          className="form-control mr-2 mb-2"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>        
      </div>
      <div className="col-md-2">
        <select
          className="form-control mr-2 mb-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className="col-md-3">
        <button type="submit" className="btn btn-primary mb-2 add-task-btn">
          {task ? 'Update Task' : 'Add Task'}
        </button>
      </div>
    </div>
    </form>
  );
};

export default TaskForm;
