// src/api/tasks.ts
import { db } from '../firebase'; // Ensure this path is correct
import { collection, addDoc, getDocs } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next'; // Import types for req and res

// Function to handle API requests
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Handle adding a new task
    try {
      const task = req.body; // Assuming the task data is sent in the request body
      const docRef = await addDoc(collection(db, 'tasks'), task);
      res.status(201).json({ id: docRef.id });
    } catch (error) {
      console.error("Error adding task: ", error);
      res.status(500).json({ error: 'Failed to add task' });
    }
  } else if (req.method === 'GET') {
    // Handle fetching tasks
    try {
      const tasksCollection = collection(db, 'tasks');
      const taskSnapshot = await getDocs(tasksCollection);
      const taskList = taskSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.status(200).json(taskList);
    } catch (error) {
      console.error("Error fetching tasks: ", error);
      res.status(500).json({ error: 'Failed to fetch tasks' });
    }
  } else {
    // Handle unsupported methods
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}