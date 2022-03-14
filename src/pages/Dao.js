import React, { useState, useEffect } from 'react'
import DaoBase from '@component/DaoBase'
import './styles/dao.page.css'
import DaoNewsFeed from '@component/DaoNewsFeed'
import DaoSubNavbar from '@component/DaoSubNavbar'
import DaoBounties from '@component/DaoBounties'
import DaoManagement from '@component/DaoManagement'
import { useParams } from 'react-router-dom'

import useDaoContract from '@hooks/useDaoContract';



export default function DaoPage() {

    const {id} = useParams()

    const {contract: DaoContract} = useDaoContract(`${id.toLowerCase()}.${window.FactoryContract.contractId}`)
    const [currentTab, setCurrentTab] = useState(1)
    const [metadata, setMetadata] = useState(null)
    const [ftStorageBalance, setFtStorageBalance] = useState(0)
    const [userDelegation, setUserDelegation] = useState(0)
    const [daoOwner, setDaoOwner] = useState("");


    useEffect(() => {
        if (DaoContract) {
            DaoContract.get_metadata().then((result) => {
                setMetadata(result)
            })
            DaoContract.get_owner().then(result => setDaoOwner(result))
            if (window.accountId) {
                DaoContract.delegation_balance_of({account_id: window.accountId}).then(result => setUserDelegation(result))
            }
        }
    }, [DaoContract])

    useEffect(() => {
        if (window.accountId) {
            window.FtContract.storage_balance_of({account_id: window.accountId}).then(result => {
                setFtStorageBalance(result)
            })
        }
    }, [])

    return (
        <main>
            <DaoSubNavbar 
                setCurrentTab={setCurrentTab} 
                currentTab={currentTab} 
                DaoContract={DaoContract} 
                ftStorageBalance={ftStorageBalance}
                userDelegation={userDelegation}
                daoOwner={daoOwner}
                metadata={metadata}
            />
            <DaoBase metadata={metadata} />
            {currentTab === 1 && <DaoNewsFeed metadata={metadata} />}
            {currentTab === 2 && <DaoBounties ftStorageBalance={ftStorageBalance} />}
            {currentTab === 4 && <DaoManagement />}
        </main>
    )
}