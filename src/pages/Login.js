import { Button, FormControl, Grid, Paper, TextField } from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ErrorToast from '../components/ErrorToast';
import { API_URL, HTTP_ERR, validations } from '../constants';
import UserContext from '../context/user/UserContext';

const roleURL = {
  administrator: '/admin/manage',
  seller: '/seller/orders',
  customer: '/customer/products',
};

function Login() {
  const [loginUser, setLoginUser] = useState({
    email: '',
    password: '',
  });
  const [loginEnabled, setLoginEnabled] = useState(false);
  const [displayError, setDisplayError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { user, setUser } = useContext(UserContext);

  const history = useHistory();

  const redirectUser = () => {
    history.push(roleURL[user.role]);
  };

  useEffect(() => {
    if (user) redirectUser();
    const { email, password } = loginUser;
    const { minPasswordLength, regexEmail } = validations;

    const validPassword = password.length >= minPasswordLength;
    const validEmail = regexEmail.test(email);

    setLoginEnabled(validPassword && validEmail);
  }, [loginUser]);

  const handleChange = ({ target: { name, value } }) => {
    setLoginUser({ ...loginUser, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = loginUser;
    let userData;
    let url;

    try {
      const { data } = await axios.post(
        `${API_URL}/users/login`,
        { email, password },
      );
      userData = data;
      url = roleURL[data.role];
    } catch (err) {
      let message = 'Dados inválidos. Verifique email e senha.';

      if (err.response.status === HTTP_ERR) message = 'Erro no servidor :(';

      setErrorMessage(message);
      setDisplayError(true);
      return;
    }

    setUser(userData);
    history.push(url);
  };

  const handleSignUpClick = () => history.push('/register');

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
              label="Login"
              type="email"
              name="email"
              inputProps={ { 'data-testid': 'common_login__input-email' } }
              value={ loginUser.email }
              onChange={ handleChange }
            />
            <TextField
              label="Senha"
              type="password"
              name="password"
              inputProps={ { 'data-testid': 'common_login__input-password' } }
              value={ loginUser.password }
              onChange={ handleChange }
            />
            <Button
              variant="contained"
              type="submit"
              data-testid="common_login__button-login"
              disabled={ !loginEnabled }
              sx={ { height: '3rem' } }
            >
              Login
            </Button>
            <Button
              variant="outlined"
              data-testid="common_login__button-register"
              sx={ { height: '3rem' } }
              onClick={ handleSignUpClick }
            >
              Ainda não tenho conta
            </Button>
          </FormControl>
        </form>

        <ErrorToast
          type="common_login__element-invalid-email"
          open={ displayError }
          setOpen={ setDisplayError }
          message={ errorMessage }
        />
      </Paper>
    </Grid>
  );
}

export default Login;
