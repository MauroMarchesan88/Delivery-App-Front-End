export const headerTestIds = {
  ordersListBtn: 'customer_products__element-navbar-link-orders',
  userName: 'customer_products__element-navbar-user-full-name',
  logOutBtn: 'customer_products__element-navbar-link-logout',
};

export const cardTestIds = {
  orderId: 'seller_orders__element-order-id-',
  orderStatus: 'seller_orders__element-delivery-status-',
  orderDate: 'seller_orders__element-order-date-',
  totalPrice: 'seller_orders__element-card-price-',
  orderAddress: 'seller_orders__element-card-address-',
};

export const fetchDataMock = [
  {
    id: 1,
    userId: 1,
    sellerId: 2,
    totalPrice: '200.00',
    deliveryAddress: 'rua123',
    deliveryNumber: '123',
    saleDate: '2022-09-23T19:25:25.000Z',
    status: 'Pendente',
  },
  {
    id: 2,
    userId: 3,
    sellerId: 2,
    totalPrice: '300.00',
    deliveryAddress: 'rua456',
    deliveryNumber: '456',
    saleDate: '2022-09-23T19:25:25.000Z',
    status: 'Em trânsito',
  },
];
