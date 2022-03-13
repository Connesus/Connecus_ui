import React, { useState, useEffect } from "react";
import './style.css'
import useFtContract from "@hooks/useFtContract";
import { utils, transactions } from "near-api-js";
const FT_TOKEN_CONTRACT = "connecus-token.manhndev.testnet"
const TEST_DAO_CONTRACT = "connecus-dao.manhndev.testnet"


export default function BountyCreate() {

    const {contract: FtContract} = useFtContract()
    const [duration, setDuration] = useState(null)
    const [description, setDescription] = useState(null)
    const [claimValue, setClaimValue] = useState(0)
    const updateNumber = (event, callback) => {
        let value = event.target.value
        if (value === "") {
            callback(0)
            return
        }
        if (!isNaN(value)) {
            callback(parseInt(value).toString())
        }
    }
    const PAYMENT_TOKEN = {
        name: "Connecus",
        symbol: "CNES",
        accountId: "connecus.testnet"
    }

    const [optionListIndex, setOptionListIndex] = useState([])
    const MAX_OPTION = 8
    const [currentAction, setCurrentAction] = useState(0);

    const [tags, setTags] = useState([])
    const [currentInputTag, setCurrentInputTag] = useState("")

    const addTags = (tagString) => {
        setTags([...tags, tagString])
    }

    const removeTags = (index) => {
        setTags([
            ...tags.slice(0, index),
            ...tags.slice(index + 1)
        ])
    }

    const handleAddTags = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            addTags(event.target.value)
            setCurrentInputTag("")
        }
    }

    const handleCreateBounty = async (event) => {
        event.preventDefault()
        const claimers = {}
        const claimAmountPerson = parseInt(claimValue)
        
        tags.forEach(tag => {
            claimers[tag] = claimAmountPerson
        })

        if (Object.entries(claimers).length < 1) {
            alert("ERR_NO_CLAIMERS")
            return
        } 

        if (!description || !claimValue || !duration) {
            alert("FORM_NOT_FULFILLED")
            return
        }

        let data = {
            claimer: claimers,
            duration: (duration * 24 * 60 * 60 * 1000 * 1000000).toString(),
            start_time: (Date.now() * 1000000).toString(),
            token: FT_TOKEN_CONTRACT,
            description
        }

        const transferAmount = Object.entries(claimers).length * claimAmountPerson

        let transferMsg = {
            purpose: {
                CreateBounty: data
            }
        }

        let transferMsgString = JSON.stringify(transferMsg)

        const result = await window.account.signAndSendTransaction({
            receiverId: FtContract.contractId,
            actions: [
                transactions.functionCall(
                    'storage_deposit', 
                    {account_id: TEST_DAO_CONTRACT},
                    10000000000000, 
                    utils.format.parseNearAmount("0.01")
                ),
                transactions.functionCall(
                    'ft_transfer_call', 
                    {
                        receiver_id: TEST_DAO_CONTRACT, 
                        amount: transferAmount.toString(), 
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
        <form>
            <fieldset>
                <legend>Create Bounty</legend>
                <div className="mb-3">
                    <label htmlFor="disabledTextInput" className="form-label">Description</label>
                    <textarea id="disabledTextInput" className="form-control" placeholder="Description" onChange={(event) => setDescription(event.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Payment token</label>
                    <input 
                        id="paymentToken" 
                        className="form-control" 
                        placeholder="Description" 
                        disabled
                        value={`${PAYMENT_TOKEN.name} (${PAYMENT_TOKEN.symbol})`} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Claim amount for each</label>
                    <input 
                        id="paymentToken" 
                        className="form-control" 
                        placeholder="Description" 
                        onChange={(e) => updateNumber(e, setClaimValue)}
                        value={claimValue} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Claim duration</label>
                    <input 
                        id="paymentToken" 
                        className="form-control" 
                        placeholder="Claim duration (days)" 
                        onChange={(e) => updateNumber(e, setDuration)}
                        value={duration} />
                </div>
                <div className="mb-3">
                    <label htmlFor="disabledTextInput" className="form-label">Claimer</label>
                    <div className="d-flex flex-wrap">
                        {tags.map((tag, index) => {
                            return <div 
                                className="claimer-tag" 
                                data-bs-toggle="tooltip" 
                                data-bs-placement="top" 
                                title="Double click to remove"
                                key={`claimer-tag-${index}`}
                                onDoubleClick={() => removeTags(index)}
                            >{tag}</div>
                        })}
                    </div>
                    <input 
                        className="form-control" 
                        placeholder="Add claimer" 
                        value={currentInputTag}
                        onChange={(event) => setCurrentInputTag(event.target.value)}
                        onKeyDown={(event) => handleAddTags(event)}
                    />
                </div>
                <button className="btn btn-warning w-100 mt-5" onClick={(event) => handleCreateBounty(event)}>Submit</button>
            </fieldset>
        </form>
        </>
    )
}