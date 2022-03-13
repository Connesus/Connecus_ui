import React, { useState, useEffect } from "react";
import './style.css'

export default function Poll() {

    let [selected, setSelected] = useState(null)

    return (
        <>
        <div className="wrapper">
            <header>Bình chọn</header>
            <div className="poll-area">
                <label className={`${selected === 1 ? "selected" : ""}`} onClick={() => setSelected(1)}>
                    <div className="select-option">
                        <div className="column">
                            <span className="circle"></span>
                            <span className="text">HTML</span>
                        </div>
                        <span className="percent">30%</span>
                    </div>
                    <p className="select-option-description">This is short description</p>
                    <div className="progress" ></div>
                </label>
                <label className={`${selected === 2 ? "selected" : ""}`} onClick={() => setSelected(2)}>
                    <div className="select-option">
                        <div className="column">
                        <span className="circle"></span>
                        <span className="text">Java</span>
                        </div>
                        <span className="percent">20%</span>
                    </div>
                    <p className="select-option-description">This is short description</p>
                    <div className="progress" ></div>
                </label>
                <label className={`${selected === 3 ? "selected" : ""}`} onClick={() => setSelected(3)}>
                    <div className="select-option">
                        <div className="column">
                        <span className="circle"></span>
                        <span className="text">Python</span>
                        </div>
                        <span className="percent">40%</span>
                    </div>
                    <p className="select-option-description">This is short description</p>
                    <div className="progress" ></div>
                </label>
                <label className={`${selected === 4 ? "selected" : ""}`} onClick={() => setSelected(4)}>
                    <div className="select-option">
                        <div className="column">
                        <span className="circle"></span>
                        <span className="text">jQuery</span>
                        </div>
                        <span className="percent">10%</span>
                    </div>
                    <p className="select-option-description">This is short description</p>
                    <div className="progress"></div>
                </label>
            </div>
        </div>
        </>
    )
}