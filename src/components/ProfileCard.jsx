import React from 'react';
import '../assets/styles/style.css';

const ProfileCard = ({ name = '', lastname = '' }) => (
  <section className='profile__card'>
    <div className='profile__details'>
      <h3 className=''>{`${name} ${lastname}`}</h3>
    </div>
  </section>
);

export default ProfileCard;
