// import logo from './logo.svg';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import AddTask from './components/AddTask';
import EditTaskModal from './components/EditTaskModal';

function App() {
  const[isModalOpen, setModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [taskId, setTaskId] = useState();

    const fetchTasks = async () => {
        const response = await axios.get('http://localhost:5000/tasks');
        setTasks(response.data);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const addTask = (task) => {
      setTasks([...tasks, task]);
    };

    const UpdateTask = async (updatedTask) => {
      var id = taskId;
      console.log('id -> ',taskId);
      console.log('data ',updatedTask);
      await axios.put(`http://localhost:5000/tasks/${id}`, updatedTask);
      //setTasks(tasks.map(task => (task.id === id ? { ...task, ...updatedTask } : task)));
      setTasks(prevTasks =>
        prevTasks.map(task => (task.id === id ? { ...task, ...updatedTask } : task))
      );
  };

  const deleteTask = async (id) => {

      await axios.delete(`http://localhost:5000/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
  };

  const handleAction = (action, taskId) => {
    setTaskId(taskId);
    if (action === 'edit') {
        const taskToEdit = tasks.find(task => task.id === taskId);
        setSelectedTask(taskToEdit);
        setUpdateModalOpen(true);
    } else if (action === 'delete') {
        const userConfirmed = confirm("Are you sure you want to delete this record?");
        if (userConfirmed) {
            deleteTask(taskId);
            alert("Record deleted.");
        }
    }
};

  return (
    <div>
      <button onClick={()=>setModalOpen(true)}>New Task</button>      
      <table className='task-table'>
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Assign to</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Comments</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {tasks.map((todo, i) => (
                    <tr key={todo.id}>
                        <td>{i + 1}</td>
                        <td>{todo.assignedTo}</td>
                        <td>{todo.status}</td>
                        <td>{todo.priority}</td>
                        <td>{todo.dueDate}</td>
                        <td>{todo.comments}</td>
                        <td>
                            <select
                                onChange={(e) => handleAction(e.target.value, todo.id)}
                                defaultValue=""
                            >
                                <option value="" disabled>Select an action</option>
                                <option value="edit">Edit</option>
                                <option value="delete">Delete</option>
                            </select>
                        </td>
                    </tr>
                ))}
        </tbody>
      </table>

      {isModalOpen && (
        <AddTask onClose={()=>setModalOpen(false)} addTask={addTask}></AddTask>
      )}


      {isUpdateModalOpen && (
                <EditTaskModal
                    task={selectedTask}
                    onClose={() => setUpdateModalOpen(false)}
                    onSave={UpdateTask}
                />
      )};
      
    </div>
  );
}

export default App;
