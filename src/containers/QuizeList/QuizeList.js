import React from 'react';

import classes from './QuizList.module.css';
import { NavLink } from 'react-router-dom';

export default class QuizList extends React.Component {

renderQuizes = () => {
  return [1, 2, 3].map((quiz, index) => {
    return (
      <li
        key={index}
      >
        <NavLink to={'/quiz/' + quiz}>
          Quiz {quiz}
        </NavLink>
      </li>
    )
  })
}

  render() {
    return (
      <div className={classes.quizList}>
        <div>
        <h1>Quiz list</h1>

        <ul>
          {this.renderQuizes()}
        </ul>
        </div>
      </div>
    )
  }
}
