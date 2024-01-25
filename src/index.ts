import {ApolloServer} from '@apollo/server';
import {startStandaloneServer} from '@apollo/server/standalone';
// adding .js extention at the end is just a wayaround to get the compiled version working properly
// ISSUES: https://github.com/microsoft/TypeScript/issues/40878#issuecomment-711871066
import {typeDefs} from './schema.js';
import {Games, Authors, Reviews} from './db.js';

type TArgs = Record<'id', number>;

// as we can see we are sending the whole data as it is in resolvers, we might think how we are going to get the specified fields as per the logic of graphql, ApolloServer handles that for us
// Study Ref: https://www.apollographql.com/docs/apollo-server/data/resolvers
const resolvers = {
  // query resolvers
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
    review: (_, args: TArgs) => {
      return Reviews.find((review) => review.id == args.id);
    },
    game: (_, args: TArgs) => {
      return Games.find((game) => game.id == args.id);
    },
    author: (_, args: TArgs) => {
      return Authors.find((author) => author.id == args.id);
    },
  },
  // relational resolvers
  // handling nested queries of respective i.e. relations of schemas
  Game: {
    reviews: (parent) => {
      return Reviews.filter((review) => review.game_id == parent.id);
    },
  },
  Author: {
    reviews: (parent) => {
      return Reviews.filter((review) => review.author_id == parent.id);
    },
  },
  Review: {
    game: (parent) => {
      return Games.find((game) => game.id == parent.id);
    },
    author: (parent) => {
      return Authors.find((author) => author.id == parent.id);
    },
  },
  // mutation resolvers
  Mutation: {
    // post
    addGame: (_, args) => {
      const newGame = {id: Math.floor(Math.random() * 10000), ...args?.payload};
      Games.push(newGame);
      return newGame;
    },
    // put, patch
    updateGame: (_, args) => {
      const gameToUpdate = Games.findIndex((game) => game.id == args?.id);

      if (gameToUpdate > -1) {
        return {...Games.at(gameToUpdate), ...args?.payload};
      }

      return {};
    },
    // delete
    deleteGame: (_, args: TArgs) => {
      return Games.filter((game) => game.id != args.id);
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

const {url} = await startStandaloneServer(server, {listen: {port: PORT}});

console.log(`GraphQL server started at port: ${PORT}`);
console.log(`Apollo server running at: ${url}`);
