// src/app/Task.tsx
import React from 'react';
import EditTaskModal from './EditTaskModal';
import DeleteTaskModal from './DeleteTaskModal';
import { Task as TaskType } from './types'; // Adjust path if necessary

interface TaskProps {
  task: TaskType;
  onTaskUpdated: (updatedTask: TaskType) => void;
  onTaskDeleted: (taskId: string) => void;
  onMoveTask: (taskId: string, newStatus: string) => Promise<void>; // New prop for moving tasks
}

const Task: React.FC<TaskProps> = ({ task, onTaskUpdated, onTaskDeleted, onMoveTask }) => {
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);

  const handleMoveToInProgress = async () => {
    await onMoveTask(task.id, 'IN PROGRESS');
  };

  const handleMoveToCompleted = async () => {
    await onMoveTask(task.id, 'COMPLETED');
  };

  return (
    <div className="bg-white p-4 mb-4 shadow-md rounded-md">
      <h4 className="font-bold">{task.title}</h4>
      <p>{task.description}</p>
      <button onClick={() => setShowEditModal(true)}>Edit</button>
      <button onClick={() => setShowDeleteModal(true)}>Delete</button>
      {task.status === 'TODO' && (
        <button onClick={handleMoveToInProgress}>Move to In Progress</button>
      )}
      {task.status === 'IN PROGRESS' && (
        <button onClick={handleMoveToCompleted}>Move to Completed</button>
      )}

      {showEditModal && (
        <EditTaskModal
          task={task}
          onClose={() => setShowEditModal(false)}
          onTaskUpdated={onTaskUpdated}
        />
      )}

      {showDeleteModal && (
        <DeleteTaskModal
          task={task}
          onClose={() => setShowDeleteModal(false)}
          onTaskDeleted={onTaskDeleted}
        />
      )}
    </div>
  );
};

export default Task;