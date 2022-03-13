import React, { useState, useEffect } from "react";

export default function ProposalHeader({
    name,
    avatar,
    created_at
}) {

    return (
        <>
        <div className="proposal-header d-flex mt-3">
            <div className="avatar-sm">
                <img src="https://pbs.twimg.com/profile_images/1470780411747844096/vpxt_095_400x400.jpg" alt="" />
            </div>
            <div>
                <div className="header-user-name">
                    CZ Binance
                </div>
                <div className="header-created-time">
                    10 giờ trước
                </div>
            </div>
        </div>
        </>
    )
}