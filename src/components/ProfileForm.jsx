/*
  eslint-disable
    import/no-unresolved,
    jsx-a11y/label-has-associated-control,
    react/destructuring-assignment,
    react/prop-types
*/

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from '@store/actions';

import '@styles/components/ProfileForm.css';

import Spinner from './Spinner';
import WarnErrorMessage from './WarnErrorMessage';
import ProfileCard from './ProfileCard';

const ProfileForm = (props) => {
  // Esto viene del Componente Padre
  const { profileId, isEdit, redirect } = props;
  // Este es el Estado
  const { request } = props;
  // Estas son las Actions CRUD
  const {
    getProfile, createProfile, updateProfile, deleteProfile,
  } = props;
  // Estas son las Action Request
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
        createProfile({ profile });
        redirect();
        break;
      case 'update':
        updateProfile({ profileId, profile });
        redirect();
        break;
      case 'delete':
        // eslint-disable-next-line no-case-declarations, no-alert, no-restricted-globals
        const c = confirm('Seguro que lo quieres eliminar?');
        if (c) {
          deleteProfile({ profileId });
          redirect();
        }
        break;

      default:
        break;
    }
  }
  return (
    <>
      {request.loading && <Spinner />}
      {request.error && !request.loading && <WarnErrorMessage handleTryFn={() => {}} />}
      {!request.loading && !request.error && (
        <>
          <ProfileCard name={profile.name} lastname={profile.lastname} />
          <form className='form'>
            <div className='form__inputs-container'>
              <label className='form__label'>
                <span>Name</span>
                <input className='form__input' maxLength='16' value={profile.name} name='name' onChange={handleInput} placeholder='Name' />
              </label>

              <label className='form__label'>
                <span>Lastname</span>
                <input className='form__input' maxLength='16' value={profile.lastname} name='lastname' onChange={handleInput} placeholder='Lastname' />
              </label>
            </div>
            <div className='form__buttons-container'>
              {isEdit ? (
                <>
                  <button className='form__button update' name='update' type='button' onClick={handleButtons}>
                    Update
                  </button>
                  <button className='form__button delete' name='delete' type='button' onClick={handleButtons}>
                    Delete
                  </button>
                </>
              ) : (
                <button className='form__button create' name='create' type='button' onClick={handleButtons}>
                  Send
                </button>
              )}
            </div>
          </form>
        </>
      )}
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
  ...actions.request,
  ...actions.crud,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);
