import { useState } from 'react';

import Tasks from './components/Tasks';

import Divider from '@mui/material/Divider';
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
        display='flex'
        gap={2}
        flexDirection='column'
        justifyContent='start'
        alignItems='center'
        position='relative'
        top={'0px'}
        bgcolor={'#fffdd0'}
      >
        <Box
          position='fixed'
          width={'100%'}
          height={'56px'}
          zIndex={10}
          top={'0px'}
          bgcolor={'white'}
        >
          <Typography variant='h3' align='center' color={'#007bff'}>
            TODOList
          </Typography>
          <Box width='100%'>
            <Divider />
          </Box>
        </Box>
        <Tasks updateShowAlert={updateShowAlert} />
        <AlertMessage showAlert={showAlert} updateShowAlert={updateShowAlert} />
      </Box>
    </>
  );
}

export default App;
