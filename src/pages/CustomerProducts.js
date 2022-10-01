// import { Container, Toolbar, Unstable_Grid2 as Grid } from '@mui/material';
import { Masonry } from '@mui/lab';
import { Container, Toolbar } from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import { API_URL } from '../constants';
import UserContext from '../context/user/UserContext';

function CustomerProducts() {
  const { user } = useContext(UserContext);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(`${API_URL}/products`, {
        headers: { authorization: user.token },
      });
      setProducts(data);
    };
    fetchProducts();
  }, [user]);

  return (
    <Container>
      <Header showCart />
      <Toolbar />
      {/* <Grid container spacing={ 2 } sx={ { marginTop: '16px' } }>
        {products.length && products.map((product, index) => (
          <Grid key={ index } xs={ 6 } md={ 2 }>
            <ProductCard product={ product } />
          </Grid>
        ))}
      </Grid> */}
      {products.length
        ? (
          <Masonry
            spacing={ 2 }
            columns={ { xs: 2, md: 6 } }
            sx={ { marginTop: '16px' } }
          >
            {products.map((product, index) => (
              <ProductCard key={ index } product={ product } />
            ))}
          </Masonry>
        )
        : null}
    </Container>
  );
}

export default CustomerProducts;
