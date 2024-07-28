import Fab from '@mui/material/Fab';
import Card from '@mui/material/Card';
import Tooltip from '@mui/material/Tooltip';
import Checkbox from '@mui/material/Checkbox';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

import Box from '@mui/material/Box';

type TaskCardProps = {
  title: string;
  description: string;
  audioUrl: string | null;
  checked: boolean;
  expanded: boolean;
  updateTaskMutationLoading: boolean;
  toggleUpdatingTask: () => void;
  handleCheckboxChange: (val: boolean) => void;
  setDialogOpen: (open: boolean) => void;
  handleCardClick: () => void;
};

function TaskCard({
  title,
  description,
  audioUrl,
  checked,
  expanded,
  updateTaskMutationLoading,
  toggleUpdatingTask,
  handleCheckboxChange,
  setDialogOpen,
  handleCardClick,
}: TaskCardProps) {
  return (
    <Card elevation={2} onClick={handleCardClick}>
      <CardContent sx={{ width: '300px' }}>
        <Typography variant='h5'>{title}</Typography>

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
          {audioUrl && (
            <Box mb={2}>
              <CardMedia component='audio' src={audioUrl} controls />
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
                  sx={{ mr: 1, zIndex: 1 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setDialogOpen(true);
                  }}
                >
                  <DeleteRoundedIcon />
                </Fab>
              </Tooltip>
              <Tooltip title='Edit'>
                <Fab
                  size='small'
                  color='success'
                  sx={{ zIndex: 1 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleUpdatingTask();
                  }}
                >
                  <EditRoundedIcon />
                </Fab>
              </Tooltip>
            </Box>
            <Box display={'flex'} alignItems={'center'}>
              <Typography variant='body2'>
                {checked ? 'Completed' : 'In Progress'}
                <Tooltip
                  title={checked ? 'Mark as Incomplete' : 'Mark as Complete'}
                >
                  <Checkbox
                    onClick={(e) => e.stopPropagation()} // Prevent event propagation
                    onChange={(e) => handleCheckboxChange(e.target.checked)}
                    checked={checked}
                    disabled={updateTaskMutationLoading}
                    sx={{ zIndex: 2 }}
                  />
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
