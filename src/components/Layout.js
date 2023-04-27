import React from 'react'
import { Outlet } from 'react-router'
import Header from './Header'

export default function Layout() {
  return (
    <div>
        <Header/> {/*Header component'll be included in all the children components*/}
        <Outlet/> {/*represents child routes: <HomePage/> & <LoginPage/>*/}
    </div>
  )
}
