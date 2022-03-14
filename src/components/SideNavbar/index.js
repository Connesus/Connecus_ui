import React, {useState, useEffect} from 'react'
import './style.css'
import burger from '@assets/hamburger.png'
import hearts from '@assets/hearts.png'
import { logout, login } from '../../utils'
import { utils, transactions } from "near-api-js";
import { useNavigate } from "react-router-dom";
import useDaoContract from '@hooks/useDaoContract'


export default function SideNavbar({
    setCurrentTab,
    ftStorageBalance,
    userDelegation,
    daoOwner
}) {

    const navigate = useNavigate();
    const  [isActive, setActive] = useState(false);
    
    const [delegateValue, setDelegateValue] = useState(1)

    const updateDonateValue = (event) => {
        setDelegateValue(parseInt(event.target.value))
    } 

    const changeTab = (index) => {
        setCurrentTab(index)
        setActive(false)
    }

    return (
        <>
        <div className={`side-bar-menu ${isActive ? "active" : ""} d-flex flex-column justify-content-evenly`}>
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
                        <p className="text-center">Delegation Amount</p>
                        <p className="text-center">${userDelegation}</p>
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
            </div>
        </div>
        <div className={`side-bar-menu-burger ${isActive ? "active" : ""}`} onClick={() => setActive(!isActive)}>
            <img src={burger} alt="burger" />
        </div>
        <div className={`grey-layer ${isActive ? "active" : ""}`}></div>
        <br />
        </>
    )
}