import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import mysql from 'mysql';
import dotenv from 'dotenv';
import { getDB } from "./db.js"; //This is needed because package.json has "type": "module" and we need to import the db.ts file
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
dotenv.config();

export const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Lead {
    id: ID!
    name: String!
    email: String!
    mobile: String!
    postcode: String!
    services: String!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    leads: [Lead]
    lead(id: ID!): Lead
  }
  type Mutation {
    register(
      name: String!
      email: String!
      mobile: String!
      postcode: String!
      services: String!
    ): Lead
    setupDatabase: String
  }

`;

const pool = mysql.createPool({
  host: process.env.HOST,
  user:  process.env.USER,
  password:  process.env.PW,
  database:  process.env.DB,
  connectionLimit: 10,
  multipleStatements: true,
});

// const db = mysql.createConnection({
//   host: process.env.HOST,
//   user: process.env.USER,
//   password: process.env.PW,
//   database: process.env.DB,
// });

// const books = [
//   {
//     title: 'The Awakening',
//     author: 'Kate Chopin',
//   },
//   {
//     title: 'City of Glass',
//     author: 'Paul Auster',
//   },
// ];

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
type LeadRow = {
  id: number;
  name: string;
  email: string;
  mobile: string;
  postcode: string;
  services: string | null;
};

export const resolvers = {
  Query: {
    leads: async() => {
      const db = await getDB();
      try {
        
        const [rows] = await db.execute("SELECT * FROM leads");
        console.log(rows); // Log the rows to see the data

        return rows;
      } finally {
        db.release(); // Release connection back to pool
      }
    },
    lead: async (_: any, { id }: { id: string }) => {

      const db = await getDB();
      try {
        
        console.log("passing id", id);
        const [rows] = await db.execute("SELECT * FROM leads WHERE id = ?", [id]);

        console.log("rows:" + rows); // Log the rows to see the data

        if((rows as LeadRow[]).length === 0) {
          return null;
        }else{
          return rows[0];
        }

        

      } finally {
        db.release(); // Release connection back to pool
      }


    },
  },
  Mutation: {
    register: async (_, { name, email, mobile, postcode, services }) => {
      const db = await getDB();
      try {
        const [result] = await db.execute(
          'INSERT INTO leads (name, email, mobile, postcode, services) VALUES (?, ?, ?, ?, ?)',
          [name, email, mobile, postcode, services]
        );
        
        const insertId = (result as mysql.OkPacket).insertId;
        
        return {
          id: insertId,
          name,
          email,
          mobile,
          postcode,
          services
        };
      } finally {
        db.release();
      }
    },
    setupDatabase: async () => {
      const db = await getDB();  // Assuming getDB() gives you the database connection pool

      try {
        // Drop the database if it exists and create a new one
        await db.execute(`DROP DATABASE IF EXISTS db_brighteeats`);
        await db.execute(`CREATE DATABASE db_brighteeats`);


        await db.execute(`DROP TABLE IF EXISTS db_brighteeats.leads`);
        // Drop the table if it exists and create a new one
        await db.execute(`
          CREATE TABLE db_brighteeats.leads (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            mobile VARCHAR(20) NOT NULL,
            postcode VARCHAR(10) NOT NULL,
            services VARCHAR(255) NOT NULL
          )
        `);

        // Insert data into the tasks table
        await db.execute(`
          INSERT INTO db_brighteeats.leads (name, email, mobile, postcode, services)
          VALUES
            ('Arjay Leonardo', 'jaywiz71@gmail.com', '09500626430', 4103, 'DELIVERY'),
            ('Lester Trinidad', 'jaywiz712@gmail.com', '09500626431', 4103, 'PICKUP'),
            ('Reimel Trinidad', 'jaywiz712@gmail.com', '09500626431', 4103, 'PAYMENT'),
            ('Ella Santos', 'ella.santos@example.com', '09171234567', 4103, 'DELIVERY'),
            ('Mark Reyes', 'mark.reyes@example.com', '09281234567', 4104, 'PICKUP'),
            ('Joyce Tan', 'joyce.tan@example.com', '09391234567', 4105, 'PAYMENT'),
            ('Leo Gomez', 'leo.gomez@example.com', '09181234567', 4106, 'DELIVERY'),
            ('Nina Cruz', 'nina.cruz@example.com', '09491234567', 4107, 'PICKUP'),
            ('Ryan Dela Cruz', 'ryan.dc@example.com', '09161234567', 4108, 'PAYMENT'),
            ('Clara Lim', 'clara.lim@example.com', '09221234567', 4109, 'DELIVERY'),
            ('Jared Lopez', 'jared.lopez@example.com', '09171231000', 4110, 'PICKUP'),
            ('Bianca Reyes', 'bianca.reyes@example.com', '09281231001', 4111, 'DELIVERY'),
            ('Karl Mendoza', 'karl.mendoza@example.com', '09391231002', 4112, 'PAYMENT'),
            ('Sophia Chan', 'sophia.chan@example.com', '09491231003', 4113, 'DELIVERY'),
            ('Miguel Tan', 'miguel.tan@example.com', '09181231004', 4114, 'PICKUP'),
            ('Angelica Cruz', 'angelica.cruz@example.com', '09291231005', 4115, 'PAYMENT'),
            ('Daniel Lim', 'daniel.lim@example.com', '09301231006', 4116, 'DELIVERY'),
            ('Patricia Yu', 'patricia.yu@example.com', '09401231007', 4117, 'PICKUP'),
            ('Cedric Ong', 'cedric.ong@example.com', '09501231008', 4118, 'PAYMENT'),
            ('Tricia Santos', 'tricia.santos@example.com', '09601231009', 4119, 'DELIVERY'),
             ('Marco Dela Cruz', 'marco.dc@example.com', '09170010010', 4120, 'PICKUP'),
            ('Elaine Navarro', 'elaine.n@example.com', '09280010011', 4121, 'DELIVERY'),
            ('Joshua Villanueva', 'joshua.v@example.com', '09390010012', 4122, 'PAYMENT'),
            ('Camille Reyes', 'camille.r@example.com', '09490010013', 4123, 'DELIVERY'),
            ('Nathan Ramos', 'nathan.r@example.com', '09500010014', 4124, 'PICKUP'),
            ('Denise Gomez', 'denise.g@example.com', '09600010015', 4125, 'PAYMENT'),
            ('Aaron Santiago', 'aaron.s@example.com', '09180010016', 4126, 'DELIVERY'),
            ('Louise Bautista', 'louise.b@example.com', '09290010017', 4127, 'PICKUP'),
            ('Isabelle Chua', 'isabelle.c@example.com', '09300010018', 4128, 'PAYMENT'),
            ('Leo Fernandez', 'leo.f@example.com', '09400010019', 4129, 'DELIVERY')
        `);

        return "Database setup successful";
      } catch (error) {
        console.error("Error setting up the database:", error);
        throw new Error("Error setting up the database");
      } finally {
        db.release(); // Release the connection back to the pool
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