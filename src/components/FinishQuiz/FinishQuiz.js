import React from 'react';

import classes from './FinishQuiz.module.css';

const FinishQuiz = props => {
  return (
    <div className={classes.finishQuiz}> 
      <ul>
        <li>
          <strong>1. </strong>
          Question
          <i className={'fa fa-times ' + classes.error} />
        </li>
        <li>
          <strong>1. </strong>
          Question
          <i className={'fa fa-check ' + classes.success} />
        </li>
      </ul>
      <p> Right answers 4 out of 10</p>
      <div>
        <button>Try again</button>
      </div>
    </div>
  )
}

export default FinishQuiz;