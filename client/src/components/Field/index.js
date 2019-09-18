import React, { Fragment } from 'react';

export const myInput = props => {
    const { input, type, placeholder, meta } = props;
    return (
        <Fragment>
            <input className='input-form' {...input} type={type} placeholder={placeholder} />
            {meta.error &&
                meta.touched &&
                <div className='validate-errors'>
                    {meta.error}
                </div>}
        </Fragment>
    );
};