import React from 'react';

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DaoCard from "../components/DaoCard";
import Button from "../components/Button";

import './styles/Home.page.css';

const Home = () => {
    return (
        <div>
            <Navbar/>

            <div className='hero'>
                <div className='hero--left'>
                    <h1 className='hero__title'>
                        Your Community
                        Your Partners
                    </h1>

                    <p className='hero__subtitle'>Connecus is a platform to help you promote, evolve your own community easier like never before.</p>

                    <div className='hero__btns'>
                        <Button type={'primary'} text={'Primary Button'}/>
                        <Button type={'secondary'} text={'Secondary Button'}/>
                    </div>
                </div>

                <div className='hero--right'>
                    <img src="http://210.94.194.63:5112/fe-connecus/static/media/community1.edd3db98.svg" alt="hero-img"/>
                </div>
            </div>

            <div className='dao-section'>
                <h1 className='dao__title'>
                    Top Influencers
                </h1>

                <div className='dao__cards'>
                    <DaoCard thumbnail={'https://i.pinimg.com/564x/7f/65/f3/7f65f3451374aef5b61dc3f14492e413.jpg'}/>
                    <DaoCard thumbnail={'https://i.pinimg.com/564x/94/51/a9/9451a9d4e5d6fdcf783669952f1a13d8.jpg'}/>
                    <DaoCard thumbnail={'https://i.pinimg.com/564x/b4/3c/d3/b43cd33006d3c50bd241047a6fbb3104.jpg'}/>
                    <DaoCard thumbnail={'https://i.pinimg.com/564x/e3/75/b5/e375b5bc3d3e2df39d59b7fcad7793bd.jpg'}/>
                    <DaoCard thumbnail={'https://i.pinimg.com/564x/04/cd/92/04cd92e85f0ae39205fc160ef13b1546.jpg'}/>
                    <DaoCard thumbnail={'https://i.pinimg.com/564x/02/24/b0/0224b0d3d7a74a2afd80291d2f302a4d.jpg'}/>
                </div>

                <div className={'dao__btn'}>
                    <Button type={'secondary'} text={'See More'}/>
                </div>
            </div>

            <Footer/>
        </div>
    )
}

export default Home;