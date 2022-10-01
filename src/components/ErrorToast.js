import { Alert, Snackbar } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

function ErrorToast(props) {
  const { type, open, setOpen, message } = props;

  return (
    <Snackbar
      open={ open }
      autoHideDuration={ 3000 }
      onClose={ () => setOpen(false) }
    >
      <Alert severity="error" data-testid={ type }>{message}</Alert>
    </Snackbar>
  );
}

ErrorToast.propTypes = {
  type: PropTypes.string,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  message: PropTypes.string,
}.isRequired;

export default ErrorToast;
