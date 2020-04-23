import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import classes from './QuizList.module.css';
import Loader from '../../components/UI/Loader/Loader';
import { fetchQuizes } from '../../redux/actions/quiz'

class QuizList extends React.Component {

  componentDidMount() {
    this.props.fetchQuizes();
  }

  renderQuizes = () => {
    return this.props.quizes.map(quiz => {
      return (
        <li
          key={quiz.id}
        >
          <NavLink to={'/quiz/' + quiz.id}>
            {quiz.name}
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

          {
            this.props.isLoading && this.props.quizes.length
              ? <Loader />
              : <ul>
                {this.renderQuizes()}
              </ul>
          }

        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    quizes: state.quiz.quizes,
    isLoading: state.quiz.isLoading,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    fetchQuizes: () => dispatch(fetchQuizes())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);