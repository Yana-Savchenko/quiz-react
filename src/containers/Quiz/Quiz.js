import React from 'react';

import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';

class Quiz extends React.Component {

  state = {
    activeQuestion: 0,
    quiz: [
      {
        id: 1,
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
      },
      {
        id: 2,
        question: 'Question 2',
        rightAnswerId: 3,
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
      },
    ],
  }

  onAnswerClickHandler = (answerId) => {
    console.log('AnswerId: ', answerId);
    this.setState({
      activeQuestion: this.state.activeQuestion + 1,
    })
  }

  render() {
    return (
      <div className={classes.quiz}>
        <div className={classes.quizWrapper}>
          <h1>Quiz name</h1>
          <ActiveQuiz 
            answers={this.state.quiz[this.state.activeQuestion].answers}
            question={this.state.quiz[this.state.activeQuestion].question}
            quizLength={this.state.quiz.length}
            questionNumber={this.state.activeQuestion+1}
            onAnswerClick={this.onAnswerClickHandler}
          />
        </div>
      </div>
    )
  }
}

export default Quiz;
