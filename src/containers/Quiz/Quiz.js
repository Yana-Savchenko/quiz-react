import React from 'react';

import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';

class Quiz extends React.Component {

  state = {
    quiz: [
      {
        answers: [
          {text: 'Question 1'},
          {text: 'Question 2'},
          {text: 'Question 3'},
          {text: 'Question 4'},
        ]
      }
    ],
  }

  render() {
    return (
      <div className={classes.quiz}>
        <div className={classes.quizWrapper}>
          <h1>Quiz name</h1>
          <ActiveQuiz 
            answers={this.state.quiz[0].answers}
          />
        </div>
      </div>
    )
  }
}

export default Quiz;
