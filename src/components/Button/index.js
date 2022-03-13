import React from 'react';

import './style.css';

const Button = ({type, text}) => (
    <button className={`button ${type}`}>{text}</button>
)

export default Button;