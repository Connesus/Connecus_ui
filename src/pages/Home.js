import React, {useState, useEffect} from 'react';

import Footer from "@component/Footer";
import influencer from "@assets/influencer.jpg"
import { useNavigate } from 'react-router-dom';
import DaoCard from '@component/DaoBaseCard';
import hearts from '@assets/hearts.png'

import './styles/Home.page.css';

const Home = () => {

    const [daos, setDaos] = useState([])
    const [start, setStart] = useState(0)
    const [limit, setLimit] = useState(10)

    const navigate = useNavigate()

    useEffect(() => {
        window.FactoryContract.get_daos({
            from_index: 0, 
            limit: 10
        }).then((results) => {
            console.log(results)
            setDaos(results)
        })
    }, [])

    return (
        <div>
            <div className='hero'>
                <div className='hero--left'>
                    <h1 className='hero__title'>
                        Connecus
                    </h1>
                    <p className='hero__description'>Connect influencer to fans by blockchain</p>

                    <div className='hero__btns'>
                        <button className='btn btn-warning' onClick={() => navigate('/create')}>Create your Community</button>
                        <button className='btn btn-dark'>Buy CEUS and enjoy</button>
                    </div>
                </div>

                <div className='hero--right'>
                    <img src={influencer} alt="hero-img"/>
                </div>
            </div>

            <div className='dao-section'>
                <div className='dao-section__delimiter'>
                    <div className='dao-section__delimiter-line'></div>
                    <div className='dao-section__delimiter-center'>
                        <img src={hearts} alt="" />
                    </div>
                    <p className='text-center dao-section-title'>Influencer's Dao</p>
                </div>

                <div className='dao__cards d-flex flex-wrap justify-content-between'>
                    {daos.map(dao => {
                        const {metadata, owner_id, token_contract_id} = dao
                        return <DaoCard metadata={metadata} key={metadata.symbol} id={metadata.symbol} owner={owner_id}/>
                    })}
                </div>
            </div>

            <Footer/>
        </div>
    )
}

export default Home;