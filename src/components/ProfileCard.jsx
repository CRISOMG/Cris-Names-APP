/* eslint-disable import/no-unresolved */
import React from 'react';
import '@styles/components/ProfileCard.css';

const ProfileCard = ({ name = '', lastname = '' }) => (
  <section className='profile__card'>
    <div className='profile__detail-container'>
      <h3 className='profile__detail'>{`${name} ${lastname}`}</h3>
    </div>
  </section>
);

export default ProfileCard;
