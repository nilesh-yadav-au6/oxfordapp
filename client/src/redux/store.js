import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import wordReducer from "../redux/reducers/wordReducer"


const reducer = combineReducers({
  word: wordReducer,
});

const store = createStore(reducer, composeWithDevTools());


export default store;
