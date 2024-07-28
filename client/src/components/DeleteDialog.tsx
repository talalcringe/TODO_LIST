import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

type DeleteDialogProps = {
  open: boolean;
  handleClose: () => void;
  handleDelete: () => void;
};

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  open,
  handleClose,
  handleDelete,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{'Delete Task'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this task?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Cancel
        </Button>
        <Button
          variant='contained'
          onClick={handleDelete}
          color='error'
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
