import { Container, Grid, Toolbar } from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import CustomerOrderCard from '../components/CustomerOrderCard';
import Header from '../components/Header';
import { API_URL } from '../constants';
import UserContext from '../context/user/UserContext';

export default function CustomerOrdersList() {
  const { user } = useContext(UserContext);
  const [ordersList, setOrdersList] = useState('');

  useEffect(() => {
    const fetchOrdersList = async () => {
      const { data } = await axios.get(`${API_URL}/sales/user`, {
        headers: { authorization: user.token },
      });
      setOrdersList(data);
    };
    fetchOrdersList();
  }, []);

  return (
    <Container>
      <Header />
      <Toolbar />
      {ordersList && (
        <Grid container spacing={ 2 }>
          {ordersList.map((order, index) => (
            <Grid item xs={ 12 } md={ 4 } key={ index }>
              <CustomerOrderCard orderData={ order } />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
