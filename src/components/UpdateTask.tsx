import { useMutation, useQueryClient } from 'react-query';
import { updateTask } from '../api/tasksAPI';

import { useState } from 'react';

type Task = {
  _id: number;
  title: string;
  description: string;
  completed: boolean;
};

type UpdateTaskProps = {
  toggleUpdatingTask: () => void;
};

function UpdateTask({
  toggleUpdatingTask,
  _id,
  title,
  description,
  completed,
}: UpdateTaskProps & Task) {
  const [newTask, setNewTask] = useState<Task>({
    _id: _id,
    title: title,
    description: description,
    completed: completed,
  });

  const queryClient = useQueryClient();

  const updateTaskMutation = useMutation({
    mutationFn: (newTask: Task) => updateTask(newTask),
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    updateTaskMutation.mutate(newTask);
    setNewTask({
      _id: 0,
      title: '',
      description: '',
      completed: false,
    });
    toggleUpdatingTask();
  }

  function updateNewTask(value: Task) {
    setNewTask(value);
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor='newTaskTitle'>Enter a new task</label>
        <label htmlFor='newTaskDescription'></label>
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
        <button disabled={updateTaskMutation.isLoading} type='submit'>
          Save
        </button>
      </form>
    </>
  );
}

export default UpdateTask;
