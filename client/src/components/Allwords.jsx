import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { connect } from "react-redux";
import  { getWords } from "../redux/actions/wordAction"
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Link } from "react-router-dom"
import Container from '@material-ui/core/Container';



const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const GET_WORDS = gql`
query{
  words{
    text
    lexicalCategory
    example
    audioFile
    id
    definition
  }
}
`;


function Allwords(props) {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_WORDS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
    
    props.getWords(data.words)
  
  return (
    <Container className={classes.root} maxWidth="md">

      {
        props.words !== null ? props.words.map(word => <>

            <Link to={`/worddetaill/${word.id}`} style={{textDecoration:"none" , textAlign:"center" , height: "50px"}}>
            <Paper  name={word.id} elevation={3}sty>

              <h3 style={{textAlign:"center" , height: "50px", paddingTop:"12px" , boxSizing:"border-box"}}>{word.text}</h3>

            </Paper>
            </Link>

           
        
         </> ) :null
      }
       
     
  </Container>
  )
}

const mapStateProps = (state) => {
    return {
      words:state.word.words
    }
}

export default connect(mapStateProps, {getWords})(Allwords)