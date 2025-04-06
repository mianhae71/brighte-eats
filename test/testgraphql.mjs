//npx mocha test/testgraphql.js
//npx mocha --require ts-node/register test/testgraphql.ts
import { expect } from 'chai';
import request from 'supertest';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs, resolvers } from '../dist/index.js'; // Adjust the import path accordingly

// const { expect } = require('chai');
// const request = require('supertest');
// const { ApolloServer } = require('@apollo/server');
// const { startStandaloneServer } = require('@apollo/server/standalone');
// const { typeDefs, resolvers } = require('../src/index.ts'); // Adjust the import path accordingly

describe('GraphQL API', () => {
  let app;
  let server;
  before(async () => {

    // Initialize Apollo Server and apply it to an express app for testing
    server = new ApolloServer({ typeDefs, resolvers });
    const { url } = await startStandaloneServer(server, {
      listen: { port: 0 }, // Let the server use a random free port
    });
    app = url;
  });

  it('should return all leads in the leads query', async () => {
    const query = `
      query {
        leads {
          id
          name
          email
          mobile
          postcode
          services
        }
      }
    `;

    const response = await request(app)
      .post('/graphql')
      .send({ query })
      .expect('Content-Type', /json/);

    expect(response.status).to.equal(200);
    expect(response.body.data.leads).to.be.an('array');
  });
  
  it('should return one in the leads query', async () => {
    const query = `
      query {
        lead(id:1) {
          id
          name
          email
          mobile
          postcode
          services
        }
      }
    `;

    const response = await request(app)
      .post('/graphql')
      .send({ query })
      .expect('Content-Type', /json/);

    expect(response.status).to.equal(200);
    // Check that the 'book' query returned data
    expect(response.body.data.lead).to.be.an('object');
    expect(response.body.data.lead).to.have.property('id');
    expect(response.body.data.lead).to.have.property('name');
    expect(response.body.data.lead).to.have.property('email');
    expect(response.body.data.lead).to.have.property('mobile');
    expect(response.body.data.lead).to.have.property('postcode');
    expect(response.body.data.lead).to.have.property('services');

    // Display the returned book object in the console
    console.log('Returned Book:', response.body.data.lead);
  });

  it('should add a new lead through addLead mutation', async () => {
    const mutation = `
      mutation {
        register(
          name: "Test User"
          email: "test@example.com"
          mobile: "1234567890"
          postcode: "12345"
          services: "DELIVERY"
        ) {
          id
          name
          email
          mobile
          postcode
          services
        }
      }
    `;

    const response = await request(app)
      .post('/graphql')
      .send({ query: mutation })
      .expect('Content-Type', /json/);

    expect(response.status).to.equal(200);
    expect(response.body.data.register.name).to.equal('Test User');
  });
});