// src/app/Column.tsx
import React from 'react';
import Task from './Task';
import { Task as TaskType } from './types'; // Adjust path if necessary
import { Draggable, Droppable } from 'react-beautiful-dnd';

interface ColumnProps {
  status: string;
  tasks: TaskType[];
  onTaskUpdated: (updatedTask: TaskType) => void;
  onTaskDeleted: (taskId: string) => void;
  onMoveTask: (taskId: string, newStatus: string) => Promise<void>; // New prop for moving tasks
  provided: any; // Adjust type if necessary
}

const Column: React.FC<ColumnProps> = ({ status, tasks, onTaskUpdated, onTaskDeleted, onMoveTask, provided }) => {
  return (
    <div
      className="bg-gray-200 rounded-lg shadow-md p-4 w-64"
      ref={provided.innerRef} // Attach the innerRef here
      {...provided.droppableProps} // Spread droppableProps here
    >
      <h3 className="text-lg font-bold mb-2">{status}</h3>
      {tasks.map((task, index) => (
        <Draggable key={task.id} draggableId={task.id} index={index}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <Task
                task={task}
                onTaskUpdated={onTaskUpdated}
                onTaskDeleted={onTaskDeleted}
                onMoveTask={onMoveTask} // Pass the move task handler
              />
            </div>
          )}
        </Draggable>
      ))}
      {provided.placeholder} {/* Render the placeholder */}
    </div>
  );
};

export default Column;