import UserNavbar from '@/components/UserNavbar'
import React from 'react'

const Layout = ({ children }) => {
  return (
    <>
      <UserNavbar />
      {children}
    </>
  )
}

export default Layout