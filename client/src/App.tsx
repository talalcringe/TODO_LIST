import Tasks from './components/Tasks';

import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import Box from '@mui/material/Box';

function App() {
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
        <Tasks />
      </Box>
    </>
  );
}

export default App;
