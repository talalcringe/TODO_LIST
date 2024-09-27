import { useState } from 'react';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Tooltip from '@mui/material/Tooltip';
import TaskCard from './TaskCard';
import UpdateTask from './UpdateTask';
import DeleteDialog from './DeleteDialog';
import Box from '@mui/material/Box';
import { useDeleteTask, useUpdateTask } from '../api/taskQueries';

type Task = {
  _id: number;
  title: string;
  description: string;
  completed: boolean;
};

type TaskViewProps = Task & {
  updateShowAlert: (
    value: [boolean, string, 'success' | 'error' | 'info' | 'warning']
  ) => void;
};

function TaskView({
  _id,
  title,
  description,
  completed,
  updateShowAlert,
}: TaskViewProps) {
  const [checked, setChecked] = useState(completed);
  const [updatingTask, setUpdatingTask] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [backdropOpen, setBackdropOpen] = useState(false);

  const deleteTaskMutation = useDeleteTask();
  const updateTaskMutation = useUpdateTask();

  async function handleDeleteTask() {
    deleteTaskMutation.mutate(_id, {
      onError: (error) => {
        console.error('Error deleting task:', error);
        updateShowAlert([true, 'Error deleting task', 'error']);
      },
      onSuccess: () => {
        updateShowAlert([true, 'Task deleted successfully', 'success']);
        setDialogOpen(false);
      },
    });
  }

  function handleCheckboxChange(val: boolean) {
    setChecked(val);
    updateTaskMutation.mutate({
      _id,
      title,
      description,
      completed: val,
    });
  }

  function toggleUpdatingTask() {
    setUpdatingTask((prev) => !prev);
  }

  function handleCardClick() {
    setBackdropOpen(true);
  }

  function handleClose() {
    setBackdropOpen(false);
  }

  const taskTitle = title;
  return (
    <>
      <Box mt={2}>
        <Tooltip title='Expand'>
          <TaskCard
            title={taskTitle}
            description={description}
            checked={checked}
            expanded={false}
            updateTaskMutationLoading={updateTaskMutation.isLoading}
            toggleUpdatingTask={toggleUpdatingTask}
            handleCheckboxChange={handleCheckboxChange}
            setDialogOpen={setDialogOpen}
            handleCardClick={handleCardClick}
          />
        </Tooltip>
      </Box>
      <DeleteDialog
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        handleDelete={handleDeleteTask}
      />
      <Backdrop
        open={backdropOpen}
        onClick={handleClose}
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Modal
          open={backdropOpen}
          onClose={handleClose}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <TaskCard
            title={title}
            description={description}
            checked={checked}
            expanded={true}
            updateTaskMutationLoading={updateTaskMutation.isLoading}
            toggleUpdatingTask={toggleUpdatingTask}
            handleCheckboxChange={handleCheckboxChange}
            setDialogOpen={setDialogOpen}
            handleCardClick={handleCardClick}
          />
        </Modal>
      </Backdrop>
      <UpdateTask
        open={updatingTask}
        updateShowAlert={updateShowAlert}
        toggleUpdatingTask={toggleUpdatingTask}
        _id={_id}
        title={title}
        description={description}
        completed={completed}
      />
    </>
  );
}

export default TaskView;
