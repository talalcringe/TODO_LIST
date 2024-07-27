import Tasks from './components/Tasks';
import CreateTask from './components/CreateTask';

import { useState } from 'react';

import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import { blue } from '@mui/material/colors';

function App() {
  const [creatingTask, setCreatingTask] = useState(false);

  function toggleCreatingTask() {
    setCreatingTask((prevState) => !prevState);
  }

  return (
    <>
      <Box
        display='flex'
        height={'100vh'}
        gap={2}
        flexDirection='column'
        justifyContent='start'
        alignItems='center'
        position='relative'
      >
        <Box
          position='fixed'
          width={'100%'}
          height={'56px'}
          zIndex={10}
          top={'0px'}
          bgcolor={'white'}
        >
          <Typography variant='h3' align='center'>
            TODOList
          </Typography>
          <Box width='100%'>
            <Divider />
          </Box>
        </Box>

        <Box mt={'72px'}>
          <TextField size='small' label='Filter' />
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
                bgcolor: blue[500],
                position: 'fixed',
                bottom: 16,
                right: 16,
              }}
            >
              Create New Task
            </Fab>
          )}

          <Tasks />
        </Box>
      </Box>
    </>
  );
}

export default App;
