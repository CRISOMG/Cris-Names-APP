/* eslint-disable no-underscore-dangle */
import * as types from '../types';

export const setLoading = (payload) => ({
  type: types.LOADING,
  payload,
});

export const setData = (payload) => ({
  type: types.DATA,
  payload,
});
export const setError = (payload) => ({
  type: types.ERROR,
  payload,
});
