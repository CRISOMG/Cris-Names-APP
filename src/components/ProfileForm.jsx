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
  const { setLoading } = props;

  const [profile, setProfile] = useState({
    name: '',
    lastname: '',
  });

  const controller = new AbortController();

  useEffect(() => {
    if (isEdit) {
      getProfile({
        isEdit,
        setProfile,
        profileId,
        ...controller.signal,
      });
      return () => controller.abort();
    }
    setLoading(false);
    return () => {};
  }, []);

  function handleInput(event) {
    setProfile({
      ...profile,
      [event.target.name]: event.target.value,
    });
  }
  function handleButtons(event) {
    const { name } = event.target;
    switch (name) {
      case 'create':
        createProfile({ profile, redirect });
        break;
      case 'update':
        updateProfile({ profileId, profile, redirect });
        break;
      case 'delete':
        deleteProfile({ profileId, redirect });
        break;

      default:
        break;
    }
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
                  <button type='button' name='update' className='form__update-buttom' onClick={handleButtons}>
                    Update
                  </button>
                  <button type='button' name='delete' className='form__delete-buttom' onClick={handleButtons}>
                    Delete
                  </button>
                </>
              ) : (
                <button type='button' name='create' className='form__create-buttom' onClick={handleButtons}>
                  Send
                </button>
              )}
            </div>
          </form>
        </>
      )}
      {error && <WarnErrorMessage handleTryFn={() => {}} />}
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
