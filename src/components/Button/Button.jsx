import React from 'react';

const Button = (props) => {
    return (
        <div>
            <button> {...props} className={'button ' + props.className}</button>
        </div>
    );
};

export default Button;