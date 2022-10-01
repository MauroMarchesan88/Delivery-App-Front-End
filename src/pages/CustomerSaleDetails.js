import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Toolbar, Typography } from '@mui/material';
import axios from 'axios';
import { API_URL } from '../constants';
import UserContext from '../context/user/UserContext';
import Header from '../components/Header';
import DetailsTable from '../components/DetailsTable';
import CustomerOrderDetails from '../components/CustomerOrderDetails';

function CustomerSaleDetails() {
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const [sale, setSale] = useState('');

  useEffect(() => {
    const fetchSale = async () => {
      const { data } = await axios.get(`${API_URL}/sales/${id}`, {
        headers: { authorization: user.token },
      });
      setSale(data);
    };
    fetchSale();
  }, [user]);

  return (
    <Container>
      <Header />
      <Toolbar />
      {
        sale
        && (
          <Container>
            <CustomerOrderDetails sale={ sale } />
            <DetailsTable roule="customer" sale={ sale } />
            <Typography variant="h6" component="p">
              <span>Total: R$ </span>
              <span
                data-testid="customer_order_details__element-order-total-price"
              >
                {(Number(sale.totalPrice)).toFixed(2).replace('.', ',')}
              </span>
            </Typography>
          </Container>)
      }
    </Container>
  );
}

export default CustomerSaleDetails;
