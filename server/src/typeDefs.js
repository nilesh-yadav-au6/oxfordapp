import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    words: [Word!]!
    wordfind(id:ID!): Word!
    wordSearch(word:String!): Word!
  }

  type Word {
    id: String!
    text:String,
    lexicalCategory:String,
    definition:String,
    example:String,
    audioFile:String
  }

  type Mutation {
    createWord(word: String!): Word!
  }
`;
