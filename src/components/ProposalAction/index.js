import React, { useState, useEffect } from "react";
import heart from '@assets/heart.png';
import comment from '@assets/comments.png';
import share from '@assets/next.png';
import './style.css'

export default function ProposalAction() {

    return (
        <>
        <div className="proposal-actions d-flex mt-3">
            <div className="proposal-action">
                <img src={heart} alt="" /> <span>Like</span>
            </div>
            <div className="proposal-action">
                <img src={comment} alt="" /> <span>Comment</span>
            </div>
            <div className="proposal-action">
                <img src={share} alt="" /> <span>Share</span>
            </div>
        </div>
        </>
    )
}