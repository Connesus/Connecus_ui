import React, {useState, useEffect} from 'react'

import facebook from '@assets/facebook.png'
import twitter from '@assets/twitter.png'
import instagram from '@assets/instagram.png'
import discord from '@assets/discord.png'
import donation from '@assets/hearts.png'
import './style.css'

export default function TokenCreateForm() {
    
    return (
        <>
        <div className="dao-base-information">
            <div className="dao-thumbnail">
                <img src="https://pbs.twimg.com/profile_images/1470780411747844096/vpxt_095_400x400.jpg" alt="" />
            </div>
            <div className="dao-title">
                {"future killer".toUpperCase()}
            </div>
            <div className="dao-owner">
                {"CZ.BINANCE.MAINNET".toLowerCase()}
            </div>
            <div className="dao-purpose">
                <p>Các chú nhiều tiền thì cho vào future đánh cho anh xin ít!</p>
            </div>
            <div className="dao-social-networks d-flex justify-content-evenly mt-1">
                <div className="dao-social-thumbnail" data-bs-toggle="tooltip" data-bs-placement="top" title="Facebook">
                    <img src={facebook} alt="" />
                </div>
                <div className="dao-social-thumbnail" data-bs-toggle="tooltip" data-bs-placement="top" title="Twitter">
                    <img src={twitter} alt="" />
                </div>
                <div className="dao-social-thumbnail" data-bs-toggle="tooltip" data-bs-placement="top" title="Instagram">
                    <img src={instagram} alt="" />
                </div>
                <div className="dao-social-thumbnail" data-bs-toggle="tooltip" data-bs-placement="top" title="Discord">
                    <img src={discord} alt="" />
                </div>
                <div className="dao-social-thumbnail" data-bs-toggle="tooltip" data-bs-placement="top" title="Donate">
                    <img src={donation} alt="" />
                </div>
            </div>
        </div>
        </>
    )
}