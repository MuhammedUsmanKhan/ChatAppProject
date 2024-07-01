import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useLocation } from 'react-router-dom'
import Sidebar, { SidebarItem } from './Components/Drawer/Sidebar'
import { BarChart3, Tv, MessageSquareMore, BriefcaseBusiness, FilePen, LayoutDashboard, LogIn, ShoppingCart, UsersRound } from 'lucide-react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './views/Dashboard'
import { Link } from 'react-router-dom'
import Chat from './views/Chat/Chat'
import JoinRoom from './views/Join/Join'
import SignIn from './views/SignIn/SignIn'
import SignUp from './views/Signup/SignUp'
import Home from './views/Home/Home'
import UserChat from './views/UserChat/UserChat'
function App() {

  const location = useLocation();


  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        {/* <Route path='/joinroom' element={<JoinRoom />} />
        <Route path='/chat' element={<Chat />} /> */}
        <Route path='/userchat/:id' element={<UserChat />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='*' element={<Navigate to={'/'} replace={true} />} />
      </Routes>
      {location.pathname !== '/signup' && location.pathname !== '/signin' && (
        <main>
          <Sidebar>
            <Link to={'/'}>
              <SidebarItem icon={<LayoutDashboard size={20} />} text={'Dashboard'} />
            </Link>
            <Link to={'/joinroom'}>
              <SidebarItem icon={<Tv size={20} />} text={'Join'} />
            </Link>
            <Link to={'/userchat'}>
              <SidebarItem icon={<MessageSquareMore size={20} />} text={'Chat'} />
            </Link>
            <Link to={'/signin'}>
              <SidebarItem icon={<LogIn size={20} />} text={'Sign In'} />
            </Link>
            <Link to={'/signup'}>
              <SidebarItem icon={<FilePen size={20} />} text={'Sign Up'} />
            </Link>
          </Sidebar>
        </main>
      )}
      {/* <Dashboard /> */}
    </>
  )
}

export default App
