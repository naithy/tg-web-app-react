import React from 'react';
import './Button.css';

const Button = (props) => {
    return (
        <div>
            <button {...props} className={'button ' + props.className}/>
        </div>
    );
};

export default Button;