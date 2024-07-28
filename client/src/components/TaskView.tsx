import Box from '@mui/material/Box';
import { useMutation, useQueryClient } from 'react-query';
import { deleteTask, updateTask } from '../api/tasksAPI';
import UpdateTask from './UpdateTask';
import DeleteDialog from './DeleteDialog';
import { storage } from '../api/firebase';
import { ref, getDownloadURL, deleteObject } from 'firebase/storage';
import { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import TaskCard from './TaskCard';

type Task = {
  _id: number;
  title: string;
  description: string;
  completed: boolean;
  recording?: string;
};

function TaskView({ _id, title, description, completed, recording }: Task) {
  const [checked, setChecked] = useState(completed);
  const [updatingTask, setUpdatingTask] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [backdropOpen, setBackdropOpen] = useState(false);

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

  async function handleDeleteTask() {
    if (recording) {
      try {
        const audioRef = ref(storage, recording);
        await deleteObject(audioRef);
      } catch (error) {
        console.error('Error deleting audio file:', error);
      }
    }
    deleteTaskMutation.mutate(_id);
    setDialogOpen(false);
  }

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

  // Fetch the audio URL from Firebase Storage
  useEffect(() => {
    if (recording) {
      const fetchAudioUrl = async () => {
        try {
          const audioRef = ref(storage, recording);
          const url = await getDownloadURL(audioRef);
          setAudioUrl(url);
        } catch (error) {
          console.error('Error fetching audio URL:', error);
        }
      };
      fetchAudioUrl();
    }
  }, [recording]);

  function toggleUpdatingTask() {
    setUpdatingTask((prev) => !prev);
  }

  function handleCardClick() {
    setBackdropOpen(true);
  }

  function handleClose() {
    setBackdropOpen(false);
  }

  return (
    <>
      <Box mt={2}>
        <TaskCard
          title={title}
          description={description}
          audioUrl={audioUrl}
          checked={checked}
          expanded={false}
          updateTaskMutationLoading={updateTaskMutation.isLoading}
          toggleUpdatingTask={toggleUpdatingTask}
          handleCheckboxChange={handleCheckboxChange}
          setDialogOpen={setDialogOpen}
          handleCardClick={handleCardClick}
        />
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
          onClick={(e) => e.stopPropagation()} // Prevent event propagation to the backdrop
        >
          <TaskCard
            title={title}
            description={description}
            audioUrl={audioUrl}
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
        toggleUpdatingTask={toggleUpdatingTask}
        _id={_id}
        title={title}
        description={description}
        completed={completed}
        recording={recording}
      />
    </>
  );
}

export default TaskView;
