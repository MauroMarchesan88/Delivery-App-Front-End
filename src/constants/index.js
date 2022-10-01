const API_URL = 'http://localhost:3001';
const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_CONFLICT = 409;
const HTTP_ERR = 500;

const validations = {
  minPasswordLength: 6,
  minNameLength: 12,
  regexEmail: /[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-zA-Z.]*\w$/,
};

export { API_URL, validations, HTTP_OK, HTTP_CREATED, HTTP_CONFLICT, HTTP_ERR };
