import { Word } from "./models/Word";
import axios from "axios"

export const resolvers = {
  Query: {
    words: () => Word.find(),
    wordfind(parent, args, context, info) {
      const word1 = Word.findById({_id:args.id});
      if(word1){
        return word1
      }
    },
    wordSearch(parent, args, context, info) {
      return Word.findOne({text:args.word});
    }
  },
  Mutation: {
    createWord: async (_,{word}) => {

                const {data} = await axios.get( `${process.env.BASE_URL}/entries/en-us/${word}` ,
                    { headers: 
                        { 
                            "Accept": "application/json",
                            "app_id": process.env.OXFORD_ID,
                            "app_key": process.env.OXFORD_API_KEY
                        }
                        })
                
                const text = data.id
                const lexicalCategory = data.results[0].lexicalEntries[0].lexicalCategory.text
                const definition = data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]
                const example = data.results[0].lexicalEntries[0].entries[0].senses[0].examples[0].text
                const audioFile = data.results[0].lexicalEntries[0].entries[0].pronunciations[1].audioFile

                console.log(text,lexicalCategory,definition,example,audioFile)

      const createdWord = new Word({ text,lexicalCategory,definition,example,audioFile });
      await createdWord.save();
      return createdWord;
    }
  }
};
