import { useMutation, useQueryClient } from 'react-query';
import { updateTask } from '../api/tasksAPI';
import VoiceRecorder from './VoiceRecorder';

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
  recording?: string;
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
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    console.log('recordingUrl', recordingUrl);
    updateTaskMutation.mutate({
      ...newTask,
      recording: recordingUrl, // Include the recording URL in the update
    });
    toggleUpdatingTask();
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
    <>
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
    </>
  );
}

export default UpdateTask;
