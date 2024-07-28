import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

type AlertMessageProps = {
  showAlert: [boolean, string, 'success' | 'error' | 'info' | 'warning'];
  updateShowAlert: (
    value: [boolean, string, 'success' | 'error' | 'info' | 'warning']
  ) => void;
};

function AlertMessage({ showAlert, updateShowAlert }: AlertMessageProps) {
  return (
    <Snackbar
      open={showAlert[0]}
      autoHideDuration={4000}
      onClose={() => updateShowAlert([false, '', 'success'])}
    >
      <Alert
        onClose={() => updateShowAlert([false, '', 'success'])}
        severity={showAlert[2]}
        sx={{ width: '100%' }}
      >
        {showAlert[1]}
      </Alert>
    </Snackbar>
  );
}

export default AlertMessage;
