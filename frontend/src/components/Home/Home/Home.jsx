import React from 'react'
import Header from '../../Shared/Header/Header'
import Blog from '../Blog/Blog'
import ClinicAndSpecialities from '../ClinicAndSpecialities/ClinicAndSpecialities'
import Availabe from '../AvailableFeatures/Available'
import HeroSection from '../HeroSection/HeroSection'
import InfoPage from '../InfoPage/InfoPage'
import Service from '../Services/Service'
import Gallery from '../Gallery/Gallery'
import Footer from '../../Shared/Footer/Footer'

const Home = () => {
    return (
        <>
            <Header />
            <HeroSection />
            <InfoPage />
            <Service />
            <ClinicAndSpecialities />
            <Blog />
            <Availabe />
            <Gallery />
            <Footer />
        </>
    )
}

export default Home 