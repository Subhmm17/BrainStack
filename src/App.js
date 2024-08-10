import { useEffect, useState } from 'react';
import './App.css';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState({ status: '', priority: '' });

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);
  
  const addTask = (task) => {
    if (editingTask) {
      const edited = tasks.map((t) => (t.id === task.id ? task : t))
      setTasks(edited);
      setEditingTask(null);
    } else {
      const data = [...tasks, task]
      setTasks(data);
      localStorage.setItem('tasks', JSON.stringify(data));
    }
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => {
      const data = prevTasks.filter((task) => task.id !== id)
      localStorage.setItem('tasks', JSON.stringify(data));
      return data
    });
  };

  const editTask = (task) => {
    setEditingTask(task);
  };

  const handleFilterChange = (key, value) => {
    setFilter((prevFilter) => ({ ...prevFilter, [key]: value }));
  };

  const getDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthName = months[date.getMonth()];
    return `${monthName} ${day}, ${year} ${hours}:${minutes}:${seconds}`;
  };

  const [date, setDate] = useState(getDate());
  useEffect(() => {
    const interval = setInterval(() => {
      setDate(getDate());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
        backgroundColor: "rgba(221, 191, 80, 0)",
        height: '100vh'
    }}>
      <header className="bg-black text-white p-3">
        <h1 className="display-6">BrainTrack</h1>
      </header>
      <div className="container mt-2 p-5" style={{
        minWidth: '100px',
        width: '80vw'
      }}>
        <div className="detail mb-4">
          <h1 className='display-5'>Hi Shubham</h1>
          <span className='text-muted'>{date}</span>
          <br />
          <q className='text-muted'>The secret of getting ahead is getting started</q>
        </div>
        <TaskForm onSubmit={addTask} task={editingTask} />
        <div className="mb-3">
          <div className="d-flex gap-2">
            <select
              className="form-control w-auto"
              onChange={(e) => handleFilterChange('status', e.target.value)}
              value={filter.status}
            >
              <option value="">Filter by Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <select
              className="form-control w-auto ml-2"
              onChange={(e) => handleFilterChange('priority', e.target.value)}
              value={filter.priority}
            >
              <option value="">Filter by Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
        <TaskList
          tasks={tasks}
          onEdit={editTask}
          onDelete={deleteTask}
          filter={filter}
        />
      </div>
    </div>
  );
}

export default App;
