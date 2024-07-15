import React from 'react'
import './index.css'
import { heroBg } from '../../../images'

const HeroSection = () => {
    return (
        <section id="hero" className="d-flex align-items-center" style={{ backgroundImage: `url(${heroBg})` }}>
            <div className="container">
                <small> Your Most Trusted</small>
                <h1>Beautiful and Gently Images <br />Infomation Partner</h1>
                <p>
                    This is so simple you already know how to use it. <br />
                    We are a cloud-based mobile and desktop messaging app with a focus on security and speed.
                </p>
            </div>
        </section>
    )
}
export default HeroSection 