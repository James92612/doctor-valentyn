import React, { useState } from 'react'
import { FaFacebook, FaGoogle } from 'react-icons/fa'
import GoogleSignIn from './GoogleSignin'

const SocialSignUp = () => {
    const [error] = useState({})
    const handleGoogleSignIn = () => {
    }


    return (
        <div>
            <div className="social-media">
                {/* <div className="social-icon" onClick={handleGoogleSignIn}>
                    <GoogleSignIn />
                </div> */}
                <div className="social-icon" onClick={handleGoogleSignIn}>
                    <FaGoogle />
                </div>
                <div className="social-icon">
                    <FaFacebook />
                </div>
            </div>
            {error.length && <h6 className="text-danger text-center p-2">{error}</h6>}

        </div>
    )
}

export default SocialSignUp 