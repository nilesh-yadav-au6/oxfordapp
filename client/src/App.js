import React from 'react';
import './App.css';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { Switch ,Route } from "react-router-dom"
import Navbar from './components/Navbar'
import WordDetaill from "./components/WordDetaill"
import Addword from "./components/Addword"
import AllWords from "./components/Allwords"
import SearchDetaill from "./components/searchDetaill"

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
          <Navbar />
          <Addword />
          <Switch>
            <Route exact path="/" component={AllWords} />
            <Route exact path="/nav" component={Navbar} />
            <Route exact path="/worddetaill/:word" component={WordDetaill} />
            <Route exact path="/searchdetaill/:word" component={SearchDetaill} />
          </Switch>
      </ApolloProvider>
      
    </div>
  );
}

export default App;
