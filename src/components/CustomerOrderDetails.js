import { Box, Button, Container, Toolbar } from '@mui/material';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { API_URL } from '../constants';
import UserContext from '../context/user/UserContext';

const testIds = {
  orderId: 'customer_order_details__element-order-details-label-order-id',
  orderDate: 'customer_order_details__element-order-details-label-order-date',
  sellerName: 'customer_order_details__element-order-details-label-seller-name',
  deliveryStatus: 'customer_order_details__element-order-details-label-delivery-status',
  deliveryBtn: 'customer_order_details__button-delivery-check',
};

function CustomerOrderDetails({ sale }) {
  const { user } = useContext(UserContext);
  const [sellerName, setSellerName] = useState('');
  const [buttonEnabled, setButtonEnabled] = useState(true);
  const [status, setStatus] = useState(sale.status);

  const enableButton = (saleStatus) => {
    if (saleStatus === 'Em Trânsito') setButtonEnabled(false);
  };

  function formatDate(dateTime) {
    const date = new Date(dateTime);
    return date.toLocaleDateString('pt-BR');
  }

  const handleClick = async () => {
    await axios.patch(`${API_URL}/sales/update/${sale.id}`, {}, {
      headers: { authorization: user.token },
    });
    setStatus('Entregue');
    setButtonEnabled(true);
  };

  useEffect(() => {
    const fetchSale = async () => {
      const { data } = await axios.get(`${API_URL}/users/${sale.sellerId}`, {
        headers: { authorization: user.token },
      });
      setSellerName(data);
      enableButton(sale.status);
    };
    fetchSale();
  }, []);

  return (
    <Container>
      <Toolbar>
        <Box
          sx={ {
            display: 'flex',
            gap: '32px',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '100%' } }
        >
          <span data-testid={ testIds.orderId }>
            {sale.id}
          </span>
          <span data-testid={ testIds.sellerName }>
            {sellerName.name}
          </span>
          <span data-testid={ testIds.orderDate }>
            {formatDate(sale.saleDate)}
          </span>
          <span data-testid={ testIds.deliveryStatus }>
            {status}
          </span>
          <Button
            color="success"
            disabled={ buttonEnabled }
            variant="contained"
            onClick={ handleClick }
            data-testid={ testIds.deliveryBtn }
          >
            MARCAR COMO ENTREGUE
          </Button>
        </Box>
      </Toolbar>
    </Container>
  );
}

CustomerOrderDetails.propTypes = {
  sale: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    saleDate: PropTypes.string,
    sellerId: PropTypes.number,
  }).isRequired,
};

export default CustomerOrderDetails;
