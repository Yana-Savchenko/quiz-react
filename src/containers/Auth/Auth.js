import React from 'react';

import classes from './Auth.module.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';

export default class Auth extends React.Component {

  loginHandler = () => {

  }

  registerHandler = () => {

  }

  submitHandler = (e) => {
    e.prevenDefault();
  }

  render() {
    return (
      <div className={classes.auth}>
        <div>
          <h1>Authentication</h1>

          <form
            onSubmit={this.submitHandler}
            className={classes.authForm}
          >
            <Input
              label="Email"
            />
            <Input
              label="Password"
              errorMessage="test error"
            />

            <Button
              type="success"
              onclick={this.loginHandler}
            >
              Log in
            </Button>

            <Button
              type="primary"
              onclick={this.registerHandler}
            >
              Sign up
            </Button>
          </form>
        </div>
      </div>
    )
  }
}
