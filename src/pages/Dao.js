import React, { useState, useEffect } from 'react'
import DaoBase from '@component/DaoBase'
import './styles/dao.page.css'
import DaoNewsFeed from '@component/DaoNewsFeed'
import DaoSubNavbar from '@component/DaoSubNavbar'
import DaoBounties from '@component/DaoBounties'
import DaoManagement from '@component/DaoManagement'


export default function DaoPage() {

    const [currentTab, setCurrentTab] = useState(1)

    // useEffect(() => {
    //     if (window.walletConnection.isSignedIn()) {
    //         window.contract.get_tokens({from_index: 0, limit: 10}).then((result) => {
    //             setTokens(result)
    //         })
    //     }
    // }, [])

    return (
        <main>
            <DaoSubNavbar setCurrentTab={setCurrentTab} currentTab={currentTab} />
            <DaoBase />
            {currentTab === 1 && <DaoNewsFeed />}
            {currentTab === 2 && <DaoBounties />}
            {currentTab === 4 && <DaoManagement />}
        </main>
    )
}