import React from 'react';

import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishQuiz from '../../components/FinishQuiz/FinishQuiz';

class Quiz extends React.Component {

  state = {
    activeQuestion: 0,
    answerState: null,
    isFinished: true,
    quiz: [
      {
        id: 1,
        question: 'Question 1',
        rightAnswerId: 2,
        answers: [
          {
            id: 1,
            text: 'Answer 1'
          },
          {
            id: 2,
            text: 'Answer 2'
          },
          {
            id: 3,
            text: 'Answer 3'
          },
          {
            id: 4,
            text: 'Answer 4'
          },
        ]
      },
      {
        id: 2,
        question: 'Question 2',
        rightAnswerId: 3,
        answers: [
          {
            id: 1,
            text: 'Answer 1'
          },
          {
            id: 2,
            text: 'Answer 2'
          },
          {
            id: 3,
            text: 'Answer 3'
          },
          {
            id: 4,
            text: 'Answer 4'
          },
        ]
      },
    ],
  }

  onAnswerClickHandler = (answerId) => {

    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];
      if (this.state.answerState[key] === 'success') {
        return;
      }
    }

    const question = this.state.quiz[this.state.activeQuestion];

    if (question.rightAnswerId === answerId) {
      this.setState({
        answerState: { [answerId]: 'success' }
      })

      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({ isFinished: true });
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null,
          })
        }
        window.clearTimeout(timeout);
      }, 1000)

    } else {
      this.setState({
        answerState: { [answerId]: 'error' }
      })
    }

  }

  isQuizFinished = () => {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  }
  render() {
    return (
      <div className={classes.quiz}>
        <div className={classes.quizWrapper}>
          <h1>Quiz name</h1>

          {
            this.state.isFinished
              ? <FinishQuiz

              />
              : <ActiveQuiz
                answers={this.state.quiz[this.state.activeQuestion].answers}
                question={this.state.quiz[this.state.activeQuestion].question}
                quizLength={this.state.quiz.length}
                questionNumber={this.state.activeQuestion + 1}
                onAnswerClick={this.onAnswerClickHandler}
                state={this.state.answerState}
              />
          }

        </div>
      </div>
    )
  }
}

export default Quiz;
