'use client';

import React, { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'

const HeaderSideBarWrapper = () => {
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const toggleMobileSidebar = () => {
        setIsMobileOpen(!isMobileOpen);
    };

    return (
        <>
            <Header toggleSidebar={toggleMobileSidebar} />
            <Sidebar isMobileOpen={isMobileOpen} toggleMobileSidebar={toggleMobileSidebar} />
        </>
    )
}

export default HeaderSideBarWrapper