import { SET_USER } from './constants';

const state = {
  email: '',
  isAuth: false,
};

const reducer = (store, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default reducer;
