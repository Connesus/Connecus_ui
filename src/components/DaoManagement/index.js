import React, {useState, useEffect} from 'react'
import './style.css'
import ProposalCreate from '@component/ProposalCreate'
import BountyCreate from '@component/BountyCreate'

export default function DaoManagement() {

    

    return (
        <>
        <div className="dao-management">
            <div className="dao-management-header mt-5">
                <p>
                    <a className="btn btn-light mr-2" data-bs-toggle="collapse" href="#collapseCreateProposal" role="button" aria-expanded="false" aria-controls="collapseCreateProposal">
                        Create proposal
                    </a>
                    <a className="btn btn-light mr-2" data-bs-toggle="collapse" href="#collapseCreateBounty" role="button" aria-expanded="false" aria-controls="collapseCreateBounty">
                        Create bounty
                    </a>
                </p>
                <div className="collapse" id="collapseCreateProposal">
                    <div className="card card-body">
                        <ProposalCreate />
                    </div>
                </div>
                <div className="collapse" id="collapseCreateBounty">
                    <div className="card card-body">
                        <BountyCreate />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}