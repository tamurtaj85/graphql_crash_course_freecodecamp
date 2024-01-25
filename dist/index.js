import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
// adding .js extention at the end is just a wayaround to get the compiled version working properly
// ISSUES: https://github.com/microsoft/TypeScript/issues/40878#issuecomment-711871066
import { typeDefs } from './schema.js';
import { Games, Authors, Reviews } from './db.js';
// as we can see we are sending the whole data as it is in resolvers, we might think how we are going to get the specified fields as per the logic of graphql, ApolloServer handles that for us
const resolvers = {
    Query: {
        reviews: () => {
            return Reviews;
        },
        games: () => {
            return Games;
        },
        authors: () => {
            return Authors;
        },
        review: (_, args) => {
            return Reviews.find((review) => review.id === args.id);
        },
    },
};
// server setup
const server = new ApolloServer({
    // typeDefs
    typeDefs,
    //resolvers
    resolvers,
});
const PORT = 4000;
const { url } = await startStandaloneServer(server, { listen: { port: PORT } });
console.log(`GraphQL server started at port: ${PORT}`);
