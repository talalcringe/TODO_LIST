import { useMutation, useQueryClient } from 'react-query';
import { updateTask } from '../api/tasksAPI';
import { useState, useEffect } from 'react';
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

  const queryClient = useQueryClient();

  // Mutation to update the task
  const updateTaskMutation = useMutation({
    mutationFn: (updatedTask: Task) => updateTask(updatedTask),
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
      localStorage.removeItem(`pendingTaskUpdate_${newTask._id}`); // Remove the task from localStorage once saved
      toggleUpdatingTask();
      updateShowAlert([true, 'Task updated successfully', 'success']);
    },
    onError: () => {
      // Inform the user that the task data is saved locally
      localStorage.setItem(
        `pendingTaskUpdate_${newTask._id}`,
        JSON.stringify(newTask)
      ); // Save current task to localStorage
      updateShowAlert([
        true,
        'No internet connection. Task saved locally.',
        'info',
      ]);
    },
  });

  // Save the task in localStorage on every change (keystroke)
  function updateNewTask(value: Partial<Task>) {
    const updatedTask = {
      ...newTask,
      ...value,
    };
    setNewTask(updatedTask);
    localStorage.setItem(
      `pendingTaskUpdate_${updatedTask._id}`,
      JSON.stringify(updatedTask)
    ); // Save the current task to localStorage
  }

  // Attempt to upload the task when the user goes back online
  useEffect(() => {
    const handleOnline = async () => {
      const pendingTaskUpdate = localStorage.getItem(
        `pendingTaskUpdate_${newTask._id}`
      );
      if (pendingTaskUpdate) {
        const savedTask: Task = JSON.parse(pendingTaskUpdate);
        try {
          await updateTaskMutation.mutateAsync(savedTask);
          localStorage.removeItem(`pendingTaskUpdate_${savedTask._id}`); // Clear the task from localStorage if successful
          updateShowAlert([true, 'Task synced successfully', 'success']);
        } catch (error) {
          console.error('Error syncing task:', error);
          updateShowAlert([true, 'Error syncing task', 'error']);
        }
      }
    };

    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, [newTask._id, updateTaskMutation, updateShowAlert]);

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
          <Box component='form' onSubmit={(e) => e.preventDefault()}>
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
                onClick={() => updateTaskMutation.mutate(newTask)}
                disabled={updateTaskMutation.isLoading}
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
