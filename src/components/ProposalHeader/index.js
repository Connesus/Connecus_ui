import React, { useState, useEffect } from "react";
import {timestampToDateTime} from '@utils/time.utils';

export default function ProposalHeader({
    created_at,
    metadata
}) {

    let expired = timestampToDateTime("0", created_at);

    return (
        <>
        <div className="proposal-header d-flex mt-3">
            <div className="avatar-sm">
                <img src={metadata.thumbnail} alt="" />
            </div>
            <div>
                <div className="header-user-name">
                    {metadata?.name}
                </div>
                <div className="header-created-time">
                    {expired.toLocaleTimeString()} {expired.toLocaleDateString()}
                </div>
            </div>
        </div>
        </>
    )
}