import React, { useState, useEffect } from 'react'
import DaoBase from '@component/DaoBase'
import './styles/dao.page.css'
import DaoNewsFeed from '@component/DaoNewsFeed'
import DaoSubNavbar from '@component/DaoSubNavbar'
import DaoBounties from '@component/DaoBounties'
import DaoManagement from '@component/DaoManagement'
import { logout, login } from '../utils'

import useDaoContract from '@hooks/useDaoContract';
import useFtContract from '@hooks/useFtContract'



export default function DaoPage() {

    const {contract: DaoContract} = useDaoContract()
    const {contract: FtContract} = useFtContract()
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
        if (FtContract) {
            if (window.accountId) {
                FtContract.storage_balance_of({account_id: window.accountId}).then(result => {
                    setFtStorageBalance(result)
                })
            }
        }
    }, [FtContract])

    return (
        <main>
            <DaoSubNavbar 
                setCurrentTab={setCurrentTab} 
                currentTab={currentTab} 
                DaoContract={DaoContract} 
                FtContract={FtContract} 
                ftStorageBalance={ftStorageBalance}
                userDelegation={userDelegation}
                daoOwner={daoOwner}
            />
            <DaoBase metadata={metadata} />
            {currentTab === 1 && <DaoNewsFeed />}
            {currentTab === 2 && <DaoBounties ftStorageBalance={ftStorageBalance} />}
            {currentTab === 4 && <DaoManagement />}
        </main>
    )
}