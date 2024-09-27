import { useMutation, useQueryClient } from 'react-query';
import { updateTask } from '../api/tasksAPI';
import { useState } from 'react';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Box from '@mui/material/Box';

type Task = {
  _id: number;
  title: string;
  description: string;
  completed: boolean;
  duedate?: string;
};

type UpdateTaskProps = {
  open: boolean;
  updateShowAlert: (
    value: [boolean, string, 'success' | 'error' | 'info' | 'warning']
  ) => void;
  toggleUpdatingTask: () => void;
};

function UpdateTask({
  open,
  updateShowAlert,
  toggleUpdatingTask,
  _id,
  title,
  description,
  completed,
  duedate,
}: UpdateTaskProps & Task) {
  const [newTask, setNewTask] = useState<Task>({
    _id: _id,
    title: title,
    description: description,
    completed: completed,
    duedate: duedate,
  });

  const [uploading, setUploading] = useState(false);

  const queryClient = useQueryClient();

  const updateTaskMutation = useMutation({
    mutationFn: (updatedTask: Task) => updateTask(updatedTask),
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
      toggleUpdatingTask();
    },
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!newTask.title || !newTask.description) {
      updateShowAlert([true, 'Please enter title and description', 'error']);
      return;
    }

    try {
      await updateTaskMutation.mutateAsync({
        ...newTask,
      });

      setUploading(false);
      updateShowAlert([true, 'Task updated successfully', 'success']);
    } catch (error) {
      setUploading(false);
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
      onClick={toggleUpdatingTask}
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Modal
        open={open}
        onClose={toggleUpdatingTask}
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
              Update the task
            </Typography>
            <TextField
              label='Title'
              id='newTaskTitle'
              value={newTask.title}
              onChange={(e) => updateNewTask({ title: e.target.value })}
              placeholder='Title'
              fullWidth
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
            <Typography variant='subtitle1' ml={1}>
              Due Date
            </Typography>
            <TextField
              id='newTaskDueDate'
              value={newTask.duedate}
              onChange={(e) => updateNewTask({ duedate: e.target.value })}
              type='date'
              fullWidth
            />
            <Box display={'flex'} justifyContent={'space-between'} mt={1}>
              <Button
                variant='contained'
                color='error'
                type='button'
                onClick={toggleUpdatingTask}
              >
                Cancel
              </Button>
              <Button
                variant='contained'
                color='primary'
                type='submit'
                disabled={updateTaskMutation.isLoading || uploading}
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

export default UpdateTask;
