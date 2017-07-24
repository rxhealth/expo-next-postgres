import * as HTTP from '../common/http';

export const logOut = ({ navigation }) => {
  return async dispatch => {
    await HTTP.logOut();

    dispatch({
      type: 'UPDATE_KEY_VALUES',
      data: {
        viewer: null,
      },
    });
  };
};

export const logIn = ({ data, navigation, onFailure = () => {} }) => {
  return async dispatch => {
    const response = await HTTP.logIn(data);

    if (response.status === 200) {
      const viewer = await response.json();

      return dispatch({
        type: 'UPDATE_KEY_VALUES',
        data: { viewer },
      });
    }

    onFailure();
  };
};

export const signUp = ({ data, navigation, onFailure = () => {} }) => {
  return async dispatch => {
    const response = await HTTP.signUp(data);

    if (response.status === 200) {
      const viewer = await response.json();

      return dispatch({
        type: 'UPDATE_KEY_VALUES',
        data: { viewer },
      });
    }

    onFailure();
  };
};
