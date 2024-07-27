import { useQuery } from 'react-query';
import { getTasks } from '../api/tasksAPI';

import { useState } from 'react';

import CreateTask from './CreateTask';
import TaskCard from './TaskCard';

import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

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
          label='filter'
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
          <CreateTask toggleCreatingTask={toggleCreatingTask} />
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
          return <TaskCard key={data._id} {...data} />;
        })
      ) : null}
    </>
  );
}

export default Tasks;
