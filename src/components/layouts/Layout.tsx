// Layout.js
import React from 'react';
import Header from './Header';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <Header />
            <main style={{overflowX: "auto", padding: 32}}>{children}</main>
        </div>
    );
};

export default Layout;