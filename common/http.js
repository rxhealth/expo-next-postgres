import * as Constants from '../common/constants';

const requestHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const postById = ({ id }) => {
  return fetch(`${Constants.routes.api}/posts/${id}`);
};

export const posts = () => {
  return fetch(`${Constants.routes.api}/posts`);
};

export const postPublish = ({ content, title }) => {
  const options = {
    method: 'POST',
    credentials: 'include',
    headers: requestHeaders,
    body: JSON.stringify({
      content,
      title,
    }),
  };

  return fetch(`${Constants.routes.api}/posts`, options);
};

export const postDelete = ({ postId }) => {
  const options = {
    method: 'DELETE',
    headers: requestHeaders,
    credentials: 'include',
  };

  return fetch(`${Constants.routes.api}/posts/${postId}`, options);
};

export const comments = () => {
  return fetch(`${Constants.routes.api}/comments`);
};

export const commentDelete = ({ commentId, postId }) => {
  const options = {
    method: 'DELETE',
    headers: requestHeaders,
    credentials: 'include',
  };

  return fetch(
    `${Constants.routes.api}/posts/${postId}/comments/${commentId}`,
    options
  );
};

export const commentPublish = ({ postId, content }) => {
  const options = {
    method: 'POST',
    headers: requestHeaders,
    credentials: 'include',
    body: JSON.stringify({
      postId,
      content,
    }),
  };

  return fetch(`${Constants.routes.api}/comments`, options);
};

export const logOut = () => {
  const options = {
    method: 'POST',
    credentials: 'include',
    headers: requestHeaders,
  };

  return fetch(`${Constants.routes.api}/logout`, options);
};

export const logIn = ({ username, password }) => {
  const options = {
    method: 'POST',
    headers: requestHeaders,
    credentials: 'include',
    body: JSON.stringify({
      username: username.toLowerCase(),
      password,
    }),
  };

  return fetch(`${Constants.routes.api}/login`, options);
};

export const signUp = ({ username, password, confirm }) => {
  const options = {
    method: 'POST',
    headers: requestHeaders,
    credentials: 'include',
    body: JSON.stringify({
      username: username.toLowerCase(),
      password: password,
      verify: confirm,
    }),
  };

  return fetch(`${Constants.routes.api}/signup`, options);
};

export const checkAuth = () => {
  return fetch(`${Constants.routes.api}/authenticated`);
};
