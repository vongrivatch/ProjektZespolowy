import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import './TaskModal.css';

const customModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
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
    alignItems: 'center'
  },
};

Modal.setAppElement('#root');

function TaskModal({ isOpen, onRequestClose, onSubmit, familyId, selectedTask }) {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedTask && selectedTask.start) {
      const offset = selectedTask.start.getTimezoneOffset() * 60000;
      const localISOTime = (new Date(selectedTask.start - offset)).toISOString().slice(0, 16);
      setStart(localISOTime);
      setEnd('');
    }
  }, [selectedTask]);

  const handleSubmit = () => {
    if (!start || !title) {
      setError('Please fill in all required fields.');
      return;
    }

    const startDateTime = new Date(start);
    const endDateTime = end ? new Date(end) : new Date(startDateTime.getTime() + 86400000 - 1);

    onSubmit({
      title,
      start: startDateTime,
      end: endDateTime,
      description,
      status: 'To do',
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
      {error && <p style={{color: 'red'}}>{error}</p>}
      <form className="register-form">
        <div className="input-group">
          <label>Task Title:</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Task Title" required />
        </div>
        <div className="input-group">
          <label>Start Time:</label>
          <input type="datetime-local" value={start} onChange={e => setStart(e.target.value)} placeholder="Start Time" required />
        </div>
        <div className="input-group">
          <label>End Time:</label>
          <input type="datetime-local" value={end} onChange={e => setEnd(e.target.value)} placeholder="End Time (optional)" />
        </div>
        <div className="input-group">
          <label>Description:</label>
          <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Additional description (optional)" />
        </div>
        <button type="button" onClick={handleSubmit}>Create Task</button>
      </form>
    </Modal>
  );
}

TaskModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  familyId: PropTypes.string.isRequired,
  selectedTask: PropTypes.object.isRequired
};

export default TaskModal;
