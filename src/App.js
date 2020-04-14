import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import Layout from './hoc/Layout/Layout'
import Quiz from './containers/Quiz/Quiz'
import Auth from './containers/Auth/Auth'; 
import QuizList from './containers/QuizeList/QuizeList';
import QuizCreator from './containers/QuizCreator/QuizCreator';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/auth' component={Auth}/>
        <Route path='/quiz-creator' component={QuizCreator}/>
        <Route path='/quiz/:id' component={Quiz}/>
        <Route path='/' component={QuizList}/>
      </Switch>
    </Layout>
  );
}

export default App;
