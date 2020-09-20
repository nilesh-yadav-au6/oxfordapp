import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import PropTypes from "prop-types";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useSpring, animated } from "react-spring/web.cjs";
import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};


const GET_SEARCH_WORD = (word) => {
  const a = gql`
  query{
    wordSearch(word:"${word}"){
      text
      lexicalCategory
      example
      audioFile
      id
      definition
    }
  }
  `;
  return a;
};

export default function SpringModal(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const word = props.match.params.word;

  const { loading, error, data } = useQuery(GET_SEARCH_WORD(word));

  if (loading) return <p>Loading...</p>;
  if (error) return <Paper elevation={3}><h1>No Such Word In WordList</h1></Paper>

  const handleClose = () => {
    props.history.push("/");
    setOpen(false);
  };

  return (
    <Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={true}>
        <div className={classes.paper}>
          <h1>{`Word : ${data.wordSearch.text}`}</h1>
          <h1>{`Adjective : ${data.wordSearch.lexicalCategory}`}</h1>
          <h1>{`Definition : ${data.wordSearch.definition}`}</h1>
          <h1>{`Example : ${data.wordSearch.example}`}</h1>

          <h1>Pronunciation</h1>
          <audio controls>
            <source src={data.wordSearch.audioFile} type="audio/ogg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </Fade>
    </Modal>
  );
}
