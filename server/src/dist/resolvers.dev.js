"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = void 0;

var _Word = require("./models/Word");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var resolvers = {
  Query: {
    words: function words() {
      return _Word.Word.find();
    },
    wordfind: function wordfind(parent, args, context, info) {
      var word1 = _Word.Word.findById({
        _id: args.id
      });

      if (word1) {
        return word1;
      }
    },
    wordSearch: function wordSearch(parent, args, context, info) {
      return _Word.Word.findOne({
        text: args.word
      });
    }
  },
  Mutation: {
    createWord: function createWord(_, _ref) {
      var word, _ref2, data, text, lexicalCategory, definition, example, audioFile, createdWord;

      return regeneratorRuntime.async(function createWord$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              word = _ref.word;
              _context.next = 3;
              return regeneratorRuntime.awrap(_axios["default"].get("".concat(process.env.BASE_URL, "/entries/en-us/").concat(word), {
                headers: {
                  "Accept": "application/json",
                  "app_id": process.env.OXFORD_ID,
                  "app_key": process.env.OXFORD_API_KEY
                }
              }));

            case 3:
              _ref2 = _context.sent;
              data = _ref2.data;
              text = data.id;
              lexicalCategory = data.results[0].lexicalEntries[0].lexicalCategory.text;
              definition = data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0];
              example = data.results[0].lexicalEntries[0].entries[0].senses[0].examples[0].text;
              audioFile = data.results[0].lexicalEntries[0].entries[0].pronunciations[1].audioFile;
              console.log(text, lexicalCategory, definition, example, audioFile);
              createdWord = new _Word.Word({
                text: text,
                lexicalCategory: lexicalCategory,
                definition: definition,
                example: example,
                audioFile: audioFile
              });
              _context.next = 14;
              return regeneratorRuntime.awrap(createdWord.save());

            case 14:
              return _context.abrupt("return", createdWord);

            case 15:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }
};
exports.resolvers = resolvers;