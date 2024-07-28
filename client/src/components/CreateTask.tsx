import { useMutation, useQueryClient } from 'react-query';
import { addTask } from '../api/tasksAPI';

import { storage } from '../api/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import VoiceRecorder from './VoiceRecorder';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

type Task = {
  _id?: number;
  title: string;
  description: string;
  completed?: boolean;
  recording?: string;
};

type CreateTaskProps = {
  toggleCreatingTask: () => void;
};

function CreateTask({ toggleCreatingTask }: CreateTaskProps) {
  const [newTask, setNewTask] = useState<Task>({ title: '', description: '' });
  const [recordingUrl, setRecordingUrl] = useState<string | undefined>();

  const queryClient = useQueryClient();

  const addTaskMutation = useMutation({
    mutationFn: (newTask: Task) => addTask(newTask),
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (recordingUrl) {
      fetch(recordingUrl)
        .then((response) => response.blob())
        .then((blob) => {
          const storageRef = ref(storage, `audio/${Date.now()}.mp3`);
          uploadBytes(storageRef, blob)
            .then((snapshot) => {
              getDownloadURL(snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                addTaskMutation.mutate({
                  ...newTask,
                  recording: downloadURL,
                });
                setNewTask({ title: '', description: '' });
                setRecordingUrl(undefined); // Clear recording URL
                toggleCreatingTask();
              });
            })
            .catch((error) => console.error('Error uploading file:', error));
        })
        .catch((error) => console.error('Error fetching Blob:', error));
    } else {
      addTaskMutation.mutate({ ...newTask });
      setNewTask({ title: '', description: '' });
      toggleCreatingTask();
    }
  }

  function updateNewTask(value: Task) {
    setNewTask(value);
  }

  function handleRecordingComplete(url: string) {
    setRecordingUrl(url);
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
        <Box mt={2}>
          <VoiceRecorder onRecordingComplete={handleRecordingComplete} />
        </Box>
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
    </>
  );
}

export default CreateTask;
