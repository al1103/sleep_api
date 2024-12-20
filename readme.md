# Sleep API

Welcome to the Sleep API documentation!

## Introduction

The Sleep API is a RESTful API that allows users to track their sleep patterns and analyze their sleep quality. It provides endpoints for recording sleep data, retrieving sleep statistics, and managing user accounts.

## Getting Started

To get started with the Sleep API, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/sleep-api.git`
2. Install the required dependencies: `npm install`
3. Set up the database: `npm run db:setup`
4. Start the server: `npm start`

## API Endpoints

The Sleep API provides the following endpoints:

- `POST /sleep`: Record a new sleep entry.
- `GET /sleep`: Retrieve all sleep entries.
- `GET /sleep/:id`: Retrieve a specific sleep entry.
- `PUT /sleep/:id`: Update a specific sleep entry.
- `DELETE /sleep/:id`: Delete a specific sleep entry.

For detailed information on each endpoint, refer to the [API documentation](./api-docs.md).

## Authentication

To access the Sleep API, you need to authenticate using JSON Web Tokens (JWT). When making requests to protected endpoints, include the JWT in the `Authorization` header as follows:

```
Authorization: Bearer <your-token>
```

For more information on authentication, refer to the [Authentication documentation](./authentication.md).

## Error Handling

The Sleep API follows standard error handling practices. If an error occurs, the API will respond with an appropriate HTTP status code and an error message in the response body.

For a list of possible error codes and their meanings, refer to the [Error Handling documentation](./error-handling.md).

## Conclusion

That's it! You're now ready to start using the Sleep API. If you have any questions or need further assistance, please don't hesitate to reach out.

Happy sleeping!
