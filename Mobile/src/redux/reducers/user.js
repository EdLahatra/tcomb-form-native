import { LOGIN } from '../actions/user';

const initialState = {
  isAuthenticated: false,
  info: null,
  data: {
    loading : true,
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
      };
    case 'GET_USER_INFO':
      return {
        ...state,
        info: action.info,
        data: {
          loading: false
        }
      };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
};
