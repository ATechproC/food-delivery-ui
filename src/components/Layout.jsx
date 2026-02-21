import React from 'react'
import Signup from './Signup'
import { Outlet } from 'react-router'

const Layout = () => {
    return <>
        <Signup />
        <Outlet />
    </>
}

export default Layout