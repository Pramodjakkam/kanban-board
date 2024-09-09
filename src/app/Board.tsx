// src/app/Board.tsx

'use client';
import React, { useState, useEffect } from 'react';
import { db } from '../app/firebase';
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import Column from './Column';
import CreateTaskModal from './CreateTaskModal';
import { Task } from './types'; // Adjust path if necessary
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const Board: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'tasks'), (snapshot) => {
      const tasksData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Task[];
      setTasks(tasksData);
    });

    return unsubscribe;
  }, []);

  const handleTaskCreated = (newTask: Task) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleTaskUpdated = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const handleTaskDeleted = (deletedTaskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== deletedTaskId));
  };

  const handleMoveTask = async (taskId: string, newStatus: string) => {
    await updateDoc(doc(db, 'tasks', taskId), {
      status: newStatus,
    });

    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task))
    );
  };

  const handleDragEnd = async (result: any) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const draggedTask = tasks[source.index];
    const newStatus = destination.droppableId;

    await updateDoc(doc(db, 'tasks', draggedTask.id), {
      status: newStatus,
    });

    const updatedTasks = Array.from(tasks);
    updatedTasks.splice(source.index, 1);
    updatedTasks.splice(destination.index, 0, { ...draggedTask, status: newStatus });
    setTasks(updatedTasks);
  };

  return (
    <div>
      <button onClick={() => setShowCreateModal(true)}>Create Task</button>
      {showCreateModal && (
        <CreateTaskModal onClose={() => setShowCreateModal(false)} onTaskCreated={handleTaskCreated} />
      )}

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex space-x-4 p-4">
          <Droppable droppableId="TODO">
            {(provided) => (
              <Column
                status="TODO"
                tasks={tasks.filter((task) => task.status === 'TODO')}
                onTaskUpdated={handleTaskUpdated}
                onTaskDeleted={handleTaskDeleted}
                onMoveTask={handleMoveTask}
                provided={provided} // Pass the provided prop
              />
            )}
          </Droppable>
          <Droppable droppableId="IN PROGRESS">
            {(provided) => (
              <Column
                status="IN PROGRESS"
                tasks={tasks.filter((task) => task.status === 'IN PROGRESS')}
                onTaskUpdated={handleTaskUpdated}
                onTaskDeleted={handleTaskDeleted}
                onMoveTask={handleMoveTask}
                provided={provided} // Pass the provided prop
              />
            )}
          </Droppable>
          <Droppable droppableId="COMPLETED">
            {(provided) => (
              <Column
                status="COMPLETED"
                tasks={tasks.filter((task) => task.status === 'COMPLETED')}
                onTaskUpdated={handleTaskUpdated}
                onTaskDeleted={handleTaskDeleted}
                onMoveTask={handleMoveTask}
                provided={provided} // Pass the provided prop
              />
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;