import React from 'react';
import axios from 'axios';

import classes from './Auth.module.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';

export default class Auth extends React.Component {

  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Email is invalid',
        valid: false,
        touched: false,
        validators: {
          required: true,
          email: true,
        },
      },
      password: {
        value: '',
        type: 'password',
        label: 'Password',
        errorMessage: 'Password is invalid',
        valid: false,
        touched: false,
        validators: {
          required: true,
          minLength: 6,
        },
      }
    }
  }

  loginHandler = async () => {
    const loginData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true,
    }
    try {
      const res = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDyA-aecvDqV5HfBc49Os84hEbJdBgKX7Q', loginData);
      console.log('login res: ', res);
    } catch (error) {
      console.log(error);
    }
  }

  registerHandler = async () => {
    console.log('!!!');
    
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true,
    }
    try {
      const res = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDyA-aecvDqV5HfBc49Os84hEbJdBgKX7Q', authData);
      console.log('auth res: ', res);
    } catch (error) {
      console.log(error);
    }
  }

  submitHandler = (e) => {
    e.preventDefault();
  }

  validateControl = (value, validators) => {
    if (!validators) {
      return true;
    }

    let isValid = true;

    if (validators.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (validators.email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      isValid = re.test(String(value).toLowerCase()) && isValid;
    }

    if (validators.minLength) {
      isValid = value.length >= validators.minLength && isValid;
    }

    return isValid;
  }

  onChangeHandler = (e, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.value = e.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validators);

    formControls[controlName] = control;

    let isFormValid = true;

    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid;
    })

    this.setState({ formControls, isFormValid })
  }
  renderInputs = () => {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          touched={control.touched}
          valid={control.valid}
          label={control.label}
          shouldValidate={!!control.validators}
          errorMessage={control.errorMessage}
          onChange={(event) => this.onChangeHandler(event, controlName)}
        />
      )
    })
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
            {this.renderInputs()}

            <Button
              type="success"
              onClick={this.loginHandler}
              disabled={!this.state.isFormValid}
            >
              Log in
            </Button>

            <Button
              type="primary"
              onClick={this.registerHandler}
              disabled={!this.state.isFormValid}
            >
              Sign up
            </Button>
          </form>
        </div>
      </div>
    )
  }
}
