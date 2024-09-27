import Fab from '@mui/material/Fab';
import Card from '@mui/material/Card';
import Tooltip from '@mui/material/Tooltip';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Box from '@mui/material/Box';

type TaskCardProps = {
  taskTitle: string;
  description: string;
  checked: boolean;
  duedate?: string;
  expanded: boolean;
  updateTaskMutationLoading: boolean;
  toggleUpdatingTask: () => void;
  handleCheckboxChange: (val: boolean) => void;
  setDialogOpen: (open: boolean) => void;
  handleCardClick: () => void;
};

function TaskCard({
  taskTitle,
  description,
  checked,
  duedate,
  expanded,
  updateTaskMutationLoading,
  toggleUpdatingTask,
  handleCheckboxChange,
  setDialogOpen,
  handleCardClick,
}: TaskCardProps) {
  const overdue = duedate && new Date(duedate) > new Date();

  return (
    <Card elevation={2} onClick={handleCardClick}>
      <CardContent sx={{ width: '300px' }}>
        <Typography variant='h5'>{taskTitle}</Typography>
        {duedate &&
          (overdue ? (
            <Typography
              variant='subtitle2'
              textAlign='center'
              width={'max-content'}
              margin={'0 2%'}
              borderRadius={1.5}
              padding={'1px 5px'}
              color={'#fff'}
              bgcolor={'#007bff'}
            >
              Due by: {duedate.split('T')[0]}
            </Typography>
          ) : (
            <Typography
              variant='subtitle2'
              textAlign='center'
              width={'max-content'}
              margin={'0 2%'}
              borderRadius={1.5}
              padding={'1px 5px'}
              color={'#fff'}
              bgcolor='error.main'
            >
              Was due on: {duedate.split('T')[0]}
            </Typography>
          ))}

        {expanded ? (
          <Typography
            variant='body2'
            color='text.secondary'
            gutterBottom
            sx={{
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
              maxHeight: '300px',
              overflowY: 'auto',
            }}
          >
            {description}
          </Typography>
        ) : (
          <Typography variant='body2' color='text.secondary' gutterBottom>
            {description}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Box display={'flex'} flexDirection={'column'} width={'100%'}>
          <Box
            width={'100%'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Box>
              <Tooltip title='Delete'>
                <span>
                  <Fab
                    size='small'
                    color='error'
                    sx={{ mr: 1, zIndex: 1 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setDialogOpen(true);
                    }}
                  >
                    <DeleteRoundedIcon />
                  </Fab>
                </span>
              </Tooltip>
              <Tooltip title='Edit'>
                <span>
                  <Fab
                    size='small'
                    color='primary'
                    sx={{ zIndex: 1 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleUpdatingTask();
                    }}
                  >
                    <EditRoundedIcon />
                  </Fab>
                </span>
              </Tooltip>
            </Box>
            <Box display={'flex'} alignItems={'center'}>
              <Typography variant='body2' color={checked ? 'green' : 'primary'}>
                {checked ? 'Completed' : 'In Progress'}
                <Tooltip
                  title={checked ? 'Mark as Incomplete' : 'Mark as Complete'}
                >
                  <span>
                    <Checkbox
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => handleCheckboxChange(e.target.checked)}
                      checked={checked}
                      disabled={updateTaskMutationLoading}
                      sx={{ zIndex: 2 }}
                    />
                  </span>
                </Tooltip>
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardActions>
    </Card>
  );
}

export default TaskCard;
