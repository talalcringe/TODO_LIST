import { useMutation, useQueryClient } from 'react-query';
import { addTask } from '../api/tasksAPI';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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
      <Box component='form' onSubmit={handleSubmit}>
        <Typography variant='h6'>Enter a new task</Typography>
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
            disabled={addTaskMutation.isLoading}
          >
            Save
          </Button>
          <Button
            variant='contained'
            color='error'
            type='button'
            onClick={toggleCreatingTask}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default CreateTask;
