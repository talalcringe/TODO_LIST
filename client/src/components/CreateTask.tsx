import { useMutation, useQueryClient } from 'react-query';
import { addTask } from '../api/tasksAPI';
import { useState } from 'react';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Box from '@mui/material/Box';

type Task = {
  _id?: number;
  title: string;
  description: string;
  completed?: boolean;
};

type CreateTaskProps = {
  open: boolean;
  updateShowAlert: (
    value: [boolean, string, 'success' | 'error' | 'info' | 'warning']
  ) => void;
  toggleCreatingTask: () => void;
};

function CreateTask({
  open,
  updateShowAlert,
  toggleCreatingTask,
}: CreateTaskProps) {
  const [newTask, setNewTask] = useState<Task>({ title: '', description: '' });
  const [creating, setCreating] = useState(false);

  const queryClient = useQueryClient();

  const addTaskMutation = useMutation({
    mutationFn: (newTask: Task) => addTask(newTask),
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
      toggleCreatingTask();
    },
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!newTask.title || !newTask.description) {
      updateShowAlert([true, 'Please enter title and description', 'error']);
      return;
    }

    try {
      await addTaskMutation.mutateAsync(newTask);

      setCreating(false);
      updateShowAlert([true, 'Task created successfully', 'success']);
    } catch (error) {
      setCreating(false);
      console.error('Error uploading file:', error);
      updateShowAlert([true, 'Error uploading task', 'error']);
    }
  }

  function updateNewTask(value: Partial<Task>) {
    setNewTask((prev) => ({
      ...prev,
      ...value,
    }));
  }

  return (
    <Backdrop
      open={open}
      onClick={toggleCreatingTask}
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Modal
        open={open}
        onClose={toggleCreatingTask}
        onClick={(e) => e.stopPropagation()}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Paper
          sx={{
            margin: 'auto',
            padding: 2,
            maxWidth: 600,
            bgcolor: 'background.paper',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Box component='form' onSubmit={handleSubmit}>
            <Typography variant='h6' m={2}>
              Create a new task
            </Typography>
            <TextField
              label='Title'
              id='newTaskTitle'
              value={newTask.title}
              onChange={(e) => updateNewTask({ title: e.target.value })}
              placeholder='Title'
              fullWidth
              margin='normal'
            />
            <TextField
              label='Description'
              id='newTaskDescription'
              value={newTask.description}
              onChange={(e) => updateNewTask({ description: e.target.value })}
              placeholder='Enter a new task'
              multiline
              rows={4}
              fullWidth
              margin='normal'
            />

            <Box display={'flex'} justifyContent={'space-between'} mt={1}>
              <Button
                variant='contained'
                color='error'
                type='button'
                onClick={toggleCreatingTask}
              >
                Cancel
              </Button>
              <Button
                variant='contained'
                color='primary'
                type='submit'
                disabled={addTaskMutation.isLoading || creating}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Paper>
      </Modal>
    </Backdrop>
  );
}

export default CreateTask;
