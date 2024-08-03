# Node.js Express REST API Basic E-COMMERCE Example


## technologies

- postgresql and sequelize (for ORM)
- express.js
- tokenization
- kerevizlog: my personal project [here](https://www.npmjs.com/package/kerevizlog)

## endpoints

- POST /api/v1/token - retrieve a token for a user
- POST /api/v1/customer - register a user
- GET /api/v1/customer/:id - returns the specific customer
- GET /api/v1/product/:id - returns the specific director
- GET /api/v1/cart/:id - returns the specific cart
- GET /api/v1/cart - returns a customer cart
- POST /api/v1/cart - add product to cart
- DELETE /api/v1/cart - delete product from cart

## [WIP] REST API documentations

## example environment variables

```
DB_NAME=director
DB_HOST=localhost
DB_USER=sametkamgul
DB_PASS=123
DB_PORT=5432
TOKEN_SECRET=samet
SALT_ROUNDS=10
TEST_USER_EMAIL=foo.bar@mail.com
TEST_USER_PASSWORD=bar
```

## package installation

```
npm i
```

or

```
npm install
```

## inserting postgresql database

```
npm run migrate
```

## running on dev mode

```
npm run dev
```

## [WIP] POSTMAN collection

