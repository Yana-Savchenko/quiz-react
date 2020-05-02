import {
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZ_SUCCESS,
  QUIZ_SET_STATE,
  FINISH_QUIZE,
  QUIZ_NEXT_QUESTION,
  QUIZ_RETRY
} from "../actions/actionTypes";

const initialState = {
  quizes: [],
  isLoading: true,
  isQuizLoading: true,
  error: null,
  activeQuestion: 0,
  answerState: null,
  isFinished: false,
  results: {},
  quiz: null,
}

export default function quizReduser(state = initialState, action) {
  switch (action.type) {
    case FETCH_QUIZES_START:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_QUIZES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        quizes: action.quizes,
      };
    case FETCH_QUIZES_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case FETCH_QUIZ_SUCCESS:
      return {
        ...state,
        isQuizLoading: false,
        quiz: action.quiz,
      };
    case QUIZ_SET_STATE:
      return {
        ...state,
        answerState: action.answerState,
        results: action.results,
      };
    case FINISH_QUIZE:
      return {
        ...state,
        isFinished: true,
      };
    case QUIZ_NEXT_QUESTION:
      return {
        ...state,
        answerState: null,
        activeQuestion: action.number,
      };
    case QUIZ_RETRY:
      return {
        ...state,
        activeQuestion: 0,
        answerState: null,
        isFinished: false,
        results: {},
      }
    default:
      return state;
  }
}