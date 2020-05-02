import React from 'react';

import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishQuiz from '../../components/FinishQuiz/FinishQuiz';
import Loader from '../../components/UI/Loader/Loader';
import { connect } from 'react-redux';
import { fetchQuizByID, quizAnswerClick, retryQuiz } from '../../redux/actions/quiz';

class Quiz extends React.Component {

  componentDidMount() {
    this.props.fetchQuizByID(this.props.match.params.id)
  }

  componentWillUnmount() {
    this.props.retryQuiz();
  }
  render() {
    console.log(this.props.isLoading, !this.props.quiz);
    
    return (
      <div className={classes.quiz}>
        <div className={classes.quizWrapper}>
          <h1>Quiz name</h1>
          {
            this.props.isLoading && !this.props.quiz
              ? <Loader />
              : this.props.isFinished
                ? <FinishQuiz
                  results={this.props.results}
                  quiz={this.props.quiz}
                  onRetry={this.props.retryQuiz}
                />
                : <ActiveQuiz
                  answers={this.props.quiz[this.props.activeQuestion].answers}
                  question={this.props.quiz[this.props.activeQuestion].question}
                  quizLength={this.props.quiz.length}
                  questionNumber={this.props.activeQuestion + 1}
                  onAnswerClick={this.props.quizAnswerClick}
                  state={this.props.answerState}
                />
          }

        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,
    isFinished: state.quiz.isFinished,
    results: state.quiz.results,
    isLoading: state.quiz.isQuizLoading,
    quiz: state.quiz.quiz,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizByID: id => dispatch(fetchQuizByID(id)),
    quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
    retryQuiz: () => dispatch(retryQuiz()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
