import { useQuery } from 'react-query';
import { getTasks } from '../api/tasksAPI';

import { useState } from 'react';

import TaskView from './TaskView';
import CreateTask from './CreateTask';

import Fab from '@mui/material/Fab';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

import Box from '@mui/material/Box';

type Task = {
  _id: number;
  title: string;
  description: string;
  completed: boolean;
  recording?: string;
};

function Tasks() {
  const [filter, setFilter] = useState<string>('');
  const [creatingTask, setCreatingTask] = useState(false);

  const tasksQuery = useQuery<Task[], Error>({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });

  function toggleCreatingTask() {
    setCreatingTask((prevState) => !prevState);
  }

  function updateFilter(e: React.ChangeEvent<HTMLInputElement>) {
    setFilter(e.target.value);
  }

  const filteredTasks = tasksQuery.data?.filter((task) =>
    task.title.toLowerCase().includes(filter.toLowerCase())
  );

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

      {tasksQuery.isLoading ? (
        <CircularProgress variant='indeterminate' />
      ) : tasksQuery.isError ? (
        <div>Error - {tasksQuery.error.message}</div>
      ) : filteredTasks ? (
        filteredTasks.map((data: Task) => {
          return <TaskView key={data._id} {...data} />;
        })
      ) : null}
    </>
  );
}

export default Tasks;
