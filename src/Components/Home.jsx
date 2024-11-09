import Particles from '@tsparticles/react'
import React from 'react'
import { FaRobot } from 'react-icons/fa'
import Features from './Features'
import { FaArrowRight } from 'react-icons/fa6'
import Pricing from './Pricing'
import Contact from './Contact'

const Home = () => {
    return (
        <section id='home'>
            <div className='flex flex-col min-h-[90vh] md:min-h-[90vh] items-center justify-center'>

                <div className='w-[90%] md:w-[80%]  mx-auto flex flex-col gap-3 '>
                    <h1 className='font-bold bg-gradient-to-r md:text-center from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent text-5xl leading-[60px] md:leading-[80px] md:text-6xl py-7'>Effortlessly Create Your Own AI Chatbot in Just One Step.</h1>
                    <p className=' text-gray-600 md:text-center md:text-xl'>Harness the power of AI to build personalized chatbots tailored to your needs. It's fast, easy, and powerful.</p>
                </div>

                <div className='flex gap-10 w-[90%] mx-auto mt-14 md:justify-center md:gap-14'>
                    <a href="/create-own-bot">
                        <button style={{ transition: 'all 0.4s ease' }} className='block create from-indigo-500 via-purple-500 to-pink-500 bg-gradient-to-r hover:rounded-2xl'>Try for free</button>
                    </a>
                    <div style={{ transition: 'all 0.4s ease' }} className='flex items-center gap-2 cursor-pointer '><div>Learn more</div>
                    <div className='transform -rotate-45 flex items-center'><FaArrowRight className=''/></div></div>
                </div>

            </div>

            <Features />
            <Pricing/>
            <Contact/>

        </section>
    )
}

export default Home
