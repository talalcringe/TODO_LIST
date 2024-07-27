import axios from 'axios';

type Task = {
  _id?: number;
  title: string;
  description: string;
  completed?: boolean;
};

const tasksAPI = axios.create({
  baseURL: 'http://localhost:3000',
});

const getTasks = async () => {
  const response = await tasksAPI.get('/tasks');
  return response.data;
};

const addTask = async (task: Task) => {
  const response = await tasksAPI.post('/tasks', task);
  return response.data;
};

const updateTask = async (task: Task) => {
  const response = await tasksAPI.patch(`/tasks/${task._id}`, task);
  return response.data;
};

const deleteTask = async (_id: number) => {
  const response = await tasksAPI.delete(`/tasks/${_id}`);
  return response.data;
};

export { getTasks, addTask, updateTask, deleteTask };
