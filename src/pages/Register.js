import { Button, FormControl, Grid, Paper, TextField } from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ErrorToast from '../components/ErrorToast';
import { API_URL, HTTP_ERR, validations } from '../constants';
import UserContext from '../context/user/UserContext';

function Register() {
  const [inputUser, setInputUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [registerEnabled, setRegisterEnabled] = useState(false);
  const [displayError, setDisplayError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { setUser } = useContext(UserContext);

  const history = useHistory();

  useEffect(() => {
    const { name, password, email } = inputUser;
    const { minNameLength, minPasswordLength, regexEmail } = validations;

    const validName = name.length >= minNameLength;
    const validPassword = password.length >= minPasswordLength;
    const validEmail = regexEmail.test(email);

    setRegisterEnabled(validPassword && validEmail && validName);
  }, [inputUser]);

  const handleChange = ({ target: { name, value } }) => {
    setInputUser({ ...inputUser, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let userData;
    try {
      const { data } = await axios.post(
        `${API_URL}/users/create`,
        inputUser,
      );
      userData = data;
    } catch (err) {
      let message = 'Dados inválidos. Tente novamente';

      if (err.response.status === HTTP_ERR) message = 'Erro no servidor :(';

      setErrorMessage(message);
      setDisplayError(true);
      return;
    }

    setUser(userData);
    history.push('/customer/products');
  };

  return (
    <Grid
      container
      spacing={ 0 }
      direction="column"
      justifyContent="center"
      sx={ { minHeight: '100vh' } }
    >
      <Paper elevation={ 2 } sx={ { borderRadius: '8px' } }>
        <form onSubmit={ handleSubmit }>
          <FormControl fullWidth sx={ { padding: '32px', gap: '16px' } }>
            <TextField
              label="Nome"
              type="text"
              name="name"
              inputProps={ { 'data-testid': 'common_register__input-name' } }
              value={ inputUser.name }
              onChange={ handleChange }
            />
            <TextField
              label="E-mail"
              type="email"
              name="email"
              inputProps={ { 'data-testid': 'common_register__input-email' } }
              value={ inputUser.email }
              onChange={ handleChange }
            />
            <TextField
              label="Senha"
              type="password"
              name="password"
              inputProps={ { 'data-testid': 'common_register__input-password' } }
              value={ inputUser.password }
              onChange={ handleChange }
            />
            <Button
              variant="contained"
              type="submit"
              data-testid="common_register__button-register"
              disabled={ !registerEnabled }
              sx={ { height: '3rem' } }
            >
              Cadastrar
            </Button>
          </FormControl>
        </form>

        <ErrorToast
          type="common_register__element-invalid_register"
          open={ displayError }
          setOpen={ setDisplayError }
          message={ errorMessage }
        />
      </Paper>
    </Grid>
  );
}

export default Register;
