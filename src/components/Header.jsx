/* eslint-disable import/no-unresolved */
import React from 'react';
import { Link } from 'react-router-dom';
import '@styles/components/Header.css';

const Header = () => (
  <header className='header'>
    <Link to='/'>
      <h1 className='header__title'>HOME</h1>
    </Link>
    <nav className='header__navbar'>
      <Link to='/create'>
        <button type='button' className='header__buttonEdit'>Create</button>
      </Link>
    </nav>
  </header>
);

export default Header;
