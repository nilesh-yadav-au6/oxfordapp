import  { ADD_WORD } from "../actionType"


const intitalState = { 
    words:[]
}

const wordReducer = (state = intitalState , action) => {
    const  { type , payload } = action

    switch(type){

        case ADD_WORD :
            console.log(payload)
            const a = {...state , words:payload};
            console.log(a)

            return a
        default:
            return state

    }
}



export default wordReducer