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
import Home from './pages/Home';
import CreateDao from "./pages/CreateDao";

const { networkId, contractName } = getConfig(process.env.NODE_ENV || 'development')

export default function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/create" element={<CreateDao />} />
          <Route path="/dao/:id" element={<DaoPage />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
