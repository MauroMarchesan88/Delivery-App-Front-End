import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { jest } from "@jest/globals";
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../../App';
import renderWithRouter from '../helpers/renderWithRouter';
import * as axios from "axios";
import {saleDataMock} from '../mocks/mocks';

jest.mock('axios');

describe('Teste a pagina <SellerSaleDetails.js>',
  () => {
    const routeToSaleDetails = '/seller/orders/1'
    const testIds = {
      orderId: 'seller_order_details__element-order-details-label-order-id',
      orderDate: 'seller_order_details__element-order-details-label-order-date',
      deliveryStatus: 'seller_order_details__element-order-details-label-delivery-status',
      totalPrice: 'seller_order_details__element-order-total-price',
      preparingBtn: 'seller_order_details__button-preparing-check',
      dispatchBtn: 'seller_order_details__button-dispatch-check',
    };

    const user = { name: "roberto", role: 'seller', id: 2, token: 'Valid token' }

    localStorage.setItem('user', JSON.stringify(user));

    it('A tela tem os data-testids', async () => {
      axios.get.mockResolvedValue({ data: saleDataMock });
      renderWithRouter(<App />, routeToSaleDetails );

      const orderId = await screen.findByTestId(testIds.orderId);
      const orderDate = screen.queryByTestId(testIds.orderDate);
      const deliveryStatus = screen.queryByTestId(testIds.deliveryStatus);
      const preparingBtn = screen.queryByTestId(testIds.preparingBtn);
      const dispatchBtn = screen.queryByTestId(testIds.dispatchBtn);
      const totalPrice = screen.queryByTestId(testIds.totalPrice);

      const headerId = "customer_products__element-navbar-user-full-name";
      const header = await screen.findByTestId(headerId);

      expect(header).toBeInTheDocument();
      expect(orderId).toBeInTheDocument();
      expect(orderDate).toBeInTheDocument();
      expect(deliveryStatus).toBeInTheDocument();
      expect(preparingBtn).toBeInTheDocument();
      expect(dispatchBtn).toBeInTheDocument();
      expect(totalPrice).toBeInTheDocument();
    });

    it('A tela tem NAO tem data-testids caso o fetch falhar', async () => {
      axios.get.mockResolvedValue({data:''});
      renderWithRouter(<App />, routeToSaleDetails );

      const orderId = screen.queryByTestId(testIds.orderId);
      const orderDate = screen.queryByTestId(testIds.orderDate);
      const deliveryStatus = screen.queryByTestId(testIds.deliveryStatus);
      const preparingBtn = screen.queryByTestId(testIds.preparingBtn);
      const dispatchBtn = screen.queryByTestId(testIds.dispatchBtn);
      const totalPrice = screen.queryByTestId(testIds.totalPrice);

      const headerId = "customer_products__element-navbar-user-full-name";
      const header = screen.queryByTestId(headerId);

      expect(header).toBeInTheDocument();
      expect(orderId).not.toBeInTheDocument();
      expect(orderDate).not.toBeInTheDocument();
      expect(deliveryStatus).not.toBeInTheDocument();
      expect(preparingBtn).not.toBeInTheDocument();
      expect(dispatchBtn).not.toBeInTheDocument();
      expect(totalPrice).not.toBeInTheDocument();
    });

    it('O botao de "Preparar Pedido" muda o status para "Preparando"', async () => {
      axios.get.mockResolvedValue({ data: saleDataMock });
      renderWithRouter(<App />, routeToSaleDetails);

      const deliveryStatus = await screen.findByTestId(testIds.deliveryStatus);
      const preparingBtn = screen.queryByTestId(testIds.preparingBtn);

      expect(deliveryStatus).toBeInTheDocument();
      expect(preparingBtn).toBeInTheDocument();

      expect(deliveryStatus).toContainHTML('Pendente');

      userEvent.click(preparingBtn);

      const newStatus = await screen.findByTestId(testIds.deliveryStatus);

      expect(newStatus).toContainHTML('Preparando');
    });
    
    it('O botao de "Saiu para entrega" muda o status para "Em Trânsito"', async () => {
      axios.get.mockResolvedValue({ data: saleDataMock });
      renderWithRouter(<App />, routeToSaleDetails);

      const deliveryStatus = await screen.findByTestId(testIds.deliveryStatus);
      const preparingBtn = screen.queryByTestId(testIds.preparingBtn);
      const dispatchBtn = screen.queryByTestId(testIds.dispatchBtn);

      expect(deliveryStatus).toBeInTheDocument();
      expect(preparingBtn).toBeInTheDocument();
      expect(dispatchBtn).toBeInTheDocument();

      expect(deliveryStatus).toContainHTML('Pendente');
      userEvent.click(preparingBtn);

      const newStatus = await screen.findByTestId(testIds.deliveryStatus);

      expect(newStatus).toContainHTML('Preparando');

      userEvent.click(dispatchBtn);

      const finalStatus = await screen.findByTestId(testIds.deliveryStatus);

      expect(finalStatus).toContainHTML('Em Trânsito');
    });
  });