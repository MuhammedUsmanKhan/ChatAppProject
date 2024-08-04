import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useLocation, useNavigate } from 'react-router-dom'
import Sidebar, { SidebarItem } from './Components/Drawer/Sidebar'
import { BarChart3, Tv, MessageSquareMore, BriefcaseBusiness, FilePen, LayoutDashboard, LogIn, ShoppingCart, UsersRound, LogOut } from 'lucide-react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './views/Dashboard'
import { Link } from 'react-router-dom'
import Chat from './views/Chat/Chat'
import JoinRoom from './views/Join/Join'
import { useDispatch, useSelector } from "react-redux";
import { userLogin, userLogout } from './store/slices/UserProfileSlice'
import SignIn from './views/SignIn/SignIn'
import SignUp from './views/Signup/SignUp'
import Home from './views/Home/Home'
import UserChat from './views/UserChat/UserChat'
import { useEffect } from 'react'
import axios from 'axios'

function App() {

  const navigate = useNavigate(); // Get the navigate function

  const location = useLocation();

  const dispatch = useDispatch()

  const { darkTheme, user, isLogin, baseUrl, baseUrlSocketIo } = useSelector((state) => state.userprofile)

  useEffect(() => {

    const getProfile = async () => {
      try {
        let response = await axios.get(
          `${baseUrl}/profile`,
          {
            withCredentials: true,
          });

        console.log("response: ", response);

        dispatch(userLogin({
          payload: response.data
        }))
      } catch (error) {

        dispatch(userLogout())

        navigate('/signin')

        console.log("axios error: ", error);

      }

    }

    getProfile();

  }, [dispatch, navigate, baseUrl])


  const logOutUser = async () => {

    try {

      let response = await axios.get(
        `${baseUrl}/logout`,
        {
          withCredentials: true,
        });

      dispatch(userLogout())

      navigate('/signin')

      console.log("response: ", response);


    } catch (error) {

      console.log("error in logging Out: ", error);

    }

  }


  return (
    <>
      <Routes>
        {
          (isLogin === true) ?
            <>
              <Route path='/' element={<Home />} />
              <Route path='/userchat/:id' element={<UserChat />} />
              <Route path='*' element={<Navigate to={'/'} replace={true} />} />
            </>
            : <>
              <Route path='/signin' element={<SignIn />} />
              <Route path='/signup' element={<SignUp />} />
            </>
        }
      </Routes>
      {location.pathname !== '/signup' && location.pathname !== '/signin' && (
        <main>

          <Sidebar>
            {
              (isLogin === true) ?
                <>
                  <Link to={'/'}>
                    <SidebarItem icon={<LayoutDashboard size={20} />} text={'Dashboard'} />
                  </Link>
                  <Link to={'/userchat/chatarea'}>
                    <SidebarItem icon={<MessageSquareMore size={20} />} text={'Chat'} />
                  </Link>
                  <SidebarItem icon={<LogOut size={20} />} text={'Logout'} onClick={logOutUser} />
                </>
                : null
            }
            {/* <Link to={'/joinroom'}>
              <SidebarItem icon={<Tv size={20} />} text={'Join'} />
            </Link> */}
          </Sidebar>
        </main>
      )}
      {/* <Dashboard /> */}
    </>
  )
}

export default App
