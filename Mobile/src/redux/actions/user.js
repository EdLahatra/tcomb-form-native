import { AsyncStorage } from 'react-native';

export const LOGIN = 'LOGIN';

export function login(value) {
  return {
    type: LOGIN,
    value,
  };
}

export function getUserInfo(info) {
  return {
    type: 'GET_USER_INFO',
    info,
  };
}

export function logout() {
  return async (dispatch) => {
    try {
      await AsyncStorage.removeItem('@eosole');

      return dispatch({
        type: 'LOGOUT',
      });
    } catch (error) {
      throw error;
    }
  };
}
