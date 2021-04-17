/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import '../assets/styles/style.css';

import ProfileForm from '../components/ProfileForm';

const EditProfile = (props) => {
  const url = `https://crud-names.now.sh/api/${props.match.params.id}`;

  return (
    <section className='edit-profile'>
      <ProfileForm isEdit profileUrl={url} redirect={() => props.history.push('/')} />
    </section>
  );
};

export default EditProfile;
