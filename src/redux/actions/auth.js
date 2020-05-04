import axios from 'axios';
import { AUTH_SUCCESS, AUTH_LOGOUT } from './actionTypes';

export function auth(email, password, isLogin) {
  return async dispatch => {

    const authData = {
      email,
      password,
      returnSecureToken: true,
    }

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDyA-aecvDqV5HfBc49Os84hEbJdBgKX7Q';

    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDyA-aecvDqV5HfBc49Os84hEbJdBgKX7Q'
    }

    const res = await axios.post(url, authData);
    const data = res.data;

    const expirationDta = new Date(new Date().getTime() + data.expiresIn * 1000);

    localStorage.setItem('token', data.idToken);
    localStorage.setItem('userId', data.localId);
    localStorage.setItem('expirationDate', expirationDta);

    dispatch(authSuccess(data.idToken));
    dispatch(autoLogut(data.expiresIn));
  }
}

function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token,
  }
}

function autoLogut(time) {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, time * 1000)
  }
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('expirationDate');
  return {
    type: AUTH_LOGOUT,
  }
}

export function autoLogin() {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))

      if (expirationDate <= new Date()) {
        dispatch(logout())
      } else {
        dispatch(authSuccess(token));
        dispatch(autoLogut((expirationDate.getTime() - new Date().getTime()) / 1000));
      }
    }
  }
}