import { ADD_WORD } from "../actionType"


export const getWords = (words) => {

    return {
        type:ADD_WORD,
        payload:words
    }
}