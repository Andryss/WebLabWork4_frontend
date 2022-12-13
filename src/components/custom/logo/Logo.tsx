import React from 'react';
import "./Logo.css";

export interface LogoProperties {
    size?: number
}

const Logo = (props: LogoProperties) => {
    const finalSize = props.size ? props.size : 100;

    return (
        <img className="logo"
            src="/pictures/cookie.png"
            alt="LOGO"

            width={finalSize}
            height={finalSize}
        />
    );
};

export default Logo;