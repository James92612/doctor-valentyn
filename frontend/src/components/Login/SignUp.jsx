import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaCheck, FaEnvelope, FaLock, FaPhone, FaTimes, FaUser } from 'react-icons/fa'
import SocialSignUp from './SocialSignUp'
import Spinner from 'react-bootstrap/Spinner'
import swal from 'sweetalert'
import { message } from 'antd'

import { useDoctorSignUpMutation, usePatientSignUpMutation } from '../../redux/api/authApi'
import { createAcount } from '../../api/api_user'
import { GoogleLogin } from '@react-oauth/google'

// password regex
// ^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$
// At least one upper case English letter, (?=.*?[A-Z])
// At least one lower case English letter, (?=.*?[a-z])
// At least one digit, (?=.*?[0-9])
// At least one special character, (?=.*?[#?!@$%^&*-])
// Minimum eight in length .{8,} (with the anchors)

const SignUp = ({ setSignUp }) => {
    const [error, setError] = useState({})
    const [infoError, setInfoError] = useState('')
    const [loading, setLoading] = useState(false)
    const formField = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        mobile: ''
    }
    const [user, setUser] = useState(formField)
    const [userType, setUserType] = useState('patient')
    const [doctorSignUp, { data: dData, isSuccess: dIsSuccess, isError: dIsError, error: dError, isLoading: dIsLoading }] = useDoctorSignUpMutation()
    const [patientSignUp, { data: pData, isSuccess: pIsSuccess, isError: pIsError, error: pError, isLoading: pIsLoading }] = usePatientSignUpMutation()
    const [passwordValidation, setPasswordValidation] = useState({
        carLength: false,
        specailChar: false,
        upperLowerCase: false,
        numeric: false
    })

    const handleSignUpSuccess = () => {
        setLoading(false)
        setUser(formField)
    }

    const responseMessage = (response) => {
        console.log(response)
    }
    const errorMessage = (error) => {
        console.log(error)
    }

    useEffect(() => {
        // doctor account
        if (dIsError && dError) {
            message.error("Email Already Exist !!")
            setLoading(false)
        }

        if (!dIsError && dIsSuccess) {
            handleSignUpSuccess()
            setLoading(false)
            setLoading(false)
            swal({
                icon: 'success',
                text: `Successfully Account Created Please Verify Your email`,
                timer: 5000
            })
        }

        // Patient account
        if (pIsError && pError) {
            message.error("Email Already Exist !!")
            setLoading(false)
        }
        if (!pIsError && pIsSuccess) {
            handleSignUpSuccess()
            setLoading(false)
            setSignUp(false)
            swal({
                icon: 'success',
                text: `Successfully ${userType === 'doctor' ? 'Doctor' : 'Patient'} Account Created Please Login`,
                timer: 2000
            })
        }

    }, [dIsError, dError, pError, pIsError, , pIsLoading, dIsLoading, pData, dData, setSignUp, setLoading, dIsSuccess])

    const [emailError, setEmailError] = useState({
        emailError: false
    })

    const handleEmailError = (name, value) => {
        if (name === 'email') {
            setEmailError({
                emailError: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            })
        }
    }
    const hanldeValidation = (name, value) => {
        if (name === 'password') {
            setPasswordValidation({
                carLength: (value.length > 8),
                specailChar: /[ `!@#$%^&*()_+\-=[\]{} ':"\\|,.<>/?~]/.test(value),
                upperLowerCase: /^(?=.*[a-z])(?=.*[A-Z])/.test(value),
                numeric: /^(?=.*\d)/.test(value),
            })
        }
    }

    const hanldeOnChange = (e) => {
        let { name, value } = e.target
        hanldeValidation(name, value)
        handleEmailError(name, value)
        let isPassValid = true

        if (value === 'email') {
            isPassValid = /\S+@\S+\.\S+/.test(value)
        }
        if (value === 'password') {
            isPassValid = ((value.length > 8)
                && /[ `!@#$%^&*()_+\-=[\]{} ':"\\|,.<>/?~]/.test(value)
                && /^(?=.*[a-z])(?=.*[A-Z])/.test(value)
                && /^(?=.*\d)/.test(value))
        }
        if (isPassValid) {
            const newPass = { ...user }
            newPass[name] = value
            setUser(newPass)
        }
    }

    const handleUserTypeChange = (e) => {
        setUserType(e.target.value)
    }
    const hanldeOnSubmit = async (e) => {
        e.preventDefault()
        setLoading(false)
        createAcount(user).then((data) => {
            if (data.error) { message.success(data.error) }
            else {
                setSignUp(false)
            }
        })
    }

    return (
        <form className="sign-up-form" onSubmit={hanldeOnSubmit}>
            <h2 className="title">Sign </h2>
            <div className="input-field">
                <span className="fIcon"><FaUser /></span>
                <input placeholder="First Name" name="firstName" type="text" onChange={(e) => hanldeOnChange(e)} value={user.firstName} />
            </div>
            <div className="input-field">
                <span className="fIcon"><FaUser /></span>
                <input placeholder="Last Name" name="lastName" type="text" onChange={(e) => hanldeOnChange(e)} value={user.lastName} />
            </div>
            <div className="input-field">
                <span className="fIcon"><FaEnvelope /></span>
                <input placeholder="Email" name="email" type="email" onChange={(e) => hanldeOnChange(e)} value={user.email} />
            </div>
            <div className="input-field">
                <span className="fIcon"><FaLock /></span>
                <input type="password" name="password" placeholder="password" onChange={(e) => hanldeOnChange(e)} value={user.password} />
            </div>
            <div className="input-field">
                <span className="fIcon"><FaPhone /></span>
                <input type="text" name="mobile" placeholder="PhoneNumber" onChange={(e) => hanldeOnChange(e)} value={user.mobile} />
            </div>

            {error.length && <h6 className="text-danger text-center">{error}</h6>}
            {infoError && <h6 className="text-danger text-center">{infoError}</h6>} <br />
            <p>
                By signing up, you agree to our
                <Link to='/policy' target="_blank" color="secondary" href="https://userpilot.com/terms-of-use">Terms of Use </Link> and
                <Link to='/policy' target="_blank" color="secondary" href="https://userpilot.com/privacy-policy"> Privacy Policy</Link>.
            </p>
            <button type="submit"
                className="btn btn-primary btn-block mt-2 iBtn"
                disabled={
                    passwordValidation.carLength && passwordValidation.numeric && passwordValidation.upperLowerCase && passwordValidation.specailChar && emailError.emailError ? "" : true
                }
            >
                {loading ? <Spinner animation="border" variant="info" /> : "Sign Up"}
            </button>

            <div className="password-validatity mx-auto">

                <div style={emailError.emailError ? { color: "green" } : { color: "red" }}>
                    <p>{passwordValidation.numeric ? <FaCheck /> : <FaTimes />}
                        <span className="ms-2">Must Have Valid Email.</span></p>
                </div>

                <div style={passwordValidation.carLength ? { color: "green" } : { color: "red" }}>
                    <p>{passwordValidation.numeric ? <FaCheck /> : <FaTimes />}
                        <span className="ms-2">Password Must Have atlast 8 character.</span></p>
                </div>

                <div style={passwordValidation.specailChar ? { color: "green" } : { color: "red" }}>
                    <p>{passwordValidation.numeric ? <FaCheck /> : <FaTimes />}
                        <span className="ms-2">Password Must Have a special cracter.</span></p>
                </div>

                <div style={passwordValidation.upperLowerCase ? { color: "green" } : { color: "red" }}>
                    <p>{passwordValidation.numeric ? <FaCheck /> : <FaTimes />}
                        <span className="ms-2">Password Must Have uppercase and lower case.</span></p>
                </div>

                <div style={passwordValidation.numeric ? { color: "green" } : { color: "red" }}>
                    <p>{passwordValidation.numeric ? <FaCheck /> : <FaTimes />}
                        <span className="ms-2">Password Must Have Number.</span></p>
                </div>
            </div>

            <p className="social-text">Or Sign up with social account</p>
            <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
            <SocialSignUp />
        </form>

    )
}

export default SignUp 