import React from 'react'
import Hero from '../components/Hero'
import TopMeet from '../components/TopMeet'
import Restaurants from '../components/Restaurants'
import NavBar from '../components/NavBar'

const Home = () => {
    return (
        <>
            <NavBar />
            <Hero />
            <TopMeet />
            <Restaurants />
        </>
    )
}

export default Home