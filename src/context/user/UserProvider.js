import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import UserContext from './UserContext';

function UserProvider({ children }) {
  const history = useHistory();
  const { pathname } = useLocation();
  // const [cart, setCart] = useState(
  //   JSON.parse(localStorage.getItem('cart')) || [],
  // );

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || {},
  );

  // useEffect(() => {
  //   if (cart.length) localStorage.setItem('cart', JSON.stringify(cart));
  // }, [cart]);

  useEffect(() => {
    if (pathname !== '/register' && !user.token) {
      localStorage.clear();
      history.push('/login');
      return;
    }
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const contextValue = useMemo(() => ({
    user,
    setUser,
  }), [
    user,
    setUser]);

  return (
    <UserContext.Provider value={ contextValue }>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;
