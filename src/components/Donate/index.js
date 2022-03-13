import React, { useState, useEffect } from "react";
import './style.css'

export default function Donate() {

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

    return (
        <>
        <div className="wrapper">
            <header>Donate</header>
            <div className="input-group mb-3 mt-3">
                <input 
                    min="0"
                    className="form-control" 
                    placeholder="Donate value" 
                    aria-label="Recipient's username" 
                    aria-describedby="button-addon2"
                    value={donateValue}
                    onChange={(event) => updateDonateValue(event)}
                />
                <button className="btn btn-secondary" type="button" id="button-addon2">Donate</button>
            </div>
        </div>
        </>
    )
}