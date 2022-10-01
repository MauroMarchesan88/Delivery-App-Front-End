const saleDataMock = {
  id: 1,
  userId: 1,
  sellerId: 2,
  totalPrice: '9.70',
  deliveryAddress: 'rua taltaltal',
  deliveryNumber: '123',
  saleDate: '2022-09-23T18:11:57.000Z',
  status: 'Pendente',
  products: [
    {
      id: 1,
      name: 'Skol Lata 250ml',
      price: '2.20',
      urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg',
      SalesProducts: {
        saleId: 1,
        productId: 1,
        quantity: 1,
      },
    },
    {
      id: 2,
      name: 'Heineken 600ml',
      price: '7.50',
      urlImage: 'http://localhost:3001/images/heineken_600ml.jpg',
      SalesProducts: {
        saleId: 1,
        productId: 2,
        quantity: 1,
      },
    },
  ],
};

const saleInTransitMock = {
  id: 1,
  userId: 1,
  sellerId: 2,
  totalPrice: '9.70',
  deliveryAddress: 'rua taltaltal',
  deliveryNumber: '123',
  saleDate: '2022-09-23T18:11:57.000Z',
  status: 'Em Trânsito',
  products: [
    {
      id: 1,
      name: 'Skol Lata 250ml',
      price: '2.20',
      urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg',
      SalesProducts: {
        saleId: 1,
        productId: 1,
        quantity: 1,
      },
    },
    {
      id: 2,
      name: 'Heineken 600ml',
      price: '7.50',
      urlImage: 'http://localhost:3001/images/heineken_600ml.jpg',
      SalesProducts: {
        saleId: 1,
        productId: 2,
        quantity: 1,
      },
    },
  ],
};
export { saleDataMock, saleInTransitMock };
