import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React, { useContext } from 'react';
import CartContext from '../context/cart/CartContext';

function CheckoutTable() {
  const { cart, setCart } = useContext(CartContext);

  const handleDeleteItem = (productId) => {
    const updatedCart = cart.filter((item) => item.productId !== productId);
    setCart(updatedCart);
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Item</TableCell>
          <TableCell>Descrição</TableCell>
          <TableCell>Quantidade</TableCell>
          <TableCell>Valor Unitário</TableCell>
          <TableCell>Sub-total</TableCell>
          <TableCell>Remover item</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {cart.map((item, index) => (
          <TableRow key={ index }>
            <TableCell
              data-testid={
                `customer_checkout__element-order-table-item-number-${index}`
              }
            >
              {index + 1}
            </TableCell>
            <TableCell
              data-testid={
                `customer_checkout__element-order-table-name-${index}`
              }
            >
              {item.name}
            </TableCell>
            <TableCell
              data-testid={
                `customer_checkout__element-order-table-quantity-${index}`
              }
            >
              {item.quantity}
            </TableCell>
            <TableCell
              data-testid={
                `customer_checkout__element-order-table-unit-price-${index}`
              }
            >
              {`R$ ${item.unitPrice.toFixed(2).replace('.', ',')}`}
            </TableCell>
            <TableCell
              data-testid={
                `customer_checkout__element-order-table-sub-total-${index}`
              }
            >
              {`R$ ${item.subTotal.toFixed(2).replace('.', ',')}`}
            </TableCell>
            <TableCell
              data-testid={
                `customer_checkout__element-order-table-remove-${index}`
              }
            >
              <Button
                variant="text"
                onClick={ () => handleDeleteItem(item.productId) }
              >
                Remover item
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default CheckoutTable;
