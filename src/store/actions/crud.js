/* eslint-disable no-underscore-dangle */
import * as request from './request';

async function requestHandler(fn, dispatch) {
  try {
    dispatch(request.setLoading(true));
    await fn();
    dispatch(request.setLoading(false));
    dispatch(request.setError(null));
  } catch (err) {
    dispatch(request.setLoading(false));
    dispatch(request.setError(err));
  }
}

const URL = process.env.API_URL;

export const fetchProfiles = ({ signal }) => (dispatch, getState) => {
  if (getState().request.data) return;

  requestHandler(async () => {
    const res = await fetch(URL, { mode: 'cors', signal });
    const d = await res.json();
    dispatch(request.setData(d));
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

      if (profileFromState) {
        setProfile({
          name: profileFromState.name,
          lastname: profileFromState.lastname,
        });
      }
    } else {
      requestHandler(async () => {
        const res = await fetch(`${URL}/${profileId}`, { mode: 'cors', signal });
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
}) => (dispatch, getState) => {
  requestHandler(async () => {
    const res = await fetch(URL, {
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
    dispatch(request.setData(newState));
  }, dispatch);
};

export const updateProfile = ({ profileId, profile }) => (dispatch, getState) => {
  requestHandler(async () => {
    await fetch(`${URL}/${profileId}`, {
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
    dispatch(request.setData(newState));
  }, dispatch);
};

export const deleteProfile = ({ profileId }) => (dispatch, getState) => {
  requestHandler(async () => {
    await fetch(`${URL}/${profileId}`, {
      mode: 'cors',
      method: 'DELETE',
    });
    const newState = getState().request.data.filter((profile) => profile._id !== profileId);
    dispatch(request.setData(newState));
  }, dispatch);
};
