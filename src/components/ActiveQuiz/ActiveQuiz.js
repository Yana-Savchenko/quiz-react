import React from 'react';

import classes from './ActiveQuiz.module.css';

const ActiveQuiz = props => (
  <div className={classes.activeQuiz}>
    <p className={classes.question}>
      <span>
        <strong>1.</strong>&nbsp;
        Hi!
      </span>
      <small>4 out of 12</small>
    </p>

    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
    </ul>
  </div>
)

export default ActiveQuiz;