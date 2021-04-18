/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import '../assets/styles/style.css';

import ProfileForm from '../components/ProfileForm';

const EditProfile = (props) => (
  <section className='edit-profile'>
    <ProfileForm isEdit profileId={props.match.params.id} redirect={() => props.history.push('/')} />
  </section>
);

export default EditProfile;
