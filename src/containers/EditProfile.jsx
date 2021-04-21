/* eslint-disable react/prop-types, react/destructuring-assignment */
import React from 'react';

import ProfileForm from '../components/ProfileForm';

const EditProfile = (props) => (
  <section className='edit-profile'>
    <ProfileForm isEdit profileId={props.match.params.id} redirect={() => props.history.push('/')} />
  </section>
);

export default EditProfile;
