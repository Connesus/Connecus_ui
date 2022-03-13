import React from 'react';

import Button from "../Button";

import './style.css';

const Navbar = () => (
    <div className='nav'>
        <div className='nav__logo'>LOGO</div>
        <Button type={'primary'} text={'Some Button!'}/>
    </div>
)

export default Navbar;