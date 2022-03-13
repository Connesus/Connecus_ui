import React, {useState, useEffect} from 'react'
import './style.css'
import PollingProposal from '@component/PollingProposal'
import DonateProposal from '@component/DonateProposal'
import useDaoContract from '@hooks/useDaoContract'

export default function DaoNewsFeed() {

    const {contract: DaoContract} = useDaoContract()
    const [proposals, setProposals] = useState([])
    const [total, setTotal] = useState(0)
    const [start, setStart] = useState(0)
    const [limit, setLimit] = useState(10)

    useEffect(() => {
        if (DaoContract) {
            const fetchData = async () => {
                let numberOfProposals = await DaoContract.get_last_proposal_id();
                setTotal(numberOfProposals);
                let proposalList = await DaoContract.get_proposals({
                    from_index: start, 
                    limit: limit, 
                    account_id: window.accountId ? window.accountId : ""
                })
                setProposals(proposalList)
            }
            fetchData()
        }
    }, [DaoContract])
    
    return (
        <>
        <div className="dao-news-feed">
            {proposals.map((proposal) => {
                if (proposal.kind === "Donate") {
                    return <DonateProposal proposal={proposal} key={`proposal-${proposal.id}`} />
                } else {
                    return <PollingProposal proposal={proposal} key={`proposal-${proposal.id}`}/>
                }
            })}
        </div>
        </>
    )
}