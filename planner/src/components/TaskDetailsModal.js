import React from 'react';
import Modal from 'react-modal';
import './TaskModal.css';

const customModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '50%',
    transform: 'translate(-50%, -50%)',
    width: '600px', 
    maxWidth: '90%',
    border: '2px solid #ccc',
    borderRadius: '8px',
    background: '#ffffff',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    overflow: 'auto', 
    display: 'flex', 
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 1000
  },
};

Modal.setAppElement('#root');

function TaskDetailsModal({ isOpen, onRequestClose, task }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customModalStyles}
    >
      <h2>Task Details</h2>
      <div className="register-form">
        <div className="input-group">
          <label>Task Title:</label>
          <input
            type="text"
            value={task.title}
            readOnly
          />
        </div>
        <div className="input-group">
          <label>Start Time:</label>
          <input
            type="text"
            value={task.start.toLocaleString()}
            readOnly
          />
        </div>
        <div className="input-group">
          <label>End Time:</label>
          <input
            type="text"
            value={task.end.toLocaleString()}
            readOnly
          />
        </div>
        <div className="input-group">
          <label>Description:</label>
          <input
            type="text"
            value={task.description}
            readOnly
          />
        </div>
        <div className="input-group">
          <label>Status:</label>
          <input
            type="text"
            value={task.status}
            readOnly
          />
        </div>
      </div>
    </Modal>
  );
}

export default TaskDetailsModal;
