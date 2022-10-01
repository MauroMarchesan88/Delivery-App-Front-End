import { Container } from '@mui/material';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import AdminProvider from './context/admin/AdminProvider';
import CartProvider from './context/cart/CartProvider';
import UserProvider from './context/user/UserProvider';
import AdminManage from './pages/AdminManage';
import CustomerCheckout from './pages/CustomerCheckout';
import CustomerOrdersList from './pages/CustomerOrdersList';
import CustomerProducts from './pages/CustomerProducts';
import CustomerSaleDetails from './pages/CustomerSaleDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import SellerOrdersList from './pages/SellerOrdersList';
import SellerSaleDetails from './pages/SellerSaleDetails';

function App() {
  return (
    <Switch>
      <UserProvider>
        <Route path="/register" exact>
          <Container maxWidth="sm">
            <Register />
          </Container>
        </Route>
        <Route path="/login" exact>
          <Container maxWidth="sm">
            <Login />
          </Container>
        </Route>
        <CartProvider>
          <Route path="/customer/products" exact>
            <CustomerProducts />
          </Route>
          <Route path="/customer/checkout" exact>
            <CustomerCheckout />
          </Route>
        </CartProvider>
        <Route path="/customer/orders" exact>
          <CustomerOrdersList />
        </Route>
        <Route path="/seller/orders" exact>
          <SellerOrdersList />
        </Route>
        <Route path="/customer/orders/:id" exact>
          <CustomerSaleDetails />
        </Route>
        <Route path="/seller/orders/:id" exact>
          <SellerSaleDetails />
        </Route>
        <Route path="/" exact>
          <Redirect to="/login" />
        </Route>
        <AdminProvider>
          <Route path="/admin/manage" exact>
            <AdminManage />
          </Route>
        </AdminProvider>
      </UserProvider>
    </Switch>
  );
}

export default App;
