import React, {useState, useEffect} from 'react'
import './style.css'
import BountyCard from '@component/BountyCard'
import useDaoContract from '@hooks/useDaoContract'

export default function DaoBounties({ftStorageBalance}) {

    const  {contract: DaoContract} = useDaoContract()
    const [start, setStart] = useState(0)
    const [limit, setLimit] = useState(10)
    const [bounties, setBounties] = useState([])

    useEffect(() => {
        if (DaoContract) {
            DaoContract.get_bounties({
                from_index: start,
                limit: limit,
                account_id: window.accountId
            }).then(result => {
                setBounties(result)
            })
        }
    }, [DaoContract])

    return (
        <>
        <div className="dao-bounties">
            <div className="dao-bounties-header mt-5">
                Claim your bounties
            </div>
            <div className="dao-bounties-list d-flex flex-wrap justify-content-between">
                {bounties.map(bounty => {
                    return <BountyCard key={bounty.id} bounty={bounty} ftStorageBalance={ftStorageBalance}/>
                })}
            </div>
        </div>
        </>
    )
}