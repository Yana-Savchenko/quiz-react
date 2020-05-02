import axios from '../../axios/axios-quiz';
import {
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZ_SUCCESS,
  QUIZ_SET_STATE,
  FINISH_QUIZE,
  QUIZ_NEXT_QUESTION,
  QUIZ_RETRY
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
      console.log('quize: ',quiz);
      
      dispatch(fetchQuizSuccess(quiz));
    } catch (error) {
      console.log('quize: ');
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

function finishQuiz() {
  return {
    type: FINISH_QUIZE,
  }
}

function quizeSetState(answerState, results) {
  return {
    type: QUIZ_SET_STATE,
    answerState,
    results,
  }
}

function quizNextQuestion(number) {
  return {
    type: QUIZ_NEXT_QUESTION,
    number
  }
}

function  isQuizFinished(state) {
  return state.activeQuestion + 1 === state.quiz.length;
}

export function quizAnswerClick(answerId) {
  return (dispatch, getState) => {
    const state = getState().quiz;
    console.log('state: ', state);
    
    if (state.answerState) {
      const key = Object.keys(state.answerState)[0];
      if (state.answerState[key] === 'success') {
        return;
      }
    }

    const question = state.quiz[state.activeQuestion];
    const results = state.results;

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success';
      }
      dispatch(quizeSetState({ [answerId]: 'success' }, results));

      const timeout = window.setTimeout(() => {
        if (isQuizFinished(state)) {
          dispatch(finishQuiz())
        } else {
          dispatch(quizNextQuestion(state.activeQuestion + 1))
        }
        window.clearTimeout(timeout);
      }, 1000)

    } else {
      results[question.id] = 'error';
      dispatch(quizeSetState({ [answerId]: 'error' }, results))
    }
  }
}

export function retryQuiz() {
  return {
    type: QUIZ_RETRY,
  }
}