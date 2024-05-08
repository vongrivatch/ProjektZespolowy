import React, { useState } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import './TaskModal.css';

const customModalStyles = {
    content: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: '2px solid #ccc',
        background: '#fff',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '4px',
        outline: 'none',
        padding: '20px',
        width: '600px',
        maxHeight: '90%'
    }
};

Modal.setAppElement('#root');

function TaskDetailsModal({ isOpen, onRequestClose, task, onUpdate }) {
    const [status, setStatus] = useState(task ? task.status : 'To do');
    const [comment, setComment] = useState(task ? task.comment : '');

    const handleUpdate = () => {
        if (task && onUpdate) {
            const updatedData = {
                status: status,
                comment: comment || ""
            };
            onUpdate(task.id, updatedData);
            onRequestClose();
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customModalStyles}
            overlayClassName="ModalOverlay"
            className="Modal"
        >
            <h2>Task Details</h2>
            <div className="register-form">
                {task ? (
                    <>
                        <div className="input-group">
                            <label>Task Title:</label>
                            <input type="text" value={task.title} readOnly />
                        </div>
                        <div className="input-group">
                            <label>Start Time:</label>
                            <input type="text" value={task.start.toLocaleString()} readOnly />
                        </div>
                        <div className="input-group">
                            <label>End Time:</label>
                            <input type="text" value={task.end.toLocaleString()} readOnly />
                        </div>
                        <div className="input-group">
                            <label>Description:</label>
                            <input type="text" value={task.description} readOnly />
                        </div>
                        <div className="input-group">
                            <label>Status:</label>
                            <select value={status} onChange={e => setStatus(e.target.value)} className="select-style">
                                <option value="To do">To do</option>
                                <option value="In progress">In progress</option>
                                <option value="Done">Done</option>
                                <option value="Declined">Declined</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label>Comment:</label>
                            <textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="Add a comment (optional)" className="text-area-style"></textarea>
                        </div>
                        <button type="button" onClick={handleUpdate}>Update Task</button>
                    </>
                ) : (
                    <p>No task selected</p>
                )}
            </div>
        </Modal>
    );
}

TaskDetailsModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    task: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        start: PropTypes.instanceOf(Date).isRequired,
        end: PropTypes.instanceOf(Date).isRequired,
        status: PropTypes.string.isRequired,
        comment: PropTypes.string,
        description: PropTypes.string.isRequired
    }).isRequired,
    onUpdate: PropTypes.func.isRequired
};

export default TaskDetailsModal;
