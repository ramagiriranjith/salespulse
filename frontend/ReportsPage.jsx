import React from 'react'
import Page from "../components/Page";
import ReportsNavBar from '../components/ReportsNavbar';
import { Outlet } from 'react-router-dom';
export default function ReportsPage() {
    return (
        <Page className='flex'>
            <ReportsNavBar />
            <div className='flex-1'>
                <Outlet />
            </div>
        </Page>
    )
}
