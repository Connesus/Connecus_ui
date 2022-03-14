import React, {useState, useEffect} from 'react'

import facebook from '@assets/facebook.png'
import twitter from '@assets/twitter.png'
import instagram from '@assets/instagram.png'
import discord from '@assets/discord.png'
import donation from '@assets/hearts.png'
import './style.css'
import useDaoContract from '@hooks/useDaoContract'
import { utils, transactions } from "near-api-js";


export default function TokenCreateForm({metadata}) {

    const {contract: DaoContract, daoContractId} = useDaoContract()

    const [donateValue, setDonateValue] = useState(0)
    const updateDonateValue = (event) => {
        const value = event.target.value
        if (value === "") {
            setDonateValue(0)
            return
        }
        if (!isNaN(value)) {
            setDonateValue(parseInt(value).toString())
        }
    }

    const donateHandler = async () => {

        let transferMsg = {
            purpose: "OpenDonate"
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
                        amount: donateValue.toString(), 
                        memo: null,
                        msg: transferMsgString
                    }, 
                    250000000000000,
                    1
                )
            ]
        });
    }
    
    return (
        <>
        <div className="dao-base-information">
            <div className="dao-thumbnail">
                <img src={metadata?.thumbnail} alt="" />
            </div>
            <div className="dao-title">
                {metadata?.name?.toUpperCase()}
            </div>
            <div className="dao-owner">
                {daoContractId}
            </div>
            <div className="dao-purpose">
                {metadata?.purpose?.toLowerCase()}
            </div>
            <div className="dao-social-networks d-flex justify-content-evenly mt-1">
                <div className="dao-social-thumbnail" data-bs-toggle="tooltip" data-bs-placement="top" title="Facebook">
                    <img src={facebook} alt="" />
                </div>
                <div className="dao-social-thumbnail" data-bs-toggle="tooltip" data-bs-placement="top" title="Twitter">
                    <img src={twitter} alt="" />
                </div>
                <div className="dao-social-thumbnail" data-bs-toggle="tooltip" data-bs-placement="top" title="Instagram">
                    <img src={instagram} alt="" />
                </div>
                <div className="dao-social-thumbnail" data-bs-toggle="tooltip" data-bs-placement="top" title="Discord">
                    <img src={discord} alt="" />
                </div>
                <div className="dao-social-thumbnail" data-bs-toggle="tooltip" data-bs-placement="top" title="Donate">
                    <a className="mr-2" data-bs-toggle="collapse" href="#collapseOpenDonate" role="button" aria-expanded="false" aria-controls="collapseOpenDonate">
                        <img src={donation} alt="" />
                    </a>
                </div>
            </div>
            <div className="collapse" id="collapseOpenDonate">
                <div className="d-flex justify-content-center">
                    <div className="input-group mb-3 mt-3 w-75">
                        <input 
                            min="0"
                            type="number"
                            className="form-control" 
                            placeholder="Donate value" 
                            aria-label="Recipient's username" 
                            aria-describedby="button-addon2"
                            value={donateValue}
                            onChange={(event) => updateDonateValue(event)}
                        />
                        <button className="btn btn-secondary" type="button" id="button-addon2" onClick={donateHandler}>Donate</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}