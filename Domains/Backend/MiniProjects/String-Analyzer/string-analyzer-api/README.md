# String Analyzer API
**Contributor:** devdammie

## Overview
The String Analyzer API is a RESTful service designed to analyze strings and store their computed properties. It provides endpoints for creating, retrieving, filtering, and deleting strings, making it a useful tool for applications that require string manipulation and analysis.

## Features
- Create a new string and analyze its properties.
- Retrieve a specific string by ID.
- Get a list of all analyzed strings.
- Filter strings based on natural language properties.
- Delete a string by ID.

## Project Structure
```
string-analyzer-api
├── src
│   ├── server.js          # Entry point of the application
│   ├── app.js             # Application configuration
│   ├── routes             # Route definitions
│   ├── controllers        # Request handling logic
│   ├── services           # Business logic for string analysis
│   ├── models             # Data models for strings
│   ├── middleware         # Middleware functions
│   ├── utils              # Utility functions for string analysis
│   └── config             # Configuration settings
├── tests                  # Unit tests for the API
├── .env.example           # Example environment variables
├── .gitignore             # Files to ignore in version control
├── package.json           # NPM configuration
└── README.md              # Project documentation
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd string-analyzer-api
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage
1. Start the server:
   ```
   npm start
   ```
2. The API will be available at `http://localhost:3000`.

## API Endpoints
- `POST /api/strings` - Create a new string
- `GET /api/strings/:id` - Retrieve a string by ID
- `GET /api/strings` - Retrieve all strings
- `GET /api/strings/filter` - Filter strings based on criteria
- `DELETE /api/strings/:id` - Delete a string by ID

## Testing
To run the tests, use the following command:
```
npm test
```
