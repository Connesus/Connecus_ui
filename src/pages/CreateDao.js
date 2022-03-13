import React from 'react';
import {AiOutlineCloudUpload} from "react-icons/ai";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import InputField from "../components/InputField";
import Button from "../components/Button";

import './styles/CreateDao.css';

const CreateDao = () => {
    return (
        <div>
            <Navbar/>

            <div className='create-dao'>
                <div className='create-dao--left'>
                    <div className='input__box--file'>
                        <label style={{width: '100%', height: '100%'}}>
                            <div className='input__box--file-inner'>
                                <div className='input__box-text'>
                                    <AiOutlineCloudUpload fontSize={40}/>
                                    <p>Click to upload your thumbnail</p>
                                </div>

                                <p className='input__box-note'>Use high-quality JPG or PNG less than 20 MB</p>
                            </div>
                            <input type='file' style={{width: 0, height: 0}}/>
                        </label>
                    </div>
                </div>

                <div className='create-dao--right'>
                    <InputField type={'text'} label={"Your DAO's name"}/>
                    <InputField type={'text'} label={"Your DAO's symbol"}/>

                    <div className='create-dao__separator'>
                        <div className='create-dao__separator-line'/>
                        <div className='create-dao__separator-text'>DAO's social links (not required)</div>
                    </div>

                    <InputField type={'text'} label={"Facebook"}/>
                    <InputField type={'text'} label={"Twitter"}/>
                    <InputField type={'text'} label={"Instagram"}/>
                    <InputField type={'text'} label={"Discord"}/>

                    <div className='create-dao__btn'>
                        <Button type={'primary'} text={'Create DAO'}/>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    )
}

export default CreateDao;