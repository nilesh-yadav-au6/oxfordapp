"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typeDefs = void 0;

var _apolloServerExpress = require("apollo-server-express");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  type Query {\n    words: [Word!]!\n    wordfind(id:ID!): Word!\n    wordSearch(word:String!): Word!\n  }\n\n  type Word {\n    id: String!\n    text:String,\n    lexicalCategory:String,\n    definition:String,\n    example:String,\n    audioFile:String\n  }\n\n  type Mutation {\n    createWord(word: String!): Word!\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var typeDefs = (0, _apolloServerExpress.gql)(_templateObject());
exports.typeDefs = typeDefs;