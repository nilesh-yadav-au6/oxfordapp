import React,{useState} from "react";
import { useMutation, gql } from "@apollo/client";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { purple } from "@material-ui/core/colors";
import style from "../components/Styles/Addword.module.css";
import { withRouter } from "react-router-dom"
import AllWords  from "./redirect"


const CREATE_WORD = gql`
  mutation Addword($type: String!) {
    createWord(word: $type) {
      id
    }
  }
`;

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));




function Addword(props) {
  const classes = useStyles();
  const [word , setWord] = useState("")

  let input;
  const [createWord, { data }] = useMutation(CREATE_WORD);
  console.log(data);

  const handleClick = (e) => {
    e.preventDefault();
    setWord(input.value)
    createWord({ variables: { type: input.value } });
    input.value = ""

    setTimeout(() => {
      props.history.push("/")
    },2000)

  };
  return (
    <div className={style.form_div}>
      <form onSubmit={handleClick}>
        <input
          type="text"
          className={style.input_box}
          ref={(node) => {
            input = node;
          }}
        />
        <ColorButton
          variant="contained"
          type="submit"
          color="primary"
          className={classes.margin}
        >
          Add Word
        </ColorButton>
      </form>
      {
        word ? <AllWords /> :null
      }
    </div>
  );
}

export default withRouter(Addword);
