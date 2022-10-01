import {
  Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import UserContext from '../context/user/UserContext';

function DetailsTable({ sale }) {
  const { user } = useContext(UserContext);
  const { role } = user;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Item</TableCell>
          <TableCell>Descrição</TableCell>
          <TableCell>Quantidade</TableCell>
          <TableCell>Valor Unitário</TableCell>
          <TableCell>Sub-total</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          role === 'customer'
            ? (sale.products.map((item, index) => (
              <TableRow key={ index }>
                <TableCell
                  data-testid={
                    `customer_order_details__element-order-table-item-number-${index}`
                  }
                >
                  {index + 1}
                </TableCell>
                <TableCell
                  data-testid={
                    `customer_order_details__element-order-table-name-${index}`
                  }
                >
                  {item.name}
                </TableCell>
                <TableCell
                  data-testid={
                    `customer_order_details__element-order-table-quantity-${index}`
                  }
                >
                  {item.SalesProducts.quantity}
                </TableCell>
                <TableCell
                  data-testid={
                    `customer_order_details__element-order-table-unit-price-${index}`
                  }
                >
                  {`R$ ${((Number(item.price)).toFixed(2).replace('.', ','))}`}
                </TableCell>
                <TableCell
                  data-testid={
                    `customer_order_details__element-order-table-sub-total-${index}`
                  }
                >
                  {`R$ ${(Number(item.price)
                  * item.SalesProducts.quantity).toFixed(2).replace('.', ',')}`}
                </TableCell>
              </TableRow>
            )))
            : (sale.products.map((item, index) => (
              <TableRow key={ index }>
                <TableCell
                  data-testid={
                    `seller_order_details__element-order-table-item-number-${index}`
                  }
                >
                  {index + 1}
                </TableCell>
                <TableCell
                  data-testid={
                    `seller_order_details__element-order-table-name-${index}`
                  }
                >
                  {item.name}
                </TableCell>
                <TableCell
                  data-testid={
                    `seller_order_details__element-order-table-quantity-${index}`
                  }
                >
                  {item.SalesProducts.quantity}
                </TableCell>
                <TableCell
                  data-testid={
                    `seller_order_details__element-order-table-unit-price-${index}`
                  }
                >
                  {`R$ ${((Number(item.price)).toFixed(2).replace('.', ','))}`}
                </TableCell>
                <TableCell
                  data-testid={
                    `seller_order_details__element-order-table-sub-total-${index}`
                  }
                >
                  {`R$ ${(Number(item.price)
                  * item.SalesProducts.quantity).toFixed(2).replace('.', ',')}`}
                </TableCell>
              </TableRow>
            )))
        }
      </TableBody>
    </Table>
  );
}

DetailsTable.propTypes = {
  sale: PropTypes.shape({
    products: PropTypes.arrayOf(PropTypes.shape({
      productId: PropTypes.number,
      quantity: PropTypes.number,
    })),
  }).isRequired,
};

export default DetailsTable;
