import React, {useState, useEffect} from 'react'
import './style.css'

export default function DaoManagement() {

    let [donateValue, setDonateValue] = useState(null)
    const updateDonateValue = (event) => {
        let value = event.target.value
        if (value === "") {
            setDonateValue(0)
            return
        }
        if (!isNaN(value)) {
            setDonateValue(parseInt(value).toString())
        }
    }

    let [options, setOptions] = useState([{
        title: null,
        description: null,
        min_vote_weight: null
    }])

    return (
        <>
        <div className="dao-management">
            <div className="dao-management-header mt-5">
                <p>
                    <a className="btn btn-light mr-2" data-bs-toggle="collapse" href="#collapseCreateProposal" role="button" aria-expanded="false" aria-controls="collapseCreateProposal">
                        Create proposal
                    </a>
                    <a className="btn btn-light mr-2" data-bs-toggle="collapse" href="#collapseCreateBounty" role="button" aria-expanded="false" aria-controls="collapseCreateBounty">
                        Create bounty
                    </a>
                    {/* <a className="btn btn-light mr-2" data-bs-toggle="collapse" href="#collapseCreateTask" role="button" aria-expanded="false" aria-controls="collapseCreateTask">
                        Create task
                    </a> */}
                </p>
                <div className="collapse" id="collapseCreateProposal">
                    <div className="card card-body">
                        <form>
                            <fieldset>
                                <legend>Create proposal</legend>
                                <div className="mb-3">
                                    <label htmlFor="disabledTextInput" className="form-label">Description</label>
                                    <textarea id="disabledTextInput" className="form-control" placeholder="Disabled input" />
                                </div>
                                <div className="mb-3 row">
                                    <div className="col-6">
                                        <label className="form-label">Kind</label>
                                        <select class="form-select" aria-label="Default select example">
                                            <option value="donate">Donate</option>
                                            <option value="vote">Vote</option>
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
                                            value={donateValue}
                                            onChange={(event) => updateDonateValue(event)}
                                        />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label className="form-label">Option 1</label>
                                    <div className="col-6">
                                        <input 
                                            className="form-control" 
                                            placeholder="Title" 
                                        />
                                    </div>
                                    <div className="col-6">
                                        <input 
                                            className="form-control" 
                                            placeholder="Description" 
                                        />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label className="form-label">Option 2</label>
                                    <div className="col-6">
                                        <input 
                                            className="form-control" 
                                            placeholder="Title" 
                                        />
                                    </div>
                                    <div className="col-6">
                                        <input 
                                            className="form-control" 
                                            placeholder="Description" 
                                        />
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-warning">Submit</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
                <div className="collapse" id="collapseCreateBounty">
                    <div className="card card-body">
                        Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
                    </div>
                </div>
                <div className="collapse" id="collapseCreateTask">
                    <div className="card card-body">
                        Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}