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

const API = NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://cris-names-api.herokuapp.com';

// eslint-disable-next-line no-unused-vars
export const fetchProfiles = ({ signal }) => (dispatch, getState) => {
  if (getState().request.data) return;

  requestHandler(async () => {
    const res = await fetch(API, { signal });
    const d = await res.json();
    dispatch(setData(d));
  }, dispatch);
};

export const getProfile = (props) => (dispatch) => {
  const { isEdit, setProfile, profileUrl, signal } = props;
  if (isEdit) {
    requestHandler(async () => {
      const res = await fetch(profileUrl, { signal });
      const data = await res.json();
      setProfile({
        name: data.name,
        lastname: data.lastname,
      });
    }, dispatch);
  }
};

export const createProfile = ({
  profile,
  redirect,
  // eslint-disable-next-line no-unused-vars
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
    const d = await res.json();
    dispatch(setData([...d]));

    redirect();
  }, dispatch);
};

export const updateProfile = ({ profileUrl, profile, redirect }) => (dispatch) => {
  requestHandler(async () => {
    await fetch(profileUrl, {
      mode: 'cors',
      method: 'PUT',
      body: JSON.stringify(profile),
      headers: {
        'content-type': 'application/json',
      },
    });
    redirect();
  }, dispatch);
};

export const deleteProfile = ({ profileUrl, redirect }) => (dispatch) => {
  requestHandler(async () => {
    await fetch(profileUrl, {
      method: 'DELETE',
    });
    redirect();
  }, dispatch);
};
