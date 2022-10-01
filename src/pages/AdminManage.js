import { Container, Toolbar } from '@mui/material';
import React from 'react';
import AdminForm from '../components/AdminForm';
import AdminUsersTable from '../components/AdminUsersTable';
import Header from '../components/Header';

// const dataTestId74 = 'admin_manage__element-invalid-register';

function AdminManage() {
  // const [hasError, setHasError] = useState(false);

  return (
    <Container>
      <Header />
      <Toolbar />
      <h2>Cadastrar novo usuário</h2>
      {/* {hasError && <span data-testid={ dataTestId74 }>Usuário já cadastrado!</span>} */}
      {/* <span data-testid={ dataTestId74 } /> */}
      <AdminForm />
      <h2>Lista de usuários</h2>
      <AdminUsersTable />
    </Container>
  );
}

export default AdminManage;
