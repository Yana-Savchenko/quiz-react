import { FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS, FETCH_QUIZES_ERROR, FETCH_QUIZ_SUCCESS } from "../actions/actionTypes";

const initialState = {
  quizes: [],
  isLoading: true,
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
        isLoading: false,
        quiz: action.quiz,
      }
    default:
      return state;
  }
}