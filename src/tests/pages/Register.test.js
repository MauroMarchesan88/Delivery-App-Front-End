import '@testing-library/jest-dom';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import React from 'react';
import App from '../../App';
import renderWithRouter from '../helpers/renderWithRouter';
import { registerDataMock, testIds } from '../mocks/Register';

jest.mock("axios");

describe.only('pages/Register', () => {
  const registerRoute = '/register';
  beforeEach(() => localStorage.removeItem('user'));

  it('should have the corresponding inputs and buttons', async () => {
    renderWithRouter(<App />, registerRoute);

    const nameInput = await screen.findByTestId(testIds.nameInput);
    const emailInput = await screen.findByTestId(testIds.emailInput);
    const passwordInput = await screen.findByTestId(testIds.passwordInput);
    const registerBtn = await screen.findByTestId(testIds.registerBtn);

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(registerBtn).toBeInTheDocument();
  });

  it('should begin with the sign up button disabled', async () => {
    renderWithRouter(<App />, registerRoute);
    const registerBtn = await screen.findByTestId(testIds.registerBtn);
    expect(registerBtn).toBeDisabled();
  });

  it('should not allow registering with name length smaller than 12', async () => {
    renderWithRouter(<App />, registerRoute);
    
    const nameInput = await screen.findByTestId(testIds.nameInput);
    const emailInput = await screen.findByTestId(testIds.emailInput);
    const passwordInput = await screen.findByTestId(testIds.passwordInput);
    const registerBtn = await screen.findByTestId(testIds.registerBtn);

    userEvent.type(nameInput, 'name');
    userEvent.type(emailInput, 'vasco@dagama.com');
    userEvent.type(passwordInput, '123456');
    expect(registerBtn).toBeDisabled();
  });

  it('should not allow registering with an invalid email', async () => {
    renderWithRouter(<App />, registerRoute);
    
    const nameInput = await screen.findByTestId(testIds.nameInput);
    const emailInput = await screen.findByTestId(testIds.emailInput);
    const passwordInput = await screen.findByTestId(testIds.passwordInput);
    const registerBtn = await screen.findByTestId(testIds.registerBtn);

    userEvent.type(nameInput, 'This is a Longer Name');
    userEvent.type(emailInput, 'vascodagama');
    userEvent.type(passwordInput, '123456');
    expect(registerBtn).toBeDisabled();
  });

  it('should not allow registering with password length smaller than 6', async () => {
    renderWithRouter(<App />, registerRoute);
    
    const nameInput = await screen.findByTestId(testIds.nameInput);
    const emailInput = await screen.findByTestId(testIds.emailInput);
    const passwordInput = await screen.findByTestId(testIds.passwordInput);
    const registerBtn = await screen.findByTestId(testIds.registerBtn);

    userEvent.type(nameInput, 'This is a Longer Name');
    userEvent.type(emailInput, 'vasco@dagama.com');
    userEvent.type(passwordInput, '12345');
    expect(registerBtn).toBeDisabled();
  });

  it('should display an error "Dados inválidos" when API returns 401', async () => {
    axios.post.mockRejectedValueOnce({ response: { status: 401 }});
    renderWithRouter(<App />, registerRoute);

    const nameInput = await screen.findByTestId(testIds.nameInput);
    const emailInput = await screen.findByTestId(testIds.emailInput);
    const passwordInput = await screen.findByTestId(testIds.passwordInput);
    const registerBtn = await screen.findByTestId(testIds.registerBtn);

    userEvent.type(nameInput, 'This is a Longer Name');
    userEvent.type(emailInput, 'vasco@dagama.com');
    userEvent.type(passwordInput, '123456');
    expect(registerBtn).toBeEnabled();

    await act(async () => userEvent.click(registerBtn));

    const errorToast = await screen.findByTestId(testIds.errorToast);
    expect(errorToast).toBeInTheDocument();
    expect(errorToast).toBeVisible();
    expect(errorToast).toHaveTextContent(/dados inválidos/i);
  });

  it('should display an error "Dados inválidos" when API returns 500', async () => {
    axios.post.mockRejectedValueOnce({ response: { status: 500 }});
    renderWithRouter(<App />, registerRoute);

    const nameInput = await screen.findByTestId(testIds.nameInput);
    const emailInput = await screen.findByTestId(testIds.emailInput);
    const passwordInput = await screen.findByTestId(testIds.passwordInput);
    const registerBtn = await screen.findByTestId(testIds.registerBtn);

    userEvent.type(nameInput, 'This is a Longer Name');
    userEvent.type(emailInput, 'vasco@dagama.com');
    userEvent.type(passwordInput, '123456');
    expect(registerBtn).toBeEnabled();

    await act(async () => userEvent.click(registerBtn));

    const errorToast = await screen.findByTestId(testIds.errorToast);
    expect(errorToast).toBeInTheDocument();
    expect(errorToast).toBeVisible();
    expect(errorToast).toHaveTextContent(/erro no servidor/i);
  });

  it('should allow customer to register with valid credentials', async () => {
    axios.post.mockResolvedValueOnce({ data: registerDataMock })
    axios.get.mockResolvedValueOnce({ data: [] });
    const { history } = renderWithRouter(<App />, registerRoute);
    
    const nameInput = await screen.findByTestId(testIds.nameInput);
    const emailInput = await screen.findByTestId(testIds.emailInput);
    const passwordInput = await screen.findByTestId(testIds.passwordInput);
    const registerBtn = await screen.findByTestId(testIds.registerBtn);

    userEvent.type(nameInput, 'This is a Longer Name');
    userEvent.type(emailInput, 'vasco@dagama.com');
    userEvent.type(passwordInput, '123456');
    expect(registerBtn).toBeEnabled();

    await act(async () => userEvent.click(registerBtn));
    
    expect(history.location.pathname).toBe('/customer/products');
  });
});
