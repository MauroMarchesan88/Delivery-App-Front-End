import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import axios from 'axios';
import App from '../../App';
import renderWithRouter from '../helpers/renderWithRouter';
import { cardTestIds, headerTestIds, fetchDataMock } from '../mocks/sellerOrdersListMocks';

jest.mock("axios");

describe(
  'Tests for SellerOrdersList page',
  () => {
    const routeToOrdersList = '/seller/orders';

    const user = { name: 'carlos', role: 'seller', id: 2, token: 'Valid token' };

    localStorage.setItem('user', JSON.stringify(user));

    it('should have all the data-testid from the header component', async () => {
      axios.get.mockResolvedValueOnce({ data: fetchDataMock });
      renderWithRouter(<App />, routeToOrdersList);

      const ordersListBtn = await screen.findByTestId(headerTestIds.ordersListBtn);
      const userName = await screen.findByTestId(headerTestIds.userName);
      const logOutBtn = await screen.findByTestId(headerTestIds.logOutBtn);

      expect(ordersListBtn).toBeInTheDocument();
      expect(ordersListBtn).toHaveTextContent('Pedidos');
      expect(userName).toBeInTheDocument();
      expect(logOutBtn).toBeInTheDocument();
    });

    it('should have all the data-testid from the orderCards', async () => {
        axios.get.mockResolvedValueOnce({ data: fetchDataMock });
        renderWithRouter(<App />, routeToOrdersList);
  
        const orderNumber1 = await screen.findByTestId(`${cardTestIds.orderId}${fetchDataMock[0].id}`);
        const orderStatus1 = await screen.findByTestId(`${cardTestIds.orderStatus}${fetchDataMock[0].id}`);
        const orderDate1 = await screen.findByTestId(`${cardTestIds.orderDate}${fetchDataMock[0].id}`);
        const orderTotalValue1 = await screen.findByTestId(`${cardTestIds.totalPrice}${fetchDataMock[0].id}`);
        const orderAddress1 = await screen.findByTestId(`${cardTestIds.orderAddress}${fetchDataMock[0].id}`);
        const orderNumber2 = await screen.findByTestId(`${cardTestIds.orderId}${fetchDataMock[1].id}`);
        const orderStatus2 = await screen.findByTestId(`${cardTestIds.orderStatus}${fetchDataMock[1].id}`);
        const orderDate2 = await screen.findByTestId(`${cardTestIds.orderDate}${fetchDataMock[1].id}`);
        const orderTotalValue2 = await screen.findByTestId(`${cardTestIds.totalPrice}${fetchDataMock[1].id}`);
        const orderAddress2 = await screen.findByTestId(`${cardTestIds.orderAddress}${fetchDataMock[1].id}`);
  
        expect(axios.get)
        .toHaveBeenCalledWith('http://localhost:3001/sales/seller',
        { "headers": {"authorization": "Valid token"} })
        
        expect(orderNumber1).toBeInTheDocument();
        expect(orderStatus1).toBeInTheDocument();
        expect(orderDate1).toBeInTheDocument();
        expect(orderAddress1).toBeInTheDocument();
        expect(orderTotalValue1).toBeInTheDocument();
        expect(orderNumber2).toBeInTheDocument();
        expect(orderStatus2).toBeInTheDocument();
        expect(orderDate2).toBeInTheDocument();
        expect(orderTotalValue2).toBeInTheDocument();
        expect(orderAddress2).toBeInTheDocument();
      });

      it('should have two order cards with the right delivery status text', async () => {
        axios.get.mockResolvedValueOnce({ data: fetchDataMock });
        renderWithRouter(<App />, routeToOrdersList);
  
        const orderStatus1 = await screen.findByTestId(`${cardTestIds.orderStatus}${fetchDataMock[0].id}`);
        const orderStatus2 = await screen.findByTestId(`${cardTestIds.orderStatus}${fetchDataMock[1].id}`);
  
        expect(orderStatus1).toHaveTextContent(fetchDataMock[0].status);
        expect(orderStatus2).toHaveTextContent(fetchDataMock[1].status);
      });
      

      it('should redirect the user to the seller order details page when the card is clicked', async () => {
        axios.get.mockResolvedValueOnce({ data: fetchDataMock })
          .mockResolvedValueOnce({ data: ''});

        const { history } = renderWithRouter(<App />, routeToOrdersList);
        console.log(history.location.pathname);
  
        const card = await screen.findByTestId(`${cardTestIds.orderId}${fetchDataMock[0].id}`);

        userEvent.click(card);
        expect(history.location.pathname).toBe(`/seller/orders/${fetchDataMock[0].id}`);
      });
  },
);
