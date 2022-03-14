import React, { useState, useEffect } from "react";
import './style.css'
import Poll from '@component/Poll'
import ProposalHeader from '@component/ProposalHeader'
import ProposalAction from '@component/ProposalAction'

export default function PollingProposal({proposal, metadata}) {

    console.log(proposal)
    const {description, duration, id, total_donations, submission_time, options, option_delegations} = proposal


    return (
        <>
            <div className="proposal mt-4">
                <ProposalHeader metadata={metadata} created_at={submission_time}/>
                <div className="proposal-description">
                    {description}
                </div>
                <div className="proposal-kind">
                    <Poll proposalId={proposal.id} />
                </div>
                {/* <ProposalAction /> */}
            </div>
            <br />
        </>
    )
}