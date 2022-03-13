import React from 'react';

import facebook from '@assets/facebook.png'
import twitter from '@assets/twitter.png'
import instagram from '@assets/instagram.png'
import discord from '@assets/discord.png'

import './style.css';

const DaoCard = ({thumbnail}) => (
    <div className='dao__card'>
        <div className='dao__card-img'>
            <div
                className='dao__card-thumbnail'
                style={{backgroundImage: "url(" + thumbnail + ")"}}
            />
            <div className='dao__card-thumbnail-overlay'>
                <div className='dao__card-social'>
                    <img src={facebook} alt="social-link" className='dao__card-social-icon'/>
                    <img src={twitter} alt="social-link" className='dao__card-social-icon'/>
                    <img src={instagram} alt="social-link" className='dao__card-social-icon'/>
                    <img src={discord} alt="social-link" className='dao__card-social-icon'/>
                </div>
            </div>
        </div>

        <div className='dao__card-content'>
            <div className='dao__card-title'>
                HYDRA M
            </div>
            <div className='dao__card-symbol'>
                GMR
            </div>
        </div>
    </div>
)

export default DaoCard;