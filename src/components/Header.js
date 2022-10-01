import { ShoppingCart } from '@mui/icons-material';
import { AppBar, Box, Button, Toolbar } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import CartContext from '../context/cart/CartContext';
import UserContext from '../context/user/UserContext';

const navLinkText = {
  customer: 'Meus Pedidos',
  seller: 'Pedidos',
  administrator: 'Gerenciar usuários',
};

const navLinkPath = {
  customer: '/customer/orders',
  seller: '/seller/orders',
  administrator: '/admin/manage',
};

const defaultCart = {
  cart: [],
  setCart: () => {},
};

function Header({ showCart }) {
  const { user, setUser } = useContext(UserContext);
  const { cart, setCart } = useContext(CartContext) || defaultCart;
  const [totalValue, setTotalValue] = useState('0.00');
  const [cartDisabled, setCartDisabled] = useState(true);
  const { role } = user;

  const history = useHistory();

  useEffect(() => {
    setCartDisabled(!Number(totalValue));
  }, [totalValue]);

  useEffect(() => {
    const updatedCart = cart.reduce(
      (accumulator, item) => (accumulator + item.subTotal),
      0,
    );
    setTotalValue(updatedCart.toFixed(2));
  }, [cart]);

  const handleLogout = () => {
    setCart([]);
    setUser({});
  };

  return (
    <AppBar>
      <Toolbar>
        <Box
          sx={ {
            display: 'flex',
            gap: '32px',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '100%' } }
        >
          { role === 'customer' && (
            <Button
              color="white"
              variant="text"
              component={ Link }
              to="/customer/products"
              data-testid="customer_products__element-navbar-link-products"
            >
              Produtos
            </Button>
          )}
          <Button
            color="white"
            variant="text"
            component={ Link }
            to={ navLinkPath[role] || '/' }
            data-testid="customer_products__element-navbar-link-orders"
          >
            { navLinkText[role] }
          </Button>
          { showCart && (
            <Button
              color="white"
              variant="text"
              disabled={ cartDisabled }
              onClick={ () => history.push('/customer/checkout') }
              startIcon={ <ShoppingCart /> }
              data-testid="customer_products__button-cart"
            >
              <span>R$ </span>
              <span data-testid="customer_products__checkout-bottom-value">
                {totalValue.replace('.', ',')}
              </span>
            </Button>
          )}
          <Button
            color="white"
            variant="text"
            // href="/customer/products"
            data-testid="customer_products__element-navbar-user-full-name"
            sx={ { textTransform: 'none' } }
          >
            { user.name }
          </Button>
          <Button
            color="white"
            variant="text"
            data-testid="customer_products__element-navbar-link-logout"
            onClick={ handleLogout }
          >
            Sair
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

Header.defaultProps = {
  showCart: false,
};

Header.propTypes = {
  showCart: PropTypes.bool,
};

export default Header;
