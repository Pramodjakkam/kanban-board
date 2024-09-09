import React from 'react';
import { db } from '../app/firebase';
import { doc, deleteDoc } from 'firebase/firestore';

interface Task {
  id: string;
  title: string;
}

interface DeleteTaskModalProps {
  task: Task;
  onClose: () => void;
  onTaskDeleted: (taskId: string) => void;
}

const DeleteTaskModal: React.FC<DeleteTaskModalProps> = ({ task, onClose, onTaskDeleted }) => {
  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'tasks', task.id));
      onTaskDeleted(task.id);
      onClose();
    } catch (error) {
      console.error('Error deleting task: ', error);
    }
  };

  return (
    <div className="modal">
      <h3>Delete Task</h3>
      <p>Are you sure you want to delete "{task.title}"?</p>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default DeleteTaskModal;