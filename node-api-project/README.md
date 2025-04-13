# Deals App

A Node.js application for managing deals with MongoDB integration.

## Features

- Create, read, update, and delete deals
- Search functionality
- MongoDB integration
- Modern UI

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file with your MongoDB connection string:
   ```
   MONGODB_URI=mongodb://localhost:27017/dealsdb
   PORT=3000
   NODE_ENV=development
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment to Render

1. Create a MongoDB Atlas account and get your connection string
2. Create a new Web Service on Render
3. Connect your GitHub repository
4. Add the following environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `NODE_ENV`: production
5. Deploy!

## API Endpoints

- `GET /api/deals` - Get all deals
- `GET /api/deals/:id` - Get a specific deal
- `POST /api/deals` - Create a new deal
- `PUT /api/deals/:id` - Update a deal
- `DELETE /api/deals/:id` - Delete a deal

## Project Structure

```
node-api-project
├── src
│   ├── app.js              # Entry point of the application
│   ├── routes              # Contains route definitions
│   │   └── index.js
│   ├── controllers         # Contains business logic for routes
│   │   └── index.js
│   ├── models              # Contains Mongoose models
│   │   └── index.js
│   └── config              # Contains configuration files
│       └── db.js
├── package.json            # NPM configuration file
├── .env                    # Environment variables
└── README.md               # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd node-api-project
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add your MongoDB connection string:
   ```
   MONGODB_URI=<your_mongodb_connection_string>
   ```

## Usage

To start the application, run:
```
npm start
```

The API will be available at `http://localhost:3000`.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License

This project is licensed under the MIT License.