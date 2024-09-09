// src/components/CreateTaskModal.tsx
import React, { useState } from 'react';
import { db } from '../app/firebase'; // Adjust the path if necessary
import { collection, addDoc } from 'firebase/firestore';

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

interface CreateTaskModalProps {
  onClose: () => void;
  onTaskCreated: (task: Task) => void;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ onClose, onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'tasks'), {
        title,
        description,
        status: 'TODO',
      });
      onTaskCreated({ id: docRef.id, title, description, status: 'TODO' });
      onClose();
    } catch (error) {
      console.error('Error adding task: ', error);
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
          required
        />
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <button type="submit">Create Task</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default CreateTaskModal;