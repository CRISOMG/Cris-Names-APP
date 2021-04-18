/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from '../store/actions';

import '../assets/styles/components/form.css';

import ProfileCard from './ProfileCard';

import Spinner from './Spinner';
import WarnErrorMessage from './WarnErrorMessage';

const ProfileForm = (props) => {
  const { profileId, isEdit, redirect } = props;
  const { loading, error } = props.request;
  const {
    getProfile, createProfile, updateProfile, deleteProfile,
  } = props;

  const [profile, setProfile] = useState({
    name: '',
    lastname: '',
  });

  const controller = new AbortController();
  const { signal } = controller;

  useEffect(() => {
    getProfile({
      isEdit,
      setProfile,
      profileId,
      signal,
    });

    return () => controller.abort();
  }, []);

  function handleInput(event) {
    setProfile({
      ...profile,
      [event.target.name]: event.target.value,
    });
  }
  return (
    <>
      {loading && <Spinner />}
      {!loading && !error && (
        <>
          <ProfileCard name={profile.name} lastname={profile.lastname} />
          <form className='form'>
            <div className='form__inputs'>
              <input value={profile.name} name='name' onChange={handleInput} placeholder='Name' />
              <input value={profile.lastname} name='lastname' onChange={handleInput} placeholder='Lastname' />
            </div>
            <div className='form__buttoms'>
              {isEdit ? (
                <>
                  <button type='button' className='form__update-buttom' onClick={() => updateProfile({ profileId, profile, redirect })}>
                    Update
                  </button>
                  <button type='button' className='form__delete-buttom' onClick={() => deleteProfile({ profileId, redirect })}>
                    Delete
                  </button>
                </>
              ) : (
                <button type='button' className='form__create-buttom' onClick={() => createProfile({ profile, redirect })}>
                  Send
                </button>
              )}
            </div>
          </form>
        </>
      )}
      {error && <WarnErrorMessage />}
    </>
  );
};

ProfileForm.propTypes = {
  profileId: PropTypes.string,
  isEdit: PropTypes.bool,
  redirect: PropTypes.func.isRequired,
};

ProfileForm.defaultProps = {
  profileId: '/',
  isEdit: false,
};

const mapStateToProps = ({ request }) => ({
  request,
});

const mapDispatchToProps = {
  ...actions.requestActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);
