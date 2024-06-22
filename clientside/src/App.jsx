import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar, { SidebarItem } from './Components/Drawer/Sidebar'
import { BarChart3, BriefcaseBusiness, FilePen, LayoutDashboard, LogIn, ShoppingCart, UsersRound } from 'lucide-react'
import Dashboard from './views/Dashboard'

function App() {

  return (
    <>
      <main>
        <Sidebar> 
          <SidebarItem icon={<LayoutDashboard size={20} />}   text={'Dashboard'} />
          <SidebarItem icon={<ShoppingCart  size={20} />} text={'Ecommerce'} />
          <SidebarItem icon={<BriefcaseBusiness size={20} />} text={'Products'} />
          <SidebarItem icon={<LogIn  size={20} />} text={'Sign In'} />
          <SidebarItem icon={<FilePen   size={20} />} text={'Sign Up'} />
        </Sidebar>
      </main>
      <Dashboard />
    </>
  )
}

export default App
