import { useMutation, useQueryClient } from 'react-query';
import { addTask } from '../api/tasksAPI';
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
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

type Task = {
  _id?: number;
  title: string;
  description: string;
  completed?: boolean;
  recording?: string;
};

type CreateTaskProps = {
  open: boolean;
  toggleCreatingTask: () => void;
};

function CreateTask({ open, toggleCreatingTask }: CreateTaskProps) {
  const [newTask, setNewTask] = useState<Task>({ title: '', description: '' });
  const [recordingUrl, setRecordingUrl] = useState<string | undefined>();
  const [showAlert, setShowAlert] = useState(false);

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
      setShowAlert(true);
      return;
    }

    try {
      if (recordingUrl) {
        const response = await fetch(recordingUrl);
        const blob = await response.blob();
        const storageRef = ref(storage, `audio/${Date.now()}.mp3`);
        const snapshot = await uploadBytes(storageRef, blob);
        const downloadURL = await getDownloadURL(snapshot.ref);

        await addTaskMutation.mutateAsync({
          ...newTask,
          recording: downloadURL,
        });
      } else {
        await addTaskMutation.mutateAsync(newTask);
      }

      setNewTask({ title: '', description: '' });
      setRecordingUrl(undefined); // Clear recording URL
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
    setRecordingUrl(url);
    updateNewTask({ recording: url });
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
            <Box mt={2}>
              <VoiceRecorder onRecordingComplete={handleRecordingComplete} />
            </Box>
            <Snackbar
              open={showAlert}
              autoHideDuration={6000}
              onClose={() => setShowAlert(false)}
            >
              <Alert
                onClose={() => setShowAlert(false)}
                severity='warning'
                sx={{ width: '100%' }}
              >
                Title and Description are required!
              </Alert>
            </Snackbar>
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
                disabled={addTaskMutation.isLoading}
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
