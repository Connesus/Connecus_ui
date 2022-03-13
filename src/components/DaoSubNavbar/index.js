import React, {useState, useEffect} from 'react'
import './style.css'

export default function DaoSubNavbar({
    setCurrentTab,
    currentTab
}) {
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light proposal-navbar">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item" onClick={() => setCurrentTab(1)}>
                            <a className={`nav-link ${currentTab === 1 ? "active" : ""}`}>Proposals</a>
                        </li>
                        <li className="nav-item" onClick={() => setCurrentTab(2)}>
                            <a className={`nav-link ${currentTab === 2 ? "active" : ""}`} href="#">Bounties</a>
                        </li>
                        <li className="nav-item" onClick={() => setCurrentTab(3)}>
                            <a className={`nav-link ${currentTab === 3 ? "active" : ""}`} href="#">Bounty Tasks</a>
                        </li>
                        <li className="nav-item" onClick={() => setCurrentTab(4)}>
                            <a className={`nav-link ${currentTab === 4 ? "active" : ""}`} href="#">Manage</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <br />
        </>
    )
}