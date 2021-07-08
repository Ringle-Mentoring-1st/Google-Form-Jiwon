import React, {useState} from 'react';
import classNames from 'classnames'
import {RiFileTextFill} from 'react-icons/ri'
import "./style.css"

function FormHeader() {
    const [active, setActive] = useState(false);

    return (
        <div className="form-header-container">
            <div className="form-header-top">
                <div className="form-header-left">
                    <div className="form-logo-icon-wrapper">
                        <div className={classNames("form-logo", {"active": active})}
                             onClick={e => setActive(true)} onBlur={e => setActive(false)}>
                            <RiFileTextFill size={40} color={`rgb(103, 58, 183)`}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormHeader;