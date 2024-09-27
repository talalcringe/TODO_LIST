import { useState } from 'react';
import { useGetTasks } from '../api/taskQueries';

import TaskView from './TaskView';
import CreateTask from './CreateTask';

import Fab from '@mui/material/Fab';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

type Task = {
  _id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  duedate?: string;
};

function Tasks({
  updateShowAlert,
}: {
  updateShowAlert: (
    value: [boolean, string, 'success' | 'error' | 'info' | 'warning']
  ) => void;
}) {
  const [search, setSearch] = useState<string>('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [sort, setSort] = useState<'updated' | 'created' | 'duedate'>(
    'updated'
  );
  const [creatingTask, setCreatingTask] = useState(false);

  const { data: tasks, isLoading, isError } = useGetTasks();

  function toggleCreatingTask() {
    setCreatingTask((prevState) => !prevState);
  }

  function updateSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  function updateFilter(value: 'all' | 'active' | 'completed') {
    setFilter(value);
  }

  function updateSort(value: 'updated' | 'created' | 'duedate') {
    setSort(value);
  }

  const filteredTasks = tasks?.filter((task: Task) => {
    if (task.title.toLowerCase().includes(search.toLowerCase())) {
      if (filter === 'active') {
        return !task.completed;
      } else if (filter === 'completed') {
        return task.completed;
      }
      return true;
    }
    return false;
  });

  const sortedTasks =
    filteredTasks?.sort((a: Task, b: Task) => {
      if (sort === 'updated') {
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      } else if (sort === 'created') {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else if (sort === 'duedate') {
        if (!a.duedate && !b.duedate) {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        } else if (!a.duedate) {
          return 1;
        } else if (!b.duedate) {
          return -1;
        } else {
          return new Date(b.duedate).getTime() - new Date(a.duedate).getTime();
        }
      }
    }) || [];

  if (isError) {
    updateShowAlert([true, 'Error fetching tasks', 'error']);
    return <Typography variant='h5'>Network Error - probably</Typography>;
  }

  return (
    <>
      <Box
        mt={'72px'}
        width={'70%'}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'space-between'}
        gap={2}
        padding={'8px 16px'}
      >
        <TextField
          size='small'
          label='Search'
          value={search}
          sx={{ bgcolor: 'white' }}
          onChange={updateSearch}
        />
        <Box
          display={'flex'}
          gap={1}
          alignItems={'center'}
          flexWrap={'wrap'}
          bgcolor={'#fff'}
          borderRadius={2}
          p={1}
        >
          <Box display={'flex'} gap={1}>
            <Typography
              sx={{ m: 1 }}
              variant='subtitle1'
              color={'#007bff'}
              fontWeight={'bold'}
              mr={1}
            >
              FILTER:
            </Typography>
            <ToggleButtonGroup
              color='primary'
              value={filter}
              exclusive
              onChange={(_e, value) => {
                updateFilter(value);
              }}
            >
              <ToggleButton value='all' size='small'>
                All
              </ToggleButton>
              <ToggleButton value='active' size='small'>
                Active
              </ToggleButton>
              <ToggleButton value='completed' size='small'>
                Completed
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Box display={'flex'} gap={1}>
            <Typography
              sx={{ m: 1 }}
              variant='subtitle1'
              color={'#007bff'}
              fontWeight={'bold'}
              mr={1}
            >
              SORT BY:
            </Typography>
            <ToggleButtonGroup
              color='primary'
              value={sort}
              exclusive
              onChange={(_e, value) => {
                updateSort(value);
              }}
            >
              <ToggleButton value='updated' size='small'>
                Updated At
              </ToggleButton>
              <ToggleButton value='created' size='small'>
                Created At
              </ToggleButton>
              <ToggleButton value='duedate' size='small'>
                Due On
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>
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
            color='warning'
            aria-label='add'
            onClick={toggleCreatingTask}
            sx={{
              bgcolor: 'success',
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
      ) : filteredTasks && filteredTasks.length === 0 ? (
        <Typography variant='h5'>No tasks yet {`:)`}</Typography>
      ) : filteredTasks ? (
        <Box
          display={'flex'}
          gap={2}
          flexWrap={'wrap'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          {sortedTasks.map((data: Task) => (
            <TaskView
              key={data._id}
              {...data}
              updateShowAlert={updateShowAlert}
            />
          ))}
        </Box>
      ) : null}
    </>
  );
}

export default Tasks;
