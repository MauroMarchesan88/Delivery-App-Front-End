import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import axios from 'axios';
import App from '../../App';
import renderWithRouter from '../helpers/renderWithRouter';
import {saleDataMock,saleInTransitMock} from '../mocks/mocks';

jest.mock("axios");

describe(
  'Teste a pagina <CustomerSaleDetails.js>',
  () => {
    const routeToSaleDetails = '/customer/orders/1';
    const testIds = {
      orderId: 'customer_order_details__element-order-details-label-order-id',
      orderDate: 'customer_order_details__element-order-details-label-order-date',
      sellerName: 'customer_order_details__element-order-details-label-seller-name',
      deliveryStatus: 'customer_order_details__element-order-details-label-delivery-status',
      deliveryBtn: 'customer_order_details__button-delivery-check',
      totalPrice: 'customer_order_details__element-order-total-price',
      deliveryCheck: 'customer_order_details__button-delivery-check'
    };

    const user = { name: 'roberto', role: 'customer', id: 1, token: 'Valid token' };

    localStorage.setItem('user', JSON.stringify(user));

    it('A tela tem os data-testids', async () => {
      axios.get.mockResolvedValue({ data: saleDataMock });
      renderWithRouter(<App />, routeToSaleDetails );

      const orderId = await screen.findByTestId(testIds.orderId);
      const orderDate = screen.queryByTestId(testIds.orderDate);
      const sellerName = screen.queryByTestId(testIds.sellerName);
      const deliveryStatus = screen.queryByTestId(testIds.deliveryStatus);
      const deliveryBtn = screen.queryByTestId(testIds.deliveryBtn);
      const totalPrice = screen.queryByTestId(testIds.totalPrice);

      const headerId = 'customer_products__element-navbar-user-full-name';
      const header = screen.queryByTestId(headerId);
      expect(axios.get).toHaveBeenCalledWith('http://localhost:3001/sales/1',{ "headers": {"authorization": "Valid token"} })
      
      expect(header).toBeInTheDocument();
      expect(orderId).toBeInTheDocument();
      expect(orderDate).toBeInTheDocument();
      expect(sellerName).toBeInTheDocument();
      expect(deliveryStatus).toBeInTheDocument();
      expect(deliveryBtn).toBeInTheDocument();
      expect(totalPrice).toBeInTheDocument();
    });

    it('A tela tem NAO tem data-testids caso o fetch falhar', async () => {
      axios.get.mockResolvedValue({data:''});
      renderWithRouter(<App />, routeToSaleDetails );

      const orderId = screen.queryByTestId(testIds.orderId);
      const orderDate = screen.queryByTestId(testIds.orderDate);
      const sellerName = screen.queryByTestId(testIds.sellerName);
      const deliveryStatus = screen.queryByTestId(testIds.deliveryStatus);
      const deliveryBtn = screen.queryByTestId(testIds.deliveryBtn);
      const totalPrice = screen.queryByTestId(testIds.totalPrice);

      const headerId = "customer_products__element-navbar-user-full-name";
      const header = screen.queryByTestId(headerId);

      expect(header).toBeInTheDocument();
      expect(orderId).not.toBeInTheDocument();
      expect(orderDate).not.toBeInTheDocument();
      expect(sellerName).not.toBeInTheDocument();
      expect(deliveryStatus).not.toBeInTheDocument();
      expect(deliveryBtn).not.toBeInTheDocument();
      expect(totalPrice).not.toBeInTheDocument();
    });
    
    it('O botao de "Entregue" muda o status para "Entregue"', async () => {
      axios.get.mockResolvedValue({ data: saleInTransitMock });
      renderWithRouter(<App />, routeToSaleDetails);

      const deliveryStatus = await screen.findByTestId(testIds.deliveryStatus);
      const deliveryCheck = await screen.findByTestId(testIds.deliveryCheck);

      expect(deliveryStatus).toBeInTheDocument();
      expect(deliveryCheck).toBeInTheDocument();

      expect(deliveryStatus).toContainHTML('Em Trânsito');

      userEvent.click(deliveryCheck);

      const newStatus = await screen.findByTestId(testIds.deliveryStatus);

      expect(newStatus).toContainHTML('Entregue');
    });
  });

