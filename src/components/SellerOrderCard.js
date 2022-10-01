import { Grid, Paper, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';

export default function SellerOrderCard({ orderData }) {
  const history = useHistory();

  const handleRedirect = () => {
    history.push(`/seller/orders/${orderData.id}`);
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
        <span>Pedido</span>
        <span
          data-testid={ `seller_orders__element-order-id-${orderData.id}` }
        >
          {orderData.id}
        </span>

      </Grid>

      <Grid item>
        <Grid container>
          <Grid
            item
            sx={ { alignSelf: 'center', paddingX: '20px' } }
          >
            <h3
              data-testid={ `seller_orders__element-delivery-status-${orderData.id}` }
            >
              {orderData.status}
            </h3>

          </Grid>
          <Grid item>
            <h3
              data-testid={ `seller_orders__element-order-date-${orderData.id}` }
            >
              {formatDate(orderData.saleDate)}
            </h3>
            <h3
              data-testid={ `seller_orders__element-card-price-${orderData.id}` }
            >
              {`R$ ${(orderData.totalPrice).replace('.', ',')}`}
            </h3>
          </Grid>
        </Grid>

        <Grid item>
          <Typography
            variant="h6"
            component="h3"
            data-testid={ `seller_orders__element-card-address-${orderData.id}` }
          />
          { `${orderData.deliveryAddress}, ${orderData.deliveryNumber}`}
        </Grid>
      </Grid>
    </Grid>
  );
}

SellerOrderCard.propTypes = {
  orderData: PropTypes.shape({
    id: PropTypes.number,
    saleDate: PropTypes.string,
    status: PropTypes.string,
    totalPrice: PropTypes.string,
    deliveryAddress: PropTypes.string,
    deliveryNumber: PropTypes.string,
  }).isRequired,
};
