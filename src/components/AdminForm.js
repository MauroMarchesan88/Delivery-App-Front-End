import { Button, FormControl, InputLabel, Select, TextField } from '@mui/material';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { API_URL, validations } from '../constants';
import AdminContext from '../context/admin/AdminContext';
import UserContext from '../context/user/UserContext';
import ErrorToast from './ErrorToast';

function AdminForm() {
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
  });
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [displayError, setDisplayError] = useState(false);
  const { user } = useContext(UserContext);
  const { usersList, setUsersList } = useContext(AdminContext);

  const validateUser = (userInfo) => {
    const { email, password, name } = userInfo;
    const { minNameLength, minPasswordLength, regexEmail } = validations;

    return (password.length >= minPasswordLength
      && email.match(regexEmail)
      && name.length >= minNameLength
    );
  };

  const handleChangeUser = ({ target: { name, value } }) => {
    const updatedUser = { ...newUser, [name]: value };
    setNewUser(updatedUser);
    setIsValid(validateUser(updatedUser));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, password, role } = newUser;

    try {
      const { data } = await axios.post(
        `${API_URL}/admin/create/user`,
        { name, email, password, role },
        { headers: { authorization: user.token } },
      );
      setUsersList([...usersList, data]);
    } catch (err) {
      setErrorMessage('Dados inválidos. Tente novamente');
      setDisplayError(true);
    }
  };

  return (
    <form onSubmit={ handleSubmit }>
      <ErrorToast
        type="admin_manage__element-invalid-register"
        open={ displayError }
        setOpen={ setDisplayError }
        message={ errorMessage }
      />
      <TextField
        label="Nome e sobrenome"
        name="name"
        type="text"
        inputProps={ { 'data-testid': 'admin_manage__input-name' } }
        value={ newUser.name }
        onChange={ handleChangeUser }
      />
      <TextField
        label="E-mail"
        name="email"
        type="email"
        inputProps={ { 'data-testid': 'admin_manage__input-email' } }
        value={ newUser.email }
        onChange={ handleChangeUser }
      />
      <TextField
        label="Senha"
        name="password"
        type="password"
        inputProps={ { 'data-testid': 'admin_manage__input-password' } }
        value={ newUser.password }
        onChange={ handleChangeUser }
      />
      <FormControl>
        <InputLabel shrink htmlFor="select-seller">Tipo</InputLabel>
        <Select
          label="Tipo"
          name="role"
          value={ newUser.role }
          displayEmpty
          onChange={ handleChangeUser }
          native
          inputProps={ { id: 'select-seller',
            'data-testid': 'admin_manage__select-role' } }
        >
          <option value="" disabled>Escolha um tipo</option>
          <option value="customer">Cliente</option>
          <option value="seller">Vendedor</option>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        type="submit"
        data-testid="admin_manage__button-register"
        disabled={ !isValid }
        sx={ { height: '3rem' } }
      >
        Cadastrar
      </Button>
    </form>
  );
}

export default AdminForm;
