import React from 'react'
import Page from "../components/Page";

import { Outlet } from 'react-router-dom';
import HRMNavbar from '../components/HRMNavbar';
export default function HRMPage() {
  return (
    <Page className='flex'>
      <HRMNavbar/>
      <div className='flex-1'>
        <Outlet />
      </div>
    </Page>
  )
}
