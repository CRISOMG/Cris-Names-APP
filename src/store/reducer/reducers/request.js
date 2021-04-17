import * as types from '../../types';

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case types.DATA:
      return {
        ...state,
        data: action.payload,
      };
    case types.ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
