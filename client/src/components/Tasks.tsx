import { useState } from 'react';
import { useGetTasks } from '../api/taskQueries'; // Import the useGetTasks hook

import TaskView from './TaskView';
import CreateTask from './CreateTask';

import Fab from '@mui/material/Fab';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

type Task = {
  _id: number;
  title: string;
  description: string;
  completed: boolean;
  recording?: string;
};

function Tasks({
  updateShowAlert,
}: {
  updateShowAlert: (
    value: [boolean, string, 'success' | 'error' | 'info' | 'warning']
  ) => void;
}) {
  const [filter, setFilter] = useState<string>('');
  const [creatingTask, setCreatingTask] = useState(false);

  const { data: tasks, isLoading, isError } = useGetTasks();

  function toggleCreatingTask() {
    setCreatingTask((prevState) => !prevState);
  }

  function updateFilter(e: React.ChangeEvent<HTMLInputElement>) {
    setFilter(e.target.value);
  }

  const filteredTasks = tasks?.filter((task: Task) =>
    task.title.toLowerCase().includes(filter.toLowerCase())
  );

  if (isError) {
    updateShowAlert([true, 'Error fetching tasks', 'error']);
    return <Typography variant='h5'>Network Error - probably</Typography>;
  }
  return (
    <>
      <Box mt={'72px'}>
        <TextField
          size='small'
          label='Search'
          value={filter}
          onChange={updateFilter}
        />
      </Box>

      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
      >
        {creatingTask ? (
          <CreateTask
            open={creatingTask}
            updateShowAlert={updateShowAlert}
            toggleCreatingTask={toggleCreatingTask}
          />
        ) : (
          <Fab
            variant='extended'
            color='primary'
            aria-label='add'
            onClick={toggleCreatingTask}
            sx={{
              bgcolor: 'info',
              position: 'fixed',
              bottom: 16,
              right: 16,
            }}
          >
            Create New Task
          </Fab>
        )}
      </Box>

      {isLoading ? (
        <CircularProgress variant='indeterminate' />
      ) : filteredTasks ? (
        filteredTasks.map((data: Task) => {
          return (
            <TaskView
              key={data._id}
              {...data}
              updateShowAlert={updateShowAlert}
            />
          );
        })
      ) : null}
    </>
  );
}

export default Tasks;
