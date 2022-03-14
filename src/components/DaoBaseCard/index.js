import React, {useState, useEffect} from 'react'

import facebook from '@assets/facebook.png'
import twitter from '@assets/twitter.png'
import instagram from '@assets/instagram.png'
import discord from '@assets/discord.png'
import './style.css'
import { useNavigate } from 'react-router-dom'


export default function DaoCard({metadata, id, owner}) {

    const navigate = useNavigate()

    return (
        <>
        <div className="dao-base-card-information" onClick={() => navigate(`/dao/${id}`)}>
            <div className="dao-thumbnail">
                <img src={metadata?.thumbnail} alt="" />
            </div>
            <div className="dao-title">
                {metadata?.name?.toUpperCase()}
            </div>
            <div className="dao-owner">
                {owner}
            </div>
            <div className="dao-purpose">
                {metadata?.purpose?.toLowerCase()}
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
            </div>
        </div>
        </>
    )
}