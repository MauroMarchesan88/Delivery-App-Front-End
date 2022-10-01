import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { API_URL } from '../constants';
import AdminContext from '../context/admin/AdminContext';
import UserContext from '../context/user/UserContext';

function AdminUsersTable() {
  const { user: { token } } = useContext(UserContext);
  const { usersList, setUsersList } = useContext(AdminContext);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get(
        `${API_URL}/users`,
        { headers: { authorization: token } },
      );
      setUsersList(data);
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    await axios.delete(
      `${API_URL}/admin/delete/user/${userId}`,
      { headers: { authorization: token } },
    );
    const updatedUsersList = usersList.filter((user) => user.id !== userId);
    setUsersList(updatedUsersList);
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Item</TableCell>
          <TableCell>Nome</TableCell>
          <TableCell>E-mail</TableCell>
          <TableCell>Tipo</TableCell>
          <TableCell>Excluir</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {usersList.length
          ? usersList.map((item, index) => (
            <TableRow key={ index }>
              <TableCell
                data-testid={
                  `admin_manage__element-user-table-item-number-${index}`
                }
              >
                {index + 1}
              </TableCell>
              <TableCell
                data-testid={
                  `admin_manage__element-user-table-name-${index}`
                }
              >
                {item.name}
              </TableCell>
              <TableCell
                data-testid={
                  `admin_manage__element-user-table-email-${index}`
                }
              >
                {item.email}
              </TableCell>
              <TableCell
                data-testid={
                  `admin_manage__element-user-table-role-${index}`
                }
              >
                {item.role}
              </TableCell>
              <TableCell
                data-testid={
                  `admin_manage__element-user-table-remove-${index}`
                }
              >
                <Button
                  variant="text"
                  onClick={ () => handleDeleteUser(item.id) }
                >
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))
          : null}
      </TableBody>
    </Table>
  );
}

export default AdminUsersTable;
