import { useMutation, useQueryClient } from 'react-query';
import { updateTask } from '../api/tasksAPI';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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
      <Box component='form' onSubmit={handleSubmit}>
        <Typography variant='h6' mb={1}>
          Update the task
        </Typography>
        <TextField
          label='Title'
          id='newTaskTitle'
          value={newTask?.title}
          onChange={(e) => updateNewTask({ ...newTask, title: e.target.value })}
          placeholder='Title'
          fullWidth
        />
        <TextField
          label='Description'
          id='newTaskDescription'
          value={newTask?.description}
          onChange={(e) =>
            updateNewTask({ ...newTask, description: e.target.value })
          }
          placeholder='Enter a new task'
          multiline
          rows={4}
          fullWidth
          margin='normal'
        />
        <Box display={'flex'} justifyContent={'space-between'} mt={1}>
          <Button
            variant='contained'
            color='primary'
            type='submit'
            disabled={updateTaskMutation.isLoading}
          >
            Save
          </Button>
          <Button
            variant='contained'
            color='error'
            type='button'
            onClick={toggleUpdatingTask}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default UpdateTask;
