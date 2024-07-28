import { useMutation, useQueryClient } from 'react-query';
import { updateTask } from '../api/tasksAPI';
import { storage } from '../api/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import VoiceRecorder from './VoiceRecorder';
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
  recording?: string;
};

type UpdateTaskProps = {
  open: boolean;
  toggleUpdatingTask: () => void;
};

function UpdateTask({
  open,
  toggleUpdatingTask,
  _id,
  title,
  description,
  completed,
  recording,
}: UpdateTaskProps & Task) {
  const [newTask, setNewTask] = useState<Task>({
    _id: _id,
    title: title,
    description: description,
    completed: completed,
    recording: recording || '', // Ensure the recording URL is included
  });

  const [recordingUrl, setRecordingUrl] = useState<string | undefined>(
    recording
  );

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

    try {
      if (recordingUrl) {
        const response = await fetch(recordingUrl);
        const blob = await response.blob();
        const storageRef = ref(storage, `audio/${Date.now()}.mp3`);
        const snapshot = await uploadBytes(storageRef, blob);
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log('File available at', downloadURL);
        updateTaskMutation.mutate({
          ...newTask,
          recording: downloadURL,
        });
        setRecordingUrl(undefined);
      } else {
        updateTaskMutation.mutate({ ...newTask });
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

  function updateNewTask(value: Partial<Task>) {
    setNewTask((prev) => ({
      ...prev,
      ...value,
    }));
  }

  function handleRecordingComplete(url: string) {
    setRecordingUrl(url); // Update the recording URL state
    updateNewTask({ recording: url }); // Update task state with the new recording URL
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
        onClick={(e) => e.stopPropagation()} // Prevent event propagation to the backdrop
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Paper
          sx={{
            margin: 'auto',
            padding: 2,
            maxWidth: 600,
            bgcolor: 'background.paper',
          }}
          onClick={(e) => e.stopPropagation()} // Prevent event propagation to the modal content
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
            <Box mt={2}>
              <VoiceRecorder onRecordingComplete={handleRecordingComplete} />
            </Box>
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
