import '@testing-library/jest-dom';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import React from 'react';
import App from '../../App';
import renderWithRouter from '../helpers/renderWithRouter';
import { adminDataMock, customerDataMock, sellerDataMock, testIds } from '../mocks/Login';

jest.mock("axios");

describe('pages/Login', () => {
  beforeEach(() => localStorage.removeItem('user'));

  it('should have the corresponding inputs and buttons', async () => {
    renderWithRouter(<App />);

    const loginInput = await screen.findByTestId(testIds.loginInput);
    const passwordInput = await screen.findByTestId(testIds.passwordInput);
    const loginBtn = await screen.findByTestId(testIds.loginBtn);
    const registerBtn = await screen.findByTestId(testIds.registerBtn);

    expect(loginInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();
    expect(registerBtn).toBeInTheDocument();
  });

  it('should begin with the login button disabled', async () => {
    renderWithRouter(<App />);
    const loginBtn = await screen.findByTestId(testIds.loginBtn);
    expect(loginBtn).toBeDisabled();
  });

  it('should redirect user if it\'s already logged in', async () => {
    axios.get.mockResolvedValueOnce({ data: [] });
    const user = customerDataMock;
    localStorage.setItem('user', JSON.stringify(user));

    const { history } = renderWithRouter(<App />);

    expect(history.location.pathname).toBe('/customer/products');
  });
  
  it('should redirect user to /register when the sign up button is clicked', async () => {
    const { history } = renderWithRouter(<App />);
    const registerBtn = await screen.findByTestId(testIds.registerBtn);
    
    userEvent.click(registerBtn);

    expect(history.location.pathname).toBe('/register');
  });

  it('should not allow login with an invalid email', async () => {
    renderWithRouter(<App />);
    const loginInput = await screen.findByTestId(testIds.loginInput);
    const passwordInput = await screen.findByTestId(testIds.passwordInput);
    const loginBtn = await screen.findByTestId(testIds.loginBtn);

    userEvent.type(loginInput, 'invalid email');
    userEvent.type(passwordInput, '123456');
    expect(loginBtn).toBeDisabled();
  });

  it('should not allow login with password length smaller than 6', async () => {
    renderWithRouter(<App />);
    const loginInput = await screen.findByTestId(testIds.loginInput);
    const passwordInput = await screen.findByTestId(testIds.passwordInput);
    const loginBtn = await screen.findByTestId(testIds.loginBtn);

    userEvent.type(loginInput, 'vasco@dagama.com');
    userEvent.type(passwordInput, '12345');
    expect(loginBtn).toBeDisabled();
  });

  it('should display an error "Dados inválidos" when API returns 401', async () => {
    axios.post.mockRejectedValueOnce({ response: { status: 401 }});
    renderWithRouter(<App />);
    const loginInput = await screen.findByTestId(testIds.loginInput);
    const passwordInput = await screen.findByTestId(testIds.passwordInput);
    const loginBtn = await screen.findByTestId(testIds.loginBtn);

    userEvent.type(loginInput, 'vasco@dagama.com');
    userEvent.type(passwordInput, '123456');
    expect(loginBtn).toBeEnabled();

    await act(async () => userEvent.click(loginBtn));

    const errorToast = await screen.findByTestId(testIds.errorToast);
    expect(errorToast).toBeInTheDocument();
    expect(errorToast).toBeVisible();
    expect(errorToast).toHaveTextContent(/dados inválidos/i);
  });

  it('should display an error "Erro no servidor" when API returns 500', async () => {
    axios.post.mockRejectedValueOnce({ response: { status: 500 }});
    renderWithRouter(<App />);
    const loginInput = await screen.findByTestId(testIds.loginInput);
    const passwordInput = await screen.findByTestId(testIds.passwordInput);
    const loginBtn = await screen.findByTestId(testIds.loginBtn);

    userEvent.type(loginInput, 'vasco@dagama.com');
    userEvent.type(passwordInput, '123456');
    expect(loginBtn).toBeEnabled();

    await act(async () => userEvent.click(loginBtn));

    const errorToast = await screen.findByTestId(testIds.errorToast);
    expect(errorToast).toBeInTheDocument();
    expect(errorToast).toBeVisible();
    expect(errorToast).toHaveTextContent(/erro no servidor/i);
  });

  it('should allow customer to login with valid credentials', async () => {
    axios.post.mockResolvedValueOnce({ data: customerDataMock });
    axios.get.mockResolvedValueOnce({ data: [] });
    const { history } = renderWithRouter(<App />);
    const loginInput = await screen.findByTestId(testIds.loginInput);
    const passwordInput = await screen.findByTestId(testIds.passwordInput);
    const loginBtn = await screen.findByTestId(testIds.loginBtn);

    userEvent.type(loginInput, 'vasco@dagama.com');
    userEvent.type(passwordInput, '123456');
    expect(loginBtn).toBeEnabled();

    await act(async () => userEvent.click(loginBtn));
    
    expect(history.location.pathname).toBe('/customer/products');
  });

  it('should allow seller to login with valid credentials', async () => {
    axios.post.mockResolvedValueOnce({ data: sellerDataMock });
    axios.get.mockResolvedValueOnce({ data: [] });
    const { history } = renderWithRouter(<App />);
    const loginInput = await screen.findByTestId(testIds.loginInput);
    const passwordInput = await screen.findByTestId(testIds.passwordInput);
    const loginBtn = await screen.findByTestId(testIds.loginBtn);

    userEvent.type(loginInput, 'vasco@dagama.com');
    userEvent.type(passwordInput, '123456');
    expect(loginBtn).toBeEnabled();

    await act(async () => userEvent.click(loginBtn));
    
    expect(history.location.pathname).toBe('/seller/orders');
  });

  it('should allow administrator to login with valid credentials', async () => {
    axios.post.mockResolvedValueOnce({ data: adminDataMock });
    axios.get.mockResolvedValueOnce({ data: [] });
    const { history } = renderWithRouter(<App />);
    const loginInput = await screen.findByTestId(testIds.loginInput);
    const passwordInput = await screen.findByTestId(testIds.passwordInput);
    const loginBtn = await screen.findByTestId(testIds.loginBtn);

    userEvent.type(loginInput, 'vasco@dagama.com');
    userEvent.type(passwordInput, '123456');
    expect(loginBtn).toBeEnabled();

    await act(async () => userEvent.click(loginBtn));
    
    expect(history.location.pathname).toBe('/admin/manage');
  });
});
