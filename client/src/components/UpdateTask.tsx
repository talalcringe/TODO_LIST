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
  recording,
}: UpdateTaskProps & Task) {
  const [newTask, setNewTask] = useState<Task>({
    _id: _id,
    title: title,
    description: description,
    completed: completed,
    recording: recording || '',
  });

  const [recordingUrl, setRecordingUrl] = useState<string | undefined>(
    recording
  );
  const [recordingStatus, setRecordingStatus] = useState(false);
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

    if (recordingStatus) {
      updateShowAlert([true, 'Please stop recording', 'error']);
      return;
    }

    try {
      if (recordingUrl) {
        setUploading(true);
        const response = await fetch(recordingUrl);
        const blob = await response.blob();
        const storageRef = ref(storage, `audio/${Date.now()}.mp3`);
        const snapshot = await uploadBytes(storageRef, blob);
        const downloadURL = await getDownloadURL(snapshot.ref);
        setUploading(false);
        await updateTaskMutation.mutateAsync({
          ...newTask,
          recording: downloadURL,
        });
      } else {
        await updateTaskMutation.mutateAsync({
          ...newTask,
          recording: recording,
        });
      }

      setRecordingUrl(undefined);
      setRecordingStatus(false);
      updateShowAlert([true, 'Task updated successfully', 'success']);
    } catch (error) {
      setUploading(false);
      console.error('Error uploading file:', error);
      setRecordingStatus(false);
      updateShowAlert([true, 'Error uploading task', 'error']);
    }
  }

  function updateNewTask(value: Partial<Task>) {
    setNewTask((prev) => ({
      ...prev,
      ...value,
    }));
  }

  function updateRecordingStatus(status: boolean) {
    setRecordingStatus(status);
  }

  function handleRecordingComplete(url: string) {
    setRecordingUrl(url);
    updateNewTask({ recording: url });
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
            <Box mt={2}>
              <VoiceRecorder
                prevUrl={recording}
                onRecordingComplete={handleRecordingComplete}
                updateRecordingStatus={updateRecordingStatus}
              />
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
