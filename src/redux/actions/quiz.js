import axios from '../../axios/axios-quiz';
import {
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZ_SUCCESS
} from './actionTypes';

export function fetchQuizes() {
  return async dispatch => {
    dispatch(fetchQuizesStart())
    try {

      const quizes = [];
      const res = await axios.get('/quizes.json');

      Object.keys(res.data).forEach((key, index) => {
        quizes.push(
          {
            id: key,
            name: `Test #${index + 1}`,
          }
        )
      })

      dispatch(fetchQuizesSuccess(quizes))

    } catch (error) {
      fetchQuizesError(error);
    }
  }
}

export function fetchQuizByID(quizId) {
  return async dispatch => {
    dispatch(fetchQuizesStart())

    try {
      const res = await axios.get(`/quizes/${quizId}.json`);
      const quiz = res.data;

      dispatch(fetchQuizSuccess(quiz));
    } catch (error) {
      dispatch(fetchQuizesError(error));
    }
  }
}

function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz
  }
}

function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START
  }
}

function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes
  }
}

function fetchQuizesError(error) {
  return {
    type: FETCH_QUIZES_ERROR,
    error
  }
}