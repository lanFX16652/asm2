import React from 'react'
import { Outlet } from 'react-router-dom'
import classes from "./Layout.module.css";

import Siderbar from '../components/Sidebar/Siderbar';



const Layout = () => {
  return (
    <div className={classes.wrapper}>
        <Siderbar />
        <div className={classes['content-wrapper']}>
        <div className={classes['content-header']}></div>
            <Outlet/>
        </div>
    </div>
  )
}

export default Layout

