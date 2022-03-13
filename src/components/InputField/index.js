import React from 'react';

import './style.css';

const InputField = ({label, type}) => {
    return (
        <div className='input-field'>
            <div className='input-label'>{label}</div>
            <input type={type} className='input-bar'/>
        </div>
    )
}

export default InputField;