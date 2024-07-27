import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { deleteTask, updateTask } from '../api/tasksAPI';
import UpdateTask from './UpdateTask';
import DeleteDialog from './DeleteDialog';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import CardMedia from '@mui/material/CardMedia';
import Tooltip from '@mui/material/Tooltip';

type Task = {
  _id: number;
  title: string;
  description: string;
  completed: boolean;
  recording?: string;
};

function TaskCard({ _id, title, description, completed, recording }: Task) {
  const [updatingTask, setUpdatingTask] = useState(false);
  const [checked, setChecked] = useState(completed);
  const [dialogOpen, setDialogOpen] = useState(false);

  const queryClient = useQueryClient();

  const deleteTaskMutation = useMutation({
    mutationFn: (_id: number) => deleteTask(_id),
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: (newTask: Task) => updateTask(newTask),
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
    },
  });

  function handleCheckboxChange(val: boolean) {
    setChecked(val);
    updateTaskMutation.mutate({
      _id,
      title,
      description,
      completed: val,
      recording, // Ensure recording URL is included
    });
  }

  function handleDeleteTask() {
    deleteTaskMutation.mutate(_id);
    setDialogOpen(false);
  }

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
          <Card elevation={2}>
            <CardContent sx={{ width: '330px' }}>
              <Typography variant='h5'>{title}</Typography>
              <Typography variant='body2' color='text.secondary' gutterBottom>
                {description}
              </Typography>
            </CardContent>
            <CardActions>
              
              <Box display={'flex'} flexDirection={'column'} width={'100%'}>
                {recording && (
                  <Box mb={2}>
                    <CardMedia component='audio' src={recording} controls />
                  </Box>
                )}

              <Box
                width={'100%'}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}
              >
                <Box>
                  <Tooltip title='Delete'>
                    <Fab
                      size='small'
                      color='error'
                      sx={{ mr: 1 }}
                      onClick={() => setDialogOpen(true)}
                    >
                      <DeleteRoundedIcon />
                    </Fab>
                  </Tooltip>
                  <Tooltip title='Edit'>
                    <Fab
                      size='small'
                      color='success'
                      onClick={toggleUpdatingTask}
                    >
                      <EditRoundedIcon />
                    </Fab>
                  </Tooltip>
                </Box>
                <Box display={'flex'} alignItems={'center'}>
                  <Typography variant='body2'>
                    {checked ? 'Completed' : 'In Progress'}
                    <Tooltip
                      title={
                        checked ? 'Mark as Incomplete' : 'Mark as Complete'
                      }
                    >
                      <Checkbox
                        onChange={(e) => {
                          handleCheckboxChange(e.target.checked);
                        }}

                        checked={cchecked}
                        disabled={updateTaskMutation.isLoading}
                      />
                    </Tooltip>
                  </Typography>
                </Box>
              </Box>
            </CardActions>
          </Card>
        </Box>
      )}
      <DeleteDialog
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        handleDelete={handleDeleteTask}
      />
    </>
  );
}

export default TaskCard;
