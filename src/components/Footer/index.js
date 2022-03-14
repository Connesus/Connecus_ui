import React from 'react';

import facebook from '@assets/facebook.png'
import twitter from '@assets/twitter.png'
import instagram from '@assets/instagram.png'
import discord from '@assets/discord.png'

import './style.css';

export default function Footer() {
    return (
        <div className='footer'>
            <div className='footer--left'>
                <div className='footer__logo'>LOGO</div>
                <p className='footer__description'>Connecus is a platform to help you promote, evolve your own community easier like never before.</p>
                <div className='footer__social'>
                    <img src={facebook} alt="social-link" className='footer__social-icon'/>
                    <img src={twitter} alt="social-link" className='footer__social-icon'/>
                    <img src={instagram} alt="social-link" className='footer__social-icon'/>
                    <img src={discord} alt="social-link" className='footer__social-icon'/>
                </div>
            </div>

            <div className='footer--right'>
                <div className='footer__menu'>About Us</div>
                <div className='footer__menu'>Document</div>
                <div className='footer__menu'>FAQ</div>
            </div>
        </div>
    )
}
