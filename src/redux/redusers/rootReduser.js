import {combineReducers} from 'redux';

import quizReduser from './quiz';
import createReduser from './create';


export default combineReducers({
  quiz: quizReduser,
  create: createReduser,
})