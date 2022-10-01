import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import AdminContext from './AdminContext';

function AdminProvider({ children }) {
  const [usersList, setUsersList] = useState([]);

  const contextValue = useMemo(() => ({
    usersList,
    setUsersList,
  }), [usersList, setUsersList]);

  return (
    <AdminContext.Provider value={ contextValue }>
      {children}
    </AdminContext.Provider>
  );
}

AdminProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminProvider;
