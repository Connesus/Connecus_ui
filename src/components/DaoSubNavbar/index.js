import React, {useState, useEffect} from 'react'
import './style.css'
import burger from '@assets/hamburger.png'
import hearts from '@assets/hearts.png'
import { logout, login } from '../../utils'
import { utils, transactions } from "near-api-js";
import useDaoContract from '@hooks/useDaoContract'
import { useNavigate } from 'react-router-dom'

export default function DaoSubNavbar({
    setCurrentTab,
    ftStorageBalance,
    userDelegation,
    daoOwner,
    metadata
}) {

    const navigate = useNavigate()
    const {daoContractId} = useDaoContract()
    const  [isActive, setActive] = useState(false);
    
    const [delegateValue, setDelegateValue] = useState(1)

    const updateDonateValue = (event) => {
        setDelegateValue(parseInt(event.target.value))
    } 

    const changeTab = (index) => {
        setCurrentTab(index)
        setActive(false)
    }

    const handleDelegate = async () => {
        
        let transferMsg = {
            purpose: {
                Delegate: window.accountId
            }
        }

        let transferMsgString = JSON.stringify(transferMsg)

        const result = await window.account.signAndSendTransaction({
            receiverId: window.FtContract.contractId,
            actions: [
                transactions.functionCall(
                    'storage_deposit', 
                    {account_id: daoContractId},
                    10000000000000, 
                    utils.format.parseNearAmount("0.01")
                ),
                transactions.functionCall(
                    'ft_transfer_call', 
                    {
                        receiver_id: daoContractId, 
                        amount: delegateValue.toString(), 
                        memo: null,
                        msg: transferMsgString
                    }, 
                    250000000000000,
                    1
                )
            ]
        });
    }

    const handleRegisterToken = async () => {
        await window.FtContract.storage_deposit(
            {account_id: window.accountId}, 
            10000000000000, 
            utils.format.parseNearAmount("0.01")
        )
    }

    return (
        <>
        <div className={`side-sub-navbar-menu ${isActive ? "active" : ""} d-flex flex-column justify-content-evenly`}>
            {window.accountId && (
                <>
                <div>
                    <div className="dropdown text-center">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            {`${window.accountId} `}
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li onClick={logout}><a className="dropdown-item danger" href="#">Logout</a></li>
                        </ul>
                    </div>
                    <div className="connecus mt-3">
                        <p className="text-center">${userDelegation} {metadata?.symbol}</p>
                    </div>
                </div>
                </>
            )}
            {!window.accountId && <div className="text-center">
                <button className="btn btn-secondary" type="button" onClick={login}>
                    Login to Connecus
                </button>
            </div>}
            <div className="nav-items">
                <div className="nav-item" onClick={() => navigate("/")}>
                    Home
                </div>
                <div className="nav-item" onClick={() => changeTab(1)}>
                    News feed
                </div>
                <div className="nav-item" onClick={() => changeTab(2)}>
                    Bounties
                </div>
                <div className="nav-item" onClick={() => changeTab(3)}>
                    Bounty Tasks
                </div>
                {daoOwner === window.accountId && <div className="nav-item" onClick={() => changeTab(4)}>
                    Manage
                </div>}
            </div>
            <div className="text-center">
                <div className="connecus-logo">
                    <img src={hearts} alt="" />
                </div>
                <div className="connecus">
                    Connecus
                </div>
            </div>
            <div>
                <div className="input-group mt-3 px-3">
                {ftStorageBalance &&<input 
                        min="1"
                        className="form-control text-end" 
                        placeholder={`Delegate Amount`} 
                        aria-label="Recipient's username" 
                        aria-describedby="button-addon2"
                        type="number"
                        value={delegateValue}
                        onChange={(event) => updateDonateValue(event)}
                    />}
                </div>
                <div className="input-group px-3 text-center mt-1">
                    {
                        ftStorageBalance ? <button 
                            className="btn btn-warning w-100" 
                            type="button" 
                            id="button-addon2"
                            onClick={handleDelegate}
                        >Add Delegate</button>
                        :  <button 
                            className="btn btn-warning w-100" 
                            type="button" 
                            id="button-addon2"
                            onClick={handleRegisterToken}
                        >Register Connecus</button>
                    }
                </div>
            </div>
        </div>
        <div className={`side-sub-navbar-menu-burger ${isActive ? "active" : ""}`} onClick={() => setActive(!isActive)}>
            <img src={burger} alt="burger" />
        </div>
        <div className={`grey-layer ${isActive ? "active" : ""}`}></div>
        <br />
        </>
    )
}