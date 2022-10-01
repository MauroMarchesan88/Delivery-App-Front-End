import { Container, Paper, Toolbar, Typography } from '@mui/material';
import React, { useContext } from 'react';
import CheckoutForm from '../components/CheckoutForm';
import CheckoutTable from '../components/CheckoutTable';
import Header from '../components/Header';
import CartContext from '../context/cart/CartContext';

function CustomerCheckout() {
  const { cart } = useContext(CartContext);

  const calculateTotal = () => {
    const total = cart.reduce((accumulator, item) => (accumulator + item.subTotal), 0);
    return total;
  };

  return (
    <Container>
      <Header />
      <Toolbar />
      <Typography variant="h5" component="h2">
        Finalizar Pedido
      </Typography>

      <CheckoutTable />

      <Typography variant="h6" component="p">
        <span>Total: R$ </span>
        <span
          data-testid="customer_checkout__element-order-total-price"
        >
          {calculateTotal().toFixed(2).replace('.', ',')}
        </span>
      </Typography>

      <Paper
        sx={ {
          padding: '16px 16px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px' } }
      >
        <Typography variant="h5" component="h2" sx={ { marginBottom: '0' } }>
          Detalhes e Endereço para Entrega
        </Typography>

        <CheckoutForm calculateTotal={ calculateTotal } />

      </Paper>

    </Container>
  );
}

export default CustomerCheckout;
