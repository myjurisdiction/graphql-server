import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { typeDefs } from "./schema.js";
import db from "./_db.js";

const PORT = 4000;

const resolvers = {
  Query: {
    games: function () {
      return db.games;
    },

    authors: function () {
      return db.authors;
    },

    reviews: function () {
      return db.reviews;
    },

    review: function (_, args) {
      return db.reviews.find((review) => review.id === args.id);
    },

    game: function (_, args) {
      return db.games.find((game) => game.id === args.id);
    },

    author: function (_, args) {
      return db.authors.find((author) => author.id === args.id);
    },
  },

  Game: {
    reviews(parent) {
      return db.reviews.filter((r) => r.game_id === parent.id);
    },
  },

  Author: {
    reviews(parent) {
      return db.reviews.filter((r) => r.author_id === parent.id);
    },
  },

  Review: {
    game: function (parent) {
      return db.games.find((g) => g.id === parent.id);
    },
    author: function (parent) {
      return db.authors.find((a) => a.id === parent.id);
    },
  },

  Mutation: {
    deleteGame: function (_, args) {
      db.games = db.games.filter((game) => game.id !== args.id);
      return db.games;
    },

    addGame: function (_, args) {
      const { title, platform } = args.game;
      const newGameObject = {
        title,
        platform,
        id: Math.floor(Math.random() * 10000).toString(),
      };
      db.games.push(newGameObject);
      return newGameObject;
    },

    updateGame: function (_, args) {
      try {
        db.games = db.games.map((g) => {
          if (g.id === args.id) {
            g = { ...g, ...args.game };
          }
          return g;
        });

        return 'success'
      } catch (error) {
        return 'Update Failed'
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: PORT },
});

console.log(`Server ready at PORT : ${PORT}-${url}`);
