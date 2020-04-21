import React from 'react';
import axios from '../../axios/axios-quiz';

import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishQuiz from '../../components/FinishQuiz/FinishQuiz';
import Loader from '../../components/UI/Loader/Loader';

class Quiz extends React.Component {

  state = {
    activeQuestion: 0,
    answerState: null,
    isFinished: false,
    results: {},
    isLoading: true,
    quiz: [],
  }

  async componentDidMount() {
    try {
      const res = await axios.get(`/quizes/${this.props.match.params.id}.json`);
      const quiz = res.data;

      this.setState({
        quiz,
        isLoading: false,
      })

    } catch (error) {
      console.log(error);
    }
  }

  onAnswerClickHandler = (answerId) => {

    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];
      if (this.state.answerState[key] === 'success') {
        return;
      }
    }

    const question = this.state.quiz[this.state.activeQuestion];
    const results = this.state.results;

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success';
        this.setState({ results })

      }
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
      results[question.id] = 'error';
      this.setState({
        answerState: { [answerId]: 'error' },
        results
      })
    }

  }

  retryHandler = () => {
    this.setState({
      activeQuestion: 0,
      answerState: null,
      isFinished: false,
      results: {},
    })

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
            this.state.isLoading
              ? <Loader />
              : this.state.isFinished
                ? <FinishQuiz
                  results={this.state.results}
                  quiz={this.state.quiz}
                  onRetry={this.retryHandler}
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
