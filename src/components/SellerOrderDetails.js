import { Box, Button, Container, Toolbar } from '@mui/material';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { API_URL } from '../constants';
import UserContext from '../context/user/UserContext';

const testIds = {
  orderId: 'seller_order_details__element-order-details-label-order-id',
  orderDate: 'seller_order_details__element-order-details-label-order-date',
  deliveryStatus: 'seller_order_details__element-order-details-label-delivery-status',
  preparingBtn: 'seller_order_details__button-preparing-check',
  dispatchBtn: 'seller_order_details__button-dispatch-check',
};

const deliveryStatus = ['Pendente', 'Preparando', 'Em Trânsito'];
export default function SellerOrderDetails({ sale }) {
  const { user } = useContext(UserContext);
  const [preprareBtnDisabled, setPrepareBtnDisabled] = useState(false);
  const [dispatchBtnDisabled, setDispatchBtnDisabled] = useState(false);
  const [status, setStatus] = useState(sale.status);

  const enableButton1 = (saleStatus) => {
    if (saleStatus !== 'Pendente') setPrepareBtnDisabled(true);
  };

  const enableButton2 = (saleStatus) => {
    if (saleStatus === 'Preparando') {
      setDispatchBtnDisabled(false);
      return;
    }
    setDispatchBtnDisabled(true);
  };

  function formatDate(dateTime) {
    const date = new Date(dateTime);
    return date.toLocaleDateString('pt-BR');
  }

  const handleClick = async () => {
    await axios.patch(`${API_URL}/sales/update/${sale.id}`, {}, {
      headers: { authorization: user.token },
    });

    const index = deliveryStatus.indexOf(status);
    setStatus(deliveryStatus[index + 1]);
  };

  useEffect(() => {
    enableButton1(status);
    enableButton2(status);
  }, [status]);

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
          <span data-testid={ testIds.orderDate }>
            {formatDate(sale.saleDate)}
          </span>
          <span data-testid={ testIds.deliveryStatus }>
            {status}
          </span>
          <Button
            color="success"
            disabled={ preprareBtnDisabled }
            variant="contained"
            onClick={ handleClick }
            data-testid={ testIds.preparingBtn }
          >
            PREPARAR PEDIDO
          </Button>
          <Button
            color="success"
            disabled={ dispatchBtnDisabled }
            variant="contained"
            onClick={ handleClick }
            data-testid={ testIds.dispatchBtn }
          >
            SAIU PARA ENTREGA
          </Button>
        </Box>
      </Toolbar>
    </Container>
  );
}

SellerOrderDetails.propTypes = {
  sale: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    saleDate: PropTypes.string,
    sellerId: PropTypes.number,
  }).isRequired,
};
