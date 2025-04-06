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

    - Go to brighte-eats-main and open terminal
    - npm install

3. Install dependencies for frontend(React):

    Navigate to the project directory and install the necessary frontend dependencies:

    - Go to brighte-eats-main/frontend and open terminal
    - npm install

4. Start the NodeJS application:

    - npm start

    Now, open your browser and navigate to:
    http://localhost:4000/graphql to access the GraphQL endpoint.

5. Configure database connection

    Make sure to configure your database connection by modifying the _.env_ file in the root project folder. 
    Ensure the credentials and settings align with your local or cloud database.
    Database must exist or you can create one

    Test the connection at http://localhost:4000/graphql 
    - In the GraphQL operation terminal, run the following mutation:

        query GetLeads {
            leads{
                id,name
            }
        }
    
    If you are encountering 'Access Denied' error, you should make sure that SQL credentials are correct and that you have access to the MySQL
    Check this out : https://stackoverflow.com/questions/17975120/access-denied-for-user-rootlocalhost-using-password-yes-no-privileges

    if you are encountering 'Database not found' or 'Table not found' proceed to Step 6.

6. Initialise the Database:

   To set up the database, follow these steps:

   1. Go to http://localhost:4000/graphql 
   2. In the GraphQL operation terminal, run the following mutation:

        mutation {
            setupDatabase
        }

    This will initialize the database for the application.

7. Start the React Application:

    Now, navigate back to the frontend folder and run the React application:
    - Go to brighte-eats-main/frontend and open terminal
    - npm run dev

    Once the React app starts, open your browser and go to:
    http://localhost:3000 to access the frontend.

## Unit Testing
   
   After completing the installation, you can run the unit tests for the project by executing the following command in your terminal:
   Make sure you shut down the server previously since this will also use localhost:4000
   
   - Go to brighte-eats-main and open terminal
   - npm test

   This will run all the test cases defined in the project and output the results in the terminal.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Acknowledgments

- brighte-eats was built using NodeJS/Typescript, Apollo Server, GraphQL and React as the Frontend