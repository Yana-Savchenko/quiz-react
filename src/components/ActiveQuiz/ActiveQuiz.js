import React from 'react';

import classes from './ActiveQuiz.module.css';
import AnswersList from './AnswersList/AnswersList';

const ActiveQuiz = props => (
  <div className={classes.activeQuiz}>
    <p className={classes.question}>
      <span>
        <strong>1.</strong>&nbsp;
        Hi!
      </span>
      <small>4 out of 12</small>
    </p>

    <AnswersList 
      answers={props.answers}
    />
  </div>
)

export default ActiveQuiz;