import { Add, Remove } from '@mui/icons-material';
import {
  Button, ButtonGroup, Card,
  CardContent, CardMedia, Input, Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useRef, useState } from 'react';
import CartContext from '../context/cart/CartContext';

function ProductCard({ product }) {
  const initialRender = useRef(true);
  const [quantity, setQuantity] = useState(0);
  const { cart, setCart } = useContext(CartContext);

  useEffect(() => {
    if (cart.some((item) => item.productId === product.id)) {
      const currentItem = cart.find((item) => item.productId === product.id);
      setQuantity(currentItem.quantity);
    }
  }, []);

  const handleDecrease = () => {
    if (!quantity) return;
    setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    const itemExists = cart.some((item) => item.productId === product.id);

    if (!itemExists) {
      setCart([...cart, {
        productId: product.id,
        name: product.name,
        unitPrice: Number(product.price),
        quantity,
        subTotal: parseFloat((product.price * quantity).toFixed(2)),
      }]);
      return;
    }

    const updatedCart = cart.map((item) => {
      if (item.productId === product.id) {
        return {
          ...item,
          quantity,
          subTotal: parseFloat((item.unitPrice * quantity).toFixed(2)) };
      }
      return item;
    });

    setCart(updatedCart);
  }, [quantity]);

  return (
    <Card>
      <CardMedia
        component="img"
        image={ product?.urlImage }
        sx={ { height: '10px', objectFit: 'contain' } }
        data-testid={ `customer_products__img-card-bg-image-${product?.id}` }
      />
      <CardContent>
        <Typography
          variant="h6"
          component="h3"
          data-testid={ `customer_products__element-card-title-${product?.id}` }
        >
          {product?.name}
        </Typography>
        <Typography
          variant="body1"
          component="p"
          sx={ { marginBottom: '16px' } }
        >
          <span>R$ </span>
          <span
            data-testid={ `customer_products__element-card-price-${product?.id}` }
          >
            {product?.price?.replace('.', ',')}
          </span>
        </Typography>
        <ButtonGroup variant="outlined">
          <Button
            size="small"
            sx={ { borderRadius: '8px 0 0 8px', minWidth: '40px' } }
            data-testid={ `customer_products__button-card-rm-item-${product?.id}` }
            onClick={ handleDecrease }
          >
            <Remove fontSize="small" />
          </Button>
          <Button
            disableRipple
            sx={ { cursor: 'initial',
              paddingLeft: '20px',
              paddingRight: '20px',
              borderRadius: '0px' } }
          >
            <Input
              type="number"
              onChange={ ({ target }) => setQuantity(Number(target.value)) }
              value={ quantity }
              inputProps={ {
                'data-testid': `customer_products__input-card-quantity-${product?.id}`,
                sx: { textAlign: 'center' },
              } }
              disableUnderline
            />
          </Button>
          <Button
            size="small"
            sx={ { borderRadius: '0 8px 8px 0', minWidth: '40px' } }
            data-testid={ `customer_products__button-card-add-item-${product?.id}` }
            onClick={ handleIncrease }
          >
            <Add fontSize="small" />
          </Button>
        </ButtonGroup>
      </CardContent>
    </Card>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    urlImage: PropTypes.string,
  }).isRequired,
};

export default ProductCard;
