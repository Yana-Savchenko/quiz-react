import axios from 'axios';

export default axios.create({
  baseURL: 'https://react-quiz-e5af4.firebaseio.com'
})