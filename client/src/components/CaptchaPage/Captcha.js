import React from 'react';
import RCG from 'react-captcha-generator';

const Captcha = props => {
    const { result } = props;
    return (
        <div className="captcha">
            <RCG result={result} />
        </div>
    );
}

export default Captcha;