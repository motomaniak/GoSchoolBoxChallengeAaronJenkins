import React from 'react';

const Button = ({onClick, value, label, cname}) => {
    return ( 
        <button 
            onClick={onClick}
            className={cname}
            value={value}
        >
            {label}
        </button>
    );
    
};

export default Button; 