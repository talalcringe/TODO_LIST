import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
} from 'react-query';
import { getTasks, addTask, updateTask, deleteTask } from '../api/tasksAPI';

import { useState } from 'react';

type Task = {
  id?: number;
  title: string;
  description: string;
  completed?: boolean;
};

type CreateTaskProps = {
  toggleCreatingTask: () => void;
  //   handleSubmit: (e: any) => void;
  //   newTask: string;
  //   updateNewTask: (newTask: string) => void;
};

// function CreateTask({
//   toggleCreatingTask,
//   handleSubmit,
//   newTask,
//   updateNewTask,
// }: CreateTaskProps) {

function CreateTask({ toggleCreatingTask }: CreateTaskProps) {
  const [newTask, setNewTask] = useState<Task>({ title: '', description: '' });

  const queryClient = useQueryClient();

  const addTaskMutation = useMutation({
    mutationFn: (newTask: Task) => addTask(newTask),
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
    },
  });

  function handleSubmit(e: React.FormEvent) {
    console.log('newTask', newTask);

    e.preventDefault();
    addTaskMutation.mutate(newTask);
    setNewTask({ title: '', description: '' });
    toggleCreatingTask();
  }

  function updateNewTask(value: Task) {
    setNewTask(value);
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor='newTaskTitle'>Enter a new task</label>
        <label htmlFor='newTaskDescription'>Enter a new task</label>
        <div>
          <input
            type='text'
            id='newTaskTitle'
            value={newTask?.title}
            onChange={(e) =>
              updateNewTask({ ...newTask, title: e.target.value })
            }
            placeholder='Title'
          />
        </div>
        <div>
          <input
            type='text'
            id='newTaskDescription'
            value={newTask?.description}
            onChange={(e) =>
              updateNewTask({ ...newTask, description: e.target.value })
            }
            placeholder='Enter a new task'
          />
        </div>
        <br />
        <button type='submit' onClick={toggleCreatingTask}>
          Save
        </button>
      </form>
    </>
  );
}

export default CreateTask;
