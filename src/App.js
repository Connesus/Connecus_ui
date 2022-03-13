import 'regenerator-runtime/runtime'
import React from 'react'
import { login, logout } from './utils'
import getConfig from './config'
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import DaoPage from './pages/Dao'

const { networkId, contractName } = getConfig(process.env.NODE_ENV || 'development')

export default function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DaoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
