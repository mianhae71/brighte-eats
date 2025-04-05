import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import mysql from 'mysql';
import dotenv from 'dotenv';
import { getDB } from "./db.js"; //This is needed because package.json has "type": "module" and we need to import the db.ts file
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
dotenv.config();
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Lead {
    id: ID!
    name: String!
    email: String!
    mobile: String!
    postcode: String!
    services: [String!]!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Lead]
    book(id: ID!): Lead
    emptybooks: [Lead]
  }
`;
const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PW,
    database: process.env.DB,
    connectionLimit: 10,
    multipleStatements: true,
});
// const db = mysql.createConnection({
//   host: process.env.HOST,
//   user: process.env.USER,
//   password: process.env.PW,
//   database: process.env.DB,
// });
const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];
const resolvers = {
    Query: {
        books: async () => {
            const db = await getDB();
            try {
                const [rows] = await db.execute("SELECT * FROM leads");
                console.log(rows); // Log the rows to see the data
                const leads = rows.map((lead) => ({
                    ...lead,
                    services: lead.services
                        ? lead.services.split(',').map(s => s.trim()) // split and clean
                        : [] // empty array if services is null or empty
                }));
                return leads;
            }
            finally {
                db.release(); // Release connection back to pool
            }
        },
        book: async (_, { id }) => {
            const db = await getDB();
            try {
                console.log("passing id", id);
                const [rows] = await db.execute("SELECT * FROM leads WHERE id = ?", [id]);
                console.log("rows:" + rows); // Log the rows to see the data
                if (rows.length === 0) {
                    return null;
                }
                const leads = rows.map((lead) => ({
                    ...lead,
                    services: lead.services
                        ? lead.services.split(',').map(s => s.trim()) // split and clean
                        : [] // empty array if services is null or empty
                }));
                console.log("leads:" + leads); // Log the rows to see the data
                const lead = leads[0]; // Get the first lead from the array
                return lead;
            }
            finally {
                db.release(); // Release connection back to pool
            }
        },
        emptybooks: async () => {
            const db = await getDB();
            try {
                const [rows] = await db.execute("SELECT * FROM leads WHERE id = 0");
                const leads = rows.map((lead) => ({
                    ...lead,
                    services: lead.services
                        ? lead.services.split(',').map(s => s.trim()) // split and clean
                        : [] // empty array if services is null or empty
                }));
                return leads;
            }
            finally {
                db.release(); // Release connection back to pool
            }
        },
    },
};
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);
