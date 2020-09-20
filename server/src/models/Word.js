import mongoose from "mongoose";

export const Word = mongoose.model("Word", {
    text:String,
    lexicalCategory:String,
    definition:String,
    example:String,
    audioFile:String
});
