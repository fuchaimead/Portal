import React from 'react';
import axios from 'axios';
import { setFlash } from '../actions/flash';
import { setHeaders } from '../actions/headers';

const login = user => {
  return { type: 'LOGIN', user };
};

const logout = () => {
  return { type: 'LOGOUT' };
};

export const registerUser = (email, password, passwordConfirmation, firstName, lastName, history) => {
  return dispatch => {
    axios.post('/api/auth', { email, password, firstName, lastName, password_confirmation: passwordConfirmation })
      .then(res => {
        const { data: { data: user }, headers } = res;
        dispatch(setHeaders(headers));
        dispatch(login(user));
        history.push('/');
      })
      .catch(res => {
        const errors = res.response.data.errors ? res.response.data.errors : { full_messages: ['Something went wrong'] }
        const messages =
          errors.full_messages.map((message,i) =>
            <div key={i}>{message}</div>);
        const { headers } = res;
        dispatch(setFlash(messages, 'red'));
        dispatch(setHeaders(headers));
      });
  };
};

export const handleLogout = history => {
  return dispatch => {
    axios.delete('/api/auth/sign_out')
      .then(res => {
        const { headers } = res;
        dispatch(logout());
        dispatch(setFlash('Logged out successfully!', 'green'));
        dispatch(setHeaders(headers));
        history.push('/login');
      })
      .catch(res => {
        const errors = res.response.data.errors ? res.response.data.errors : { full_messages: ['Something went wrong'] }
        const messages =
          errors.full_messages.map((message,i) =>
            <div key={i}>{message}</div>);
        const { headers } = res;
        dispatch(setFlash(messages, 'red'));
        dispatch(setHeaders(headers));
      });
  };
};

export const handleLogin = (email, password, history) => {
  return dispatch => {
    axios.post('/api/auth/sign_in', { email, password })
      .then(res => {
        const { data: { data: user }, headers } = res;
        dispatch(setHeaders(headers));
        dispatch(login(user));
        dispatch(setFlash('Logged in successfully!', 'green'));
        history.push('/');
      })
      .catch(res => {
        let errors = res.response.data.errors ? res.response.data.errors : { full_messages: ['Something went wrong'] }
        if (Array.isArray(errors))
          errors = { full_messages: errors }
        const messages =
          errors.full_messages.map((message,i) =>
            <div key={i}>{message}</div>);
        const { headers } = res;
        dispatch(setFlash(messages, 'red'));
        dispatch(setHeaders(headers));
      });
  };
};

export const validateToken = (callBack = () => {}) => {
  return dispatch => {
    dispatch({ type: 'VALIDATE_TOKEN' });
    const headers = axios.defaults.headers.common;
    axios.get('/api/auth/validate_token', headers)
      .then(res => {
        const user = res.data.data;
        dispatch(setHeaders(res.headers));
        dispatch(login(user));
      })
      .catch(() => callBack());
  };
};
