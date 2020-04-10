import React from 'react';

import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';

class Quiz extends React.Component {

  state = {
    quiz: [
      {
        question: 'Question 1',
        rightAnswerId: 2,
        answers: [
          { id: 1,
            text: 'Answer 1'},
          { id: 2,
            text: 'Answer 2'},
          { id: 3,
            text: 'Answer 3'},
          { id: 4,
            text: 'Answer 4'},
        ]
      }
    ],
  }

  onAnswerClickHandler = (answerId) => {
    console.log('AnswerId: ', answerId);
  }

  render() {
    return (
      <div className={classes.quiz}>
        <div className={classes.quizWrapper}>
          <h1>Quiz name</h1>
          <ActiveQuiz 
            answers={this.state.quiz[0].answers}
            question={this.state.quiz[0].question}
            onAnswerClick={this.onAnswerClickHandler}
          />
        </div>
      </div>
    )
  }
}

export default Quiz;
