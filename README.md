# Brighte-Eats

Brighte-Eats is a full-stack web application built using Node.js, Apollo Server, GraphQL, and React. This application provides an intuitive insight about the customers interest in our new products.

## Table of Contents

- [Installation](#installation)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Installation


1. Clone the repository:

    - git clone https://github.com/mianhae71/brighte-eats.git

2. Install dependencies for NodeJS
    
    Navigate to the project directory and install the necessary backend dependencies:
    -cd brighte-eats
    -npm install

3. Install dependencies for frontend(React):

    Navigate to the project directory and install the necessary frontend dependencies:
    -cd brighte-eats/frontend
    -npm install

4. Start the NodeJS application:

    - npm start

    Now, open your browser and navigate to:
    http://localhost:4000/graphql to access the GraphQL endpoint.

5. Configure database connection

    Make sure to configure your database connection by modifying the .env file in the root project folder. 
    Ensure the credentials and settings align with your local or cloud database.

6. Initialise the Database:

   To set up the database, follow these steps:

   1. Go to http://localhost:4001/graphql 
   2. In the GraphQL operation terminal, run the following mutation:

        mutation {
            setupDatabase
        }

    This will initialize the database for the application.

7. Start the React Application:

    Now, navigate back to the frontend folder and run the React application:
    - cd brighte-eats/frontend
    - npm run dev

    Once the React app starts, open your browser and go to:
    http://localhost:3000 to access the frontend.

## Unit Testing
   
   After completing the installation, you can run the unit tests for the project by executing the following command in your terminal:
   
   - npm test

   This will run all the test cases defined in the project and output the results in the terminal.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Acknowledgments

- brighte-eats was built using NodeJS/Typescript, Apollo Server, GraphQL and React as the Frontend