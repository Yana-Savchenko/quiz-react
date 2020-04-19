import React from 'react';
import axios from 'axios';

import classes from './QuizList.module.css';
import { NavLink } from 'react-router-dom';
import Loader from '../../components/UI/Loader/Loader';

export default class QuizList extends React.Component {

  state = {
    quizes: [],
    isLoading: true,
  };

  async  componentDidMount() {
    try {

      const quizes = [];
      const res = await axios.get('https://react-quiz-e5af4.firebaseio.com/quizes.json');

      Object.keys(res.data).forEach((key, index) => {
        quizes.push(
          {
            id: key,
            name: `Test #${index + 1}`,
          }
        )
      })

      this.setState({ quizes, isLoading: false });

    } catch (error) {
      console.log(error);
    }

  }

  renderQuizes = () => {
    return this.state.quizes.map(quiz => {
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
            this.state.isLoading
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
