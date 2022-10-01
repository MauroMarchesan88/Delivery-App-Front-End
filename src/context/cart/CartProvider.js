import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import CartContext from './CartContext';

function CartProvider({ children }) {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem('cart')) || [],
  );

  useEffect(() => {
    if (cart.length) {
      localStorage.setItem('cart', JSON.stringify(cart));
      return;
    }
    localStorage.removeItem('cart');
  }, [cart]);

  const contextValue = useMemo(() => ({
    cart,
    setCart,
  }), [cart, setCart]);

  return (
    <CartContext.Provider value={ contextValue }>
      {children}
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CartProvider;
