import React, { useState, useEffect } from "react";
import './style.css'
import {timestampToDateTime} from '@utils/time.utils';
import useDaoContract from '@hooks/useDaoContract'

export default function Poll({proposalId}) {

    const {contract: DaoContract} = useDaoContract()

    let [selected, setSelected] = useState(null)
    let [userDelegation, setUserDelegation] = useState(0)
    let [proposal, setProposal] = useState({
        duration: 0, 
        total_delegation_amount: 0, 
        option_delegations: 0, 
        options: [], 
        submission_time: 0
    })
    let {
        duration, 
        total_delegation_amount, 
        option_delegations, 
        options, 
        submission_time,
        user_select
    } = proposal

    console.log(total_delegation_amount)

    let expired = timestampToDateTime(duration, submission_time);

    const fetchProposal = async () => {
        let res = await DaoContract.get_proposal({id: proposalId, account_id: window.accountId})
        console.log(res);
        if (res) {
            setProposal(res)
        }
    }

    const [optionsList, setOptionsList] = useState([])

    useEffect(() => {
        const optionList = []
        Object.keys(options).forEach(function(key) {
            optionList.push({
                ...options[key],
                id: key,
            })
        });
        console.log(optionList)
        setOptionsList(optionList)
    }, [options])

    console.log(optionsList)

    useEffect(() => {
        if (DaoContract) {
            fetchProposal()
            DaoContract.delegation_balance_of({account_id: window.accountId}).then(result => {
                setUserDelegation(result)
            })
        }
    }, [DaoContract]) 

    useEffect(() => {
        if (user_select) {
            setSelected(user_select.option)
        }
    }, [user_select])

    const voteHandler = async (optionId) => {
        DaoContract.act_proposal({
            id: proposalId, 
            action: {
                Vote: {
                    option_id: optionId
                }
            }
        })
    }

    return (
        <>
        <div className="wrapper">
            <header>Vote</header>
            <div className="poll-area">
                {optionsList.map(option => {
                    let percent = option_delegations[option.id] ? option_delegations[option.id] / total_delegation_amount * 100 : 0
                    return (
                        <label key={option.id} className={`${selected === option.id ? "selected" : ""}`} onClick={() => voteHandler(option.id)}>
                            <div className="select-option">
                                <div className="column">
                                    <span className="circle"></span>
                                    <span className="text">{option.title}</span>
                                </div>
                                <span className="percent">{percent}%</span>
                            </div>
                            <p className="select-option-description">{option.description}</p>
                            <div className="progress" percent={percent}></div>
                        </label>
                    )
                })}
            </div>
            <div id="emailHelp" className="form-text fst-italic">Expired at {expired.toLocaleTimeString()} {expired.toLocaleDateString()}</div>
        </div>
        </>
    )
}