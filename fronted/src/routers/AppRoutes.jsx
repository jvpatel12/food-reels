import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Landing from '../pages/Landing'
import UserRegister from '../pages/UserRegister'
import UserLogin from '../pages/UserLogin'
import PartnerRegister from '../pages/PartnerRegister'
import PartnerLogin from '../pages/PartnerLogin'
import Home from '../general/Home'
import CreateFoodParnter from '../food-parnter/CreateFoodParnter'
import Profile from '../food-parnter/Profile'
import PartnerProfile from '../food-parnter/PartnerProfile'

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/browse' element={<Home/>}/>
        <Route path="/user/register" element={<UserRegister/>} />
        <Route path="/user/login" element={<UserLogin/>} />
        <Route path="/food-partner/register" element={<PartnerRegister/>} />
        <Route path="/food-partner/login" element={<PartnerLogin/>} />
        <Route path='/create-food' element={<CreateFoodParnter/>}/>
        <Route path='/partner/:partnerId' element={<PartnerProfile/>}/>
        <Route path='/food-partner/profile' element={<Profile/>}/>
      </Routes>
    </Router>
  )
}

export default AppRoutes