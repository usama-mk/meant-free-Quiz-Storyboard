import React from 'react'
import logo from '../../assets/images/logo.png';
// const logo = require('../../assets/images/logo.png');
function CHeader({ networth='0', showNetWorth=true }) {
    return (
        <div className="c-header">
                    <img
                        src={logo}
                        alt=""
                        className="logo"
                        draggable="false"
                    />
                  
                <h4>
                    {showNetWorth && 'Net Worth: $'+networth }
                </h4>         
        </div>

    )
}

export default CHeader
