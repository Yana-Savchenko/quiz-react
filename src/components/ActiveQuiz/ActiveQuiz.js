import React from 'react';

import classes from './ActiveQuiz.module.css';
import AnswersList from './AnswersList/AnswersList';

const ActiveQuiz = props => (
  <div className={classes.activeQuiz}>
    <p className={classes.question}>
      <span>
        <strong>1.</strong>&nbsp;
        {props.question}
      </span>
      <small>{props.questionNumber} out of {props.quizLength}</small>
    </p>

    <AnswersList
      answers={props.answers}
      onAnswerClick={props.onAnswerClick}
      state={props.state} 
    />
  </div>
)

export default ActiveQuiz;