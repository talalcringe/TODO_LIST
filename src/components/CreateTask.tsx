import { useMutation, useQueryClient } from 'react-query';
import { addTask } from '../api/tasksAPI';

import { useState } from 'react';

type Task = {
  _id?: number;
  title: string;
  description: string;
  completed?: boolean;
};

type CreateTaskProps = {
  toggleCreatingTask: () => void;
};

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
          <textarea
            id='newTaskDescription'
            value={newTask?.description}
            onChange={(e) =>
              updateNewTask({ ...newTask, description: e.target.value })
            }
            placeholder='Enter a new task'
          />
        </div>
        <br />
        <button disabled={addTaskMutation.isLoading} type='submit'>
          Save
        </button>
      </form>
    </>
  );
}

export default CreateTask;
