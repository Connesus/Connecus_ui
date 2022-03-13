import React, { useState, useEffect } from "react";
import useDaoContract from '@hooks/useDaoContract';
import { uuid } from 'uuidv4';

export default function ProposalCreate() {


    const {contract: DaoContract} = useDaoContract()
    const [duration, setDuration] = useState(null)
    const [description, setDescription] = useState(null)
    const [proposalKind, setProposalKind] = useState('Donate')
    const [voteKind, setVoteKind] = useState('MajorityVote')
    const updateDuration = (event) => {
        let value = event.target.value
        if (value === "") {
            setDuration(0)
            return
        }
        if (!isNaN(value)) {
            setDuration(parseInt(value).toString())
        }
    }

    const [optionListIndex, setOptionListIndex] = useState([])
    const MAX_OPTION = 8
    const [currentAction, setCurrentAction] = useState(0);

    const [option1, setOption1] = useState({title: null, description: null})
    const [option2, setOption2] = useState({title: null, description: null})
    const [option3, setOption3] = useState({title: null, description: null})
    const [option4, setOption4] = useState({title: null, description: null})
    const [option5, setOption5] = useState({title: null, description: null})
    const [option6, setOption6] = useState({title: null, description: null})
    const [option7, setOption7] = useState({title: null, description: null})
    const [option8, setOption8] = useState({title: null, description: null})

    const optionActions = [
        [option1, setOption1], 
        [option2, setOption2], 
        [option3, setOption3], 
        [option4, setOption4], 
        [option5, setOption5], 
        [option6, setOption6], 
        [option7, setOption7], 
        [option8, setOption8]
    ]

    const setOption = (index, value) => {
        let [option, setOption] = optionActions[index]
        setOption(value)
    }

    const getOption = (index) => {
        let [option, setOption] = optionActions[index]
        return option
    }

    const addOptionToOptionList = (event) => {
        event.preventDefault()
        if (currentAction < MAX_OPTION) {
            setOptionListIndex([...optionListIndex, currentAction])
            setCurrentAction(currentAction + 1)
        }
    }

    const getListOptionValue = () => {
        let success = true
        const values = optionListIndex.map(index => {
            const option = getOption(index)
            const {title, description} = option
            if (!title || !description) {
                success = false
            }
            return {...option, min_vote_weight: 0}
        })
        return {
            success,
            options: values,
            msg: "ERROR_INVALID_OPTION"
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const {
            success,
            options,
            msg
        } = getListOptionValue()
        
        if (!success) {
            alert(msg)
            return
        }
        if (!description || !proposalKind || !duration) {
            console.log(description, proposalKind, duration)
            alert("Please fullfill the form")
            return
        }
        const durationInNanoSecond = parseInt(duration) * 60 * 60 * 1000 * 1000000
        const durationInNanoSecondString = durationInNanoSecond.toString()

        const optionMap = {}
        options.forEach(option => {
            const optionId = uuid()
            optionMap[optionId] = option
        })

        if (proposalKind === 'Vote') {
            if (!voteKind) {
                alert("Invalid vote kind")
                return
            } else if (options.length < 1) {
                alert("Number of options must be greater than zero")
                return
            } else {
                let proposalInput ={
                    description,
                    duration: durationInNanoSecondString,
                    options: optionMap,
                    kind: {
                        Vote: {
                            vote_kind: voteKind
                        }
                    }
                }
                await DaoContract.add_proposal({
                    proposal_input: proposalInput
                })
                return
            }
        } else {
            
            let proposalInput = {
                description,
                duration: durationInNanoSecondString,
                options: optionMap,
                kind: "Donate"
            }
            await DaoContract.add_proposal({
                proposal_input: proposalInput
            })
            return
        }
    }

    useEffect(() => {
        if (DaoContract) {
            DaoContract.get_owner().then(result => console.log(result))
        }
    }, [DaoContract])

    return (
        <>
        <form>
            <fieldset>
                <legend>Create proposal</legend>
                <div className="mb-3">
                    <label htmlFor="disabledTextInput" className="form-label">Description</label>
                    <textarea id="disabledTextInput" className="form-control" placeholder="Description" onChange={(event) => setDescription(event.target.value)} />
                </div>
                <div className="mb-3 row">
                    <div className="col-6">
                        <label className="form-label">Proposal Kind</label>
                        <select className="form-select" aria-label="Default select example" onChange={event => setProposalKind(event.target.value)}>
                            <option value="Donate">Donate</option>
                            <option value="Vote">Vote</option>
                        </select>
                    </div>
                    <div className="col-6">
                        <label className="form-label">Duration</label>
                        <input 
                            min="0"
                            className="form-control" 
                            placeholder="Duration (hours)" 
                            aria-label="Recipient's username" 
                            aria-describedby="button-addon2"
                            value={duration}
                            onChange={(event) => updateDuration(event)}
                        />
                    </div>
                </div>
                {proposalKind === 'Vote' && 
                    <>
                    <div className="mb-3 row">
                        <div className="col-12">
                            <label className="form-label">Vote Kind</label>
                            <select className="form-select" aria-label="Default select example" onChange={event => setVoteKind(event.target.value)}>
                                <option value="MajorityVote">Majority Vote</option>
                                <option value="VoteByDelegation">Vote By Delegation</option>
                            </select>
                        </div>
                    </div>
                    {optionListIndex.map(optionIndex => {
                        return <div className="mb-3 row" key={`option-${optionIndex}`}>
                            <label className="form-label">Option {optionIndex + 1}</label>
                            <div className="col-6">
                                <input 
                                    className="form-control" 
                                    placeholder="Title" 
                                    value={getOption(optionIndex)['title']}
                                    onChange={(event) => setOption(
                                        optionIndex, 
                                        {
                                            title: event.target.value, 
                                            description: getOption(optionIndex)['description']
                                        }
                                    )}
                                />
                            </div>
                            <div className="col-6">
                                <input 
                                    className="form-control" 
                                    placeholder="Description" 
                                    value={getOption(optionIndex)['description']}
                                    onChange={(event) => setOption(
                                        optionIndex, 
                                        {
                                            title: getOption(optionIndex)['title'], 
                                            description: event.target.value
                                        }
                                    )}
                                />
                            </div>
                        </div>
                    })}
                    {currentAction < MAX_OPTION && <div className="add-option">
                        <button className="btn btn-dark" onClick={addOptionToOptionList}>Add Option</button>
                    </div>}
                    </>
                }
                <button className="btn btn-warning w-100 mt-5" onClick={handleSubmit}>Submit</button>
            </fieldset>
        </form>
        </>
    )
}