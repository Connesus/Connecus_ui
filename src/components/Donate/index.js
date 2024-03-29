import React, { useState, useEffect } from "react";
import './style.css'
import {timestampToDateTime} from '@utils/time.utils';
import { utils, transactions } from "near-api-js";
import useDaoContract from "@hooks/useDaoContract";

export default function Donate({proposal}) {

    const {daoContractId} = useDaoContract()

    let {duration, id, total_donations, submission_time: startTime} = proposal

    let expired = timestampToDateTime(duration, startTime);

    let [donateValue, setDonateValue] = useState(0)
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
            purpose: {
                ProposalDonate: parseInt(id)
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
        <div className="wrapper">
            <header className="d-flex justify-content-between">
                <div>Donate</div>
                <div>${total_donations} CEUS</div>
            </header>
            <div className="input-group mt-3">
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
            <div id="emailHelp" className="form-text fst-italic">Expired at {expired.toLocaleTimeString()} {expired.toLocaleDateString()}</div>
        </div>
        </>
    )
}