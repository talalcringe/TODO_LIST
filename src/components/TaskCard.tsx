import { useState } from 'react';

import UpdateTask from './UpdateTask';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import { blue } from '@mui/material/colors';
import Divider from '@mui/material/Divider';
import Fab from '@mui/material/Fab';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

type Task = {
  _id: number;
  title: string;
  description: string;
  completed: boolean;
};

function TaskCard({ _id, title, description, completed }: Task) {
  const [updatingTask, setUpdatingTask] = useState(false);

  function toggleUpdatingTask() {
    setUpdatingTask((prev) => !prev);
  }

  return (
    <>
      {updatingTask ? (
        <UpdateTask
          toggleUpdatingTask={toggleUpdatingTask}
          _id={_id}
          title={title}
          description={description}
          completed={completed}
        />
      ) : (
        <Box mt={2}>
          <Card onClick={toggleUpdatingTask} elevation={2}>
            <CardContent sx={{ width: '330px' }}>
              <Typography variant='h5'>{title}</Typography>
              <Typography variant='body2' color='text.secondary' gutterBottom>
                {description}
              </Typography>
            </CardContent>
            <CardActions>
              <Box
                width={'100%'}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}
              >
                <Fab size='small' color='error'>
                  <DeleteRoundedIcon />
                </Fab>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant='body2'>
                    Completed
                    <Checkbox checked={completed} />
                  </Typography>
                </Box>
              </Box>
            </CardActions>
          </Card>
        </Box>
      )}
    </>
  );
}

export default TaskCard;
