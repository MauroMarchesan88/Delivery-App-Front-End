import { Box, Grid, Paper } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';

export default function CustomerOrderCard({ orderData }) {
  const history = useHistory();

  const handleRedirect = () => {
    history.push(`/customer/orders/${orderData.id}`);
  };

  function formatDate(dateTime) {
    const date = new Date(dateTime);
    return date.toLocaleDateString('pt-BR');
  }

  return (
    <Grid
      container
      component={ Paper }
      sx={ { cursor: 'pointer' } }
      onClick={ handleRedirect }
    >
      <Grid
        item
        sx={ {
          padding: '10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          alignSelf: 'center',
        } }
      >
        <Box>
          <span>Pedido</span>
        </Box>
        <Box>
          <span
            data-testid={ `customer_orders__element-order-id-${orderData.id}` }
          >
            {orderData.id}
          </span>
        </Box>
      </Grid>
      <Grid item>
        <Grid container>
          <Grid
            item
            sx={ { alignSelf: 'center', paddingX: '20px' } }
          >
            <h3
              data-testid={ `customer_orders__element-delivery-status--${orderData.id}` }
            >
              {orderData.status}
            </h3>
          </Grid>

          <Grid item>
            <h3
              data-testid={ `customer_orders__element-order-date-${orderData.id}` }
            >
              {formatDate(orderData.saleDate)}
            </h3>
            <h3
              data-testid={ `customer_orders__element-card-price-${orderData.id}` }
            >
              {`R$ ${(orderData.totalPrice).replace('.', ',')}`}
            </h3>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

CustomerOrderCard.propTypes = {
  orderData: PropTypes.shape({
    id: PropTypes.number,
    saleDate: PropTypes.string,
    status: PropTypes.string,
    totalPrice: PropTypes.string,
  }).isRequired,
};
