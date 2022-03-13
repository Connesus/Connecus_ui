import React from 'react';

import Button from "../Button";

import './style.css';

const Navbar = () => (
    <div className='nav'>
        <div className='nav__logo'>LOGO</div>

        <div className='nav__menu'>
            <div className='nav__menu-item'>Home</div>
            <div className='nav__menu-item'>Token</div>
            <div className='nav__menu-item'>Community</div>
            <div className='nav__menu-item'>Document</div>
        </div>

        <div className='nav__search'>
            <input type="text" placeholder='Search' className='nav__search-input'/>
        </div>

        <Button type={'primary'} text={'Some Button!'}/>
    </div>
)

export default Navbar;