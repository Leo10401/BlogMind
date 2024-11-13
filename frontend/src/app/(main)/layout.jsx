import MainNavbar from '@/components/MainNavbar'
import React from 'react'

const Layout = ({ children }) => {
  return (
    <>
      <MainNavbar />
      {children}
    </>
  )
}

export default Layout