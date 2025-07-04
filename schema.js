export const typeDefs = `
type Game {
    id : ID!
    title : String!
    platform : [String!]!
    reviews : [Review!]
}

type Review {
    id : ID!
    rating : Int!
    content : String!
    author : Author!
    game : Game!
}

type Author {
    id : ID!
    name : String!
    verified : Boolean!
    reviews : [Review!]
}

# entry point to different data sources
type Query {
    reviews : [Review]
    games : [Game]
    authors : [Author]
    review(id : ID!) : Review
    game(id : ID!) : Game
    author(id : ID!) : Author
}

#mutations
type Mutation {
    deleteGame(id : ID!) : [Game]
    addGame(game : AddGameInput!) : Game
    updateGame (game : UpdateGameInput!, id : ID!) : String
}

input AddGameInput {
    title : String!
    platform : [String!]!
}

input UpdateGameInput {
    title : String
    platform : [String!]
}
`;

/**
 * Few pointers:
 * Basic data types ->  int, float, string, boolean, ID
 *
 * if i put '!' in front of any data type then this means that this data type can not be NULL
 *
 * Query type has to present in the type defs
 */
