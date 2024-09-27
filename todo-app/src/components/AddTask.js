import React, { useState } from 'react'
import axios from 'axios';
import './AddTask.css';

const AddTask = ({onClose, addTask}) => {


  const [assignedTo, setAssignedTo] = useState('');
  const [status, setStatus] = useState('Not Started');
  const [priority, setPriority] = useState('Low');
  const [dueDate, setDueDate] = useState('');
  const [comments, setComments] = useState('');

  const handleSubmit =  async(e)=>{
    e.preventDefault();
    const newTask = {
      assignedTo,
      status,
      priority,
      dueDate,
      comments,
    };

    try {
      const response = await axios.post('http://localhost:5000/task', newTask);
      addTask(response.data); // Add task to the local state
      setAssignedTo('');
      setStatus('');
      setPriority('');
      setDueDate('');
      setComments('');
      onClose();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  }

  return (
    <div>
          <div className="modal-content">
                <span id="close" onClick={onClose}>&times;</span>
                <h2>Add To-Do</h2>
                <form onSubmit={handleSubmit}>
                    <div className='grid-container'>
                    <div>
                        <label>
                            Assigned To :<br/>
                            <input 
                                type="text" 
                                value={assignedTo} 
                                onChange={(e) => setAssignedTo(e.target.value)} 
                                required 
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Status : <br/>
                            <select value={status} onChange={(e)=> setStatus(e.target.value)}>
                                <option value="Not Started">Not Started</option>
                                <option value="In progress">In progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>
                            Due Date : <br/>
                            <input 
                                type="date" 
                                value={dueDate} 
                                onChange={(e) => setDueDate(e.target.value)} 
                                required 
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Priority : <br/>
                            <select value={priority} onChange={(e)=> setPriority(e.target.value)} required>
                                <option value="Low">Low</option>
                                <option value="Normal">Normal</option>
                                <option value="High">High</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>
                            Description : <br/>
                            <textarea 
                                value={comments} 
                                onChange={(e) => setComments(e.target.value)}  
                            />
                        </label>
                    </div>
                    </div>
                    <div style={{'display':'flex', 'justify-content': 'center','align-items': 'center'}}>
                    <button type="submit" id='submit'>Add Todo</button></div>
                </form>
            </div>
    </div>
  )
}

export default AddTask
