import React from 'react'
import './EditTaskModal.css'
import { useState } from 'react';
const updateTask = ({ task, onClose, onSave }) => {

    const [assignedTo, setAssignedTo] = useState(task.assignedTo);
    const [status, setStatus] = useState(task.status);
    const [priority, setPriority] = useState(task.priority);
    const [dueDate, setDueDate] = useState(task.dueDate);
    const [comments, setComments] = useState(task.comments);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...task, assignedTo, status, priority, dueDate, comments });
        onClose();
    };


  return (
    <div className="modal-content">
    <h2>Edit Task</h2>
    <form onSubmit={handleSubmit}>
    <div className='grid-container'>
        <div>
                        <label>
                            Assigned To :
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
                            Status :
                            <select value={status} onChange={(e)=> setStatus(e.target.value)}>
                                <option value="Not Started">Not Started</option>
                                <option value="In progress">In progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>
                            Due Date :
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
                            Priority:
                            <select value={priority} onChange={(e)=> setPriority(e.target.value)} required>
                                <option value="Low">Low</option>
                                <option value="Normal">Normal</option>
                                <option value="High">High</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>
                            Description :
                            <textarea 
                                value={comments} 
                                onChange={(e) => setComments(e.target.value)}  
                            />
                        </label>
                    </div>
                    </div>
        <div className='btns'>
            <button type="submit" id='save'>Save</button>
            <button type="button" id='cancel' onClick={onClose}>Cancel</button>
        </div>
    </form>
</div>
  )
}

export default updateTask
