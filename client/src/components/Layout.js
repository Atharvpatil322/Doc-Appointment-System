import React from 'react';
import "../styles/LayoutStyles.css";
// import { SidebarMenu } from '../Data/data';
import { adminMenu, userMenu} from "../Data/data";

import { Link , useLocation, useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { message , Badge} from "antd";


const Layout = ({children}) => {
  const {user} = useSelector(state => state.user); 
    // The `useLocation` hook is used to return the current location of a react component.
    // The useLocation hook in React Router returns the location object that represents the active URL. The location object contains the following properties : pathname, state, key. etc.
    const location = useLocation();
    const navigate = useNavigate();


    // logout funtion
    // This logout button will redirect user to login page.
    const handleLogout = () => {
      localStorage.clear();
      message.success("Logout Successfully");
      navigate("/login");
    };


    // --------DOCTOR MENU------
     const doctorMenu = [
      {
        name: "Home",
        path: "/",
        icon: "fa-solid fa-house",
      },
      {
        name: "Appointments",
        path: "/doctor-appointments",
        icon: "fa-solid fa-list",
      },
      {
        name: "Profile",
        path: `/doctor/profile/${user?._id}`,
        icon: "fa-solid fa-user",
      },
    ];
    // --------DOCTOR MENU------

   // redering menu list. If admin is logged in then show admin page otherwise show user page.
   const SidebarMenu = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu;

  return (
    <>
    <div className='main'>
        <div className='layout'>
            <div className='sidebar'>
                <div className='logo'>
                    <h6>DOC APP</h6>
                    <hr></hr>
                </div>
                {SidebarMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <>
                    <div className={`menu-item ${isActive && "active"}`}>
                      <i className={menu.icon}></i>
                      <Link to={menu.path}>{menu.name}</Link>
                    </div>
                  </>
                );
              })}
              <div className={`menu-item `} onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <Link to="/login">Logout</Link>
              </div>
            </div>
            <div className='content'>
                <div className='header'>
                  <div className='header-content' style={{cursor:"pointer"}}>
                  <Badge count={user?.notification.length}
                    onClick={() => {
                    navigate("/notification");
                    }}               
                    >
                    <i class="fa-solid fa-bell"></i>
                  </Badge>
                    <Link to="/profile">{user?.name}</Link> 
                  </div>
                </div>
                <div className='body'>{children}</div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Layout
