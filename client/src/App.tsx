import { useState } from 'react';

import Tasks from './components/Tasks';

import Typography from '@mui/material/Typography';

import Box from '@mui/material/Box';
import AlertMessage from './components/AlertMessage';

function App() {
  const [showAlert, setShowAlert] = useState<
    [boolean, string, 'success' | 'error' | 'info' | 'warning']
  >([false, '', 'success']);

  function updateShowAlert(
    value: [boolean, string, 'success' | 'error' | 'info' | 'warning']
  ) {
    setShowAlert(value);
  }

  return (
    <>
      <Box
        position={'fixed'}
        height={'100vh'}
        width={'100vw'}
        display='flex'
        flexDirection='column'
        justifyContent='start'
        alignItems='center'
        bgcolor={'#fffdd0'}
        overflow={'auto'}
      >
        <Box
          position='fixed'
          width={'100%'}
          height={'10vh'}
          zIndex={10}
          top={'0px'}
          bgcolor={'white'}
          display='flex'
          alignItems='center'
          justifyContent='space-between'
          padding='0 16px'
          borderBottom={'1px solid lightgrey'}
        >
          <Box display='flex' alignItems='center' flex='1'>
            <img src='./logo.png' alt='Logo' width='50px' />
          </Box>
          <Typography
            variant='h4'
            align='center'
            color={'#007bff'}
            flex='2'
            sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            Todo List
          </Typography>
          <Box flex={1} />
        </Box>
        <Tasks updateShowAlert={updateShowAlert} />
        <AlertMessage showAlert={showAlert} updateShowAlert={updateShowAlert} />
      </Box>
    </>
  );
}

export default App;
