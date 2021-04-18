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

async function requestHandler(fn, dispatch) {
  try {
    dispatch(setLoading(true));
    await fn();
    dispatch(setLoading(false));
    dispatch(setError(null));
  } catch (err) {
    dispatch(setLoading(false));
    dispatch(setError(err));
  }
}

const API = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api' : 'https://cris-names-api.herokuapp.com/api';

export const fetchProfiles = ({ signal }) => (dispatch, getState) => {
  if (getState().request.data) return;

  requestHandler(async () => {
    const res = await fetch(API, { mode: 'cors', signal });
    const d = await res.json();
    dispatch(setData(d));
  }, dispatch);
};

export const getProfile = (props) => (dispatch, getState) => {
  const {
    isEdit, setProfile, profileId, signal,
  } = props;
  if (isEdit) {
    const currentState = getState().request.data;
    if (currentState) {
      const profileFromState = currentState.find((profile) => profile._id === profileId);
      setProfile({
        name: profileFromState.name,
        lastname: profileFromState.lastname,
      });
    } else {
      requestHandler(async () => {
        const res = await fetch(`${API}/${profileId}`, { mode: 'cors', signal });
        const data = await res.json();
        setProfile({
          name: data.name,
          lastname: data.lastname,
        });
      }, dispatch);
    }
  }
};

export const createProfile = ({
  profile,
  redirect,
}) => (dispatch, getState) => {
  requestHandler(async () => {
    const res = await fetch(API, {
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify(profile),
      headers: {
        'content-type': 'application/json',
      },
    });
    const id = await res.json();
    const profileCreated = {
      _id: id,
      ...profile,
    };
    const newState = [
      ...getState().request.data,
      profileCreated,
    ];
    dispatch(setData(newState));

    redirect();
  }, dispatch);
};

export const updateProfile = ({ profileId, profile, redirect }) => (dispatch, getState) => {
  requestHandler(async () => {
    await fetch(`${API}/${profileId}`, {
      mode: 'cors',
      method: 'PUT',
      body: JSON.stringify(profile),
      headers: {
        'content-type': 'application/json',
      },
    });
    const newState = getState().request.data.map((profileFromState) => {
      if (profileFromState._id === profileId) {
        return {
          ...profileFromState,
          ...profile,
        };
      }
      return profileFromState;
    });
    dispatch(setData(newState));
    redirect();
  }, dispatch);
};

export const deleteProfile = ({ profileId, redirect }) => (dispatch, getState) => {
  requestHandler(async () => {
    await fetch(`${API}/${profileId}`, {
      mode: 'cors',
      method: 'DELETE',
    });
    const newState = getState().request.data.filter((profile) => profile._id !== profileId);
    dispatch(setData(newState));
    redirect();
  }, dispatch);
};
