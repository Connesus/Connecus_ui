import React, {useState, useEffect} from 'react';
import {AiOutlineCloudUpload} from "react-icons/ai";
import Footer from "@component/Footer";
import SideNavbar from "@component/SideNavbar"
import {storeFiles} from '@utils/web3.storage'
import { utils, transactions } from "near-api-js";

import './styles/CreateDao.css';

const CreateDao = () => {

    const [thumbnail, setThumbnail] = useState(null)

    const [imageUrl, setImageUrl] = useState(null)

    const [daoInformation, setDaoInformation] = useState({})

    const onFileUpload = (event) => {
        console.log(event.target.files[0])
        setThumbnail(event.target.files[0])
        const imageUrl = window.URL.createObjectURL(event.target.files[0]);
        setImageUrl(imageUrl)
    }

    const onFormChange = (event, name) => {
        setDaoInformation({
            ...daoInformation,
            [name]: event.target.value
        })
    }

    const submitCreate = async () => {
        const {name, symbol, purpose, facebook, twitter, discord, instagram} = daoInformation
        if (!name || !symbol || !purpose || !thumbnail?.type?.indexOf("image/") === 0) {
            alert("Please fulfill the form")
            return
        }
        try {
            const cid = await storeFiles([thumbnail])
            const thumbnailURL = `https://${cid}.ipfs.dweb.link/${thumbnail.name}`
            const daoArg = {
                token_contract_id: window.FtContract.contractId,
                metadata: {
                    name, 
                    symbol, 
                    purpose, 
                    facebook: facebook || null, 
                    twitter: twitter || null, 
                    discord: discord || null, 
                    instagram: instagram || null, 
                    thumbnail: thumbnailURL},
                owner_id: window.accountId
            }
            const minRequiredDeposit = await window.FactoryContract.get_required_deposit({args: daoArg, account_id: accountId})
            await window.FactoryContract.create_dao(
                {
                    args: daoArg
                }, "300000000000000", minRequiredDeposit
            )
        } catch (e) {
            console.log(e)
        }
        
    }

    return (
        <div>
            <SideNavbar />
            <div className='create-dao'>
                <div className='create-dao--left'>
                    <div className='input__box--file'>
                        <label style={{width: '100%', height: '100%'}}>
                            {!imageUrl && <div className='input__box--file-inner'>
                                <div className='input__box-text'>
                                    <AiOutlineCloudUpload fontSize={40}/>
                                    <p>Click to upload your thumbnail</p>
                                </div>

                                <p className='input__box-note'>Use high-quality JPG or PNG less than 20 MB</p>
                            </div>}
                            {imageUrl && <img className="input__box--file-inner" src={imageUrl} alt="" />}
                            <input type='file' style={{width: 0, height: 0}} onChange={(event) => onFileUpload(event)}/>
                        </label>
                    </div>
                </div>

                <div className="create-dao--right">
                    <div className="row container">
                        <div className="text-center create-dao-page-title">
                            Create your own community and enjoy :))
                        </div>
                        <div className="col-6">
                            <label className="form-label">Dao's name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                
                                onChange={(event) => onFormChange(event, "name")}
                            />
                        </div>
                        <div className="col-6">
                            <label className="form-label">Dao's symbol</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                
                                onChange={(event) => onFormChange(event, "symbol")}
                            />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Purpose</label>
                            <textarea 
                                type="text" 
                                className="form-control" 
                                
                                onChange={(event) => onFormChange(event, "purpose")}
                            />
                        </div>
                        <div className='create-dao__separator'>
                            <div className='create-dao__separator-line'/>
                            <div className='create-dao__separator-text'>DAO's social links (not required)</div>
                        </div>
                        <div className="col-6">
                            <label className="form-label">Facebook</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                
                                onChange={(event) => onFormChange(event, "facebook")}
                            />
                        </div>
                        <div className="col-6">
                            <label className="form-label">Twitter</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="exampleInputEmail1" 
                                aria-describedby="emailHelp"
                                onChange={(event) => onFormChange(event, "twitter")}
                            />
                        </div>
                        <div className="col-6">
                            <label className="form-label">Discord</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                
                                onChange={(event) => onFormChange(event, "discord")}
                            />
                        </div>
                        <div className="col-6">
                            <label className="form-label">Instagram</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                
                                onChange={(event) => onFormChange(event, "instagram")}
                            />
                        </div>
                        <div className="d-flex justify-content-center mt-3">
                            <button className="btn btn-dark w-50" onClick={submitCreate}>Create</button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    )
}

export default CreateDao;