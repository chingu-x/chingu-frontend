import * as React from "react";
import BackBtn from './BackBtn';

const Error = ({ category, imgSrc, switchRenderedType }) => (
    <div className="bug-suggestion-box">
        <div className={`box-color color--${category}`}>
            <img className="box-icon" alt="icon" src={imgSrc} />
        </div>
        <div className="ticketbox-success">
            Well, this is embarassing.
            <br />
            <div className="ticketbox-subtext">
                We seem to have hit an error, <br /> so please try again later!
            </div>
            <BackBtn type="error" switchRenderedType={switchRenderedType}/>
        </div>
    </div>
);

export default Error;