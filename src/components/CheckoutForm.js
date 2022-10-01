import {
  Box, Button, FormControl, InputLabel, Select, TextField,
} from '@mui/material';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { API_URL, HTTP_ERR } from '../constants';
import CartContext from '../context/cart/CartContext';
import UserContext from '../context/user/UserContext';
import ErrorToast from './ErrorToast';

function CheckoutForm({ calculateTotal }) {
  const { user } = useContext(UserContext);
  const { cart, setCart } = useContext(CartContext);
  const [sellerList, setSellerList] = useState([]);

  const [checkoutData, setCheckoutData] = useState({
    seller: '',
    address: '',
    addressNumber: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [displayError, setDisplayError] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/users/sellers`, {
          headers: { authorization: user.token },
        });
        setSellerList(data);
      } catch (err) {
        setErrorMessage('Erro no servidor :(');
        setDisplayError(true);
      }
    };
    fetchSellers();
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    setCheckoutData({ ...checkoutData, [name]: value });
  };

  const handleCheckout = async (event) => {
    event.preventDefault();
    const { seller, address, addressNumber } = checkoutData;

    const simplifiedCart = cart.map(
      (item) => ({ productId: item.productId, quantity: item.quantity }),
    );

    const checkout = {
      sellerId: Number(seller),
      deliveryAddress: address,
      deliveryNumber: addressNumber,
      totalPrice: calculateTotal(),
      products: simplifiedCart,
    };

    let sale;

    try {
      const { data } = await axios.post(
        `${API_URL}/sales/create`,
        { ...checkout },
        { headers: { authorization: user.token } },
      );
      sale = data;
    } catch (err) {
      console.log(err);
      let message = 'Não foi possível criar sua venda.'
        + 'Verifique seu carrinho e endereço.';

      if (err.response.status === HTTP_ERR) message = 'Erro no servidor :(';

      setErrorMessage(message);
      setDisplayError(true);
      return;
    }

    setCart([]);
    history.push(`/customer/orders/${sale.id}`);
  };

  return (
    <Box
      component="form"
      sx={ { display: 'flex', flexWrap: 'wrap', gap: '16px' } }
      onSubmit={ handleCheckout }
    >
      <FormControl sx={ { flex: 2 } }>
        <InputLabel shrink htmlFor="select-seller">Responsável</InputLabel>
        <Select
          label="Responsável"
          value={ checkoutData.seller }
          displayEmpty
          onChange={ handleChange }
          native
          inputProps={ {
            id: 'select-seller',
            name: 'seller',
            'data-testid': 'customer_checkout__select-seller',
          } }
        >
          <option value="" disabled>Escolha um nome</option>
          {sellerList.map((person) => (
            <option key={ person.id } value={ person.id }>
              {person.name}
            </option>
          ))}
        </Select>
      </FormControl>

      <TextField
        name="address"
        sx={ { flex: 3 } }
        placeholder="Rua Gen. Almério de Moura, Bairro Vasco da Gama"
        label="Endereço"
        inputProps={ { 'data-testid': 'customer_checkout__input-address',
        } }
        value={ checkoutData.address }
        onChange={ handleChange }
      />

      <TextField
        name="addressNumber"
        sx={ { flex: 1 } }
        placeholder="131"
        label="Número"
        inputProps={ { 'data-testid': 'customer_checkout__input-address-number',
        } }
        value={ checkoutData.addressNumber }
        onChange={ handleChange }
      />
      <Box
        sx={ {
          flexBasis: '100%',
          display: 'flex',
          justifyContent: 'center',
          marginTop: '16px',
        } }
      >
        <Button
          type="submit"
          variant="contained"
          size="large"
          data-testid="customer_checkout__button-submit-order"
          // onClick={ handleCheckout }
          sx={ { width: '50%' } }
        >
          Finalizar Pedido
        </Button>
      </Box>
      <ErrorToast
        type="checkout-error"
        open={ displayError }
        setOpen={ setDisplayError }
        message={ errorMessage }
      />
    </Box>
  );
}

CheckoutForm.propTypes = {
  calculateTotal: PropTypes.func.isRequired,
};

export default CheckoutForm;
