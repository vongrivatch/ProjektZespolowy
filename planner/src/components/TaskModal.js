import React, { useState } from 'react';
import Modal from 'react-modal';
import './TaskModal.css'

const customModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '300px',
    maxWidth: '90%',
    border: '2px solid #ccc',
    borderRadius: '8px',
    background: '#ffffff',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
};

Modal.setAppElement('#root');

function TaskModal({ isOpen, onRequestClose, onSubmit, familyId }) {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [description, setDescription] = useState('');
  const status = 'To do';

  const handleSubmit = () => {
    const endFinal = end || new Date(start).setHours(23, 59, 59, 999);
    onSubmit({
      title,
      start,
      end: endFinal,
      description,
      status,
      familyId
    });
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customModalStyles}
    >
      <h2>Create New Task</h2>
      <form className="register-form">
        <div className="input-group">
          <label>Task Title:</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task Title"
          />
        </div>
        <div className="input-group">
          <label>Start Time:</label>
          <input
            type="datetime-local"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            placeholder="Start Time"
          />
        </div>
        <div className="input-group">
          <label>End Time:</label>
          <input
            type="datetime-local"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            placeholder="End Time (optional)"
          />
        </div>
        <div className="input-group">
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Additional description (optional)"
          />
        </div>
        <button type="button" onClick={handleSubmit}>Create Task</button>
      </form>
    </Modal>
  );  
}

export default TaskModal;
