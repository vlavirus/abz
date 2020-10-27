import React from 'react';

import './introduction.scss';

const Introduction = () => {
    return(
        <section className="introduction">
            <h1 className="introduction__header">
                Test assignment for Frontend Developer position
            </h1>
            <div className="introduction__descr">
                We kindly remind you that your test assignment should be submitted as a link to github/bitbucket repository. <span className="introduction__descr_disable">Please be patient, we consider and respond to every application that meets minimum requirements. We look forward to your submission. Good luck! The photo has to scale in the banner area on the different screens</span> 
            </div>
            <button 
                onClick={() => {
                    window.location='#register'
                }}
                className="sing-up">Sing up now</button>
        </section>
    )
}

export default Introduction;