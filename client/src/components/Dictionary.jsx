import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_SINGLE_WORD = gql`
query{
  wordfind(id:"5f66ea35bab4001218fb0f91"){
    text
    lexicalCategory
    example
    audioFile
    id
    definition
  }
}
`;

function Dictionary() {
  const { loading, error, data } = useQuery(GET_SINGLE_WORD);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log(data)
  return <h1>{data.wordfind.text}</h1>
}

export default Dictionary


