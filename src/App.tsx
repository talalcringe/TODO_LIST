import Tasks from './components/Tasks';
import CreateTask from './components/CreateTask';

import { useState } from 'react';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { blue } from '@mui/material/colors';
import Divider from '@mui/material/Divider';

function App() {
  const [creatingTask, setCreatingTask] = useState(false);

  function toggleCreatingTask() {
    setCreatingTask((prevState) => !prevState);
  }

  return (
    <>
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
      >
        <Typography variant='h3' align='center'>
          TODOList
        </Typography>

        <Box mt={2}>
          <TextField size='small' label='Filter' />
        </Box>

        <Box
          mt={2}
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
