const customerDataMock = {
  name: 'carlos',
  role: 'customer',
  id: 1,
  token: 'vascoDaGama',
};

const sellerDataMock = {
  name: 'carlos',
  role: 'seller',
  id: 1,
  token: 'giganteDaColina',
};

const adminDataMock = {
  name: 'carlos',
  role: 'administrator',
  id: 1,
  token: 'saoJanuario',
};

const testIds = {
  loginInput: 'common_login__input-email',
  passwordInput: 'common_login__input-password',
  loginBtn: 'common_login__button-login',
  registerBtn: 'common_login__button-register',
  errorToast: 'common_login__element-invalid-email',
};

module.exports = { customerDataMock, sellerDataMock, adminDataMock, testIds };
