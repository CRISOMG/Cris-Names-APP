import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/components/header.css';

const Header = () => (
  <header className='header'>
    <Link to='/'>
      <h1 className='header__title'>HOME</h1>
    </Link>
    <nav className='header__navbar'>
      <Link to='/create'>
        <button className='header__buttonEdit'>Create</button>
      </Link>
    </nav>
  </header>
);

export default Header;
