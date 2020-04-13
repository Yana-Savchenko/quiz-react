import React from 'react';

import classes from './FinishQuiz.module.css';

const FinishQuiz = props => {
  const successCount = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === 'success') {
      total++;
    }
    return total;
  }, 0)
  return (
    <div className={classes.finishQuiz}> 
      <ul>
        { props.quiz.map((quizItem, index) => {
          const cls = [
            'fa',
            props.results[quizItem.id] === 'error'?'fa-times':'fa-check',
            classes[props.results[quizItem.id]]
          ]
          return (
            <li
              key={index}
            >
              <strong>{index +1}</strong>.&nbsp;
              {quizItem.question}
              <i className={cls.join(' ')} />
            </li>
          )
        })}
      </ul>
      <p> Right answers {successCount} out of {props.quiz.length}</p>
      <div>
        <button onClick={props.onRetry}>Try again</button>
      </div>
    </div>
  )
}

export default FinishQuiz;