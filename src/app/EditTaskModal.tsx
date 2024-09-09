// src/components/EditTaskModal.tsx
import React, { useState } from 'react';
import { db } from '../app/firebase';
import { doc, updateDoc } from 'firebase/firestore';

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

interface EditTaskModalProps {
  task: Task;
  onClose: () => void;
  onTaskUpdated: (updatedTask: Task) => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ task, onClose, onTaskUpdated }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, 'tasks', task.id), {
        title,
        description,
      });
      onTaskUpdated({ ...task, title, description });
      onClose();
    } catch (error) {
      console.error('Error updating task: ', error);
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default EditTaskModal;