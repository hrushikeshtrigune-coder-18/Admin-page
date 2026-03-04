import React from 'react';
import { Icons } from '../utils/Icons';
import logoImage from '../assets/logo3.jpeg';

const AdminLayout = ({ children, activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'dashboard', label: 'Dashboard', icon: Icons.Chart },
        { id: 'kyc', label: 'KYC Management', icon: Icons.Shield },
        { id: 'users', label: 'Users', icon: Icons.Users },
        { id: 'vendors', label: 'Vendors', icon: Icons.Users },
        { id: 'requests', label: 'Requests & Interactions', icon: Icons.Message },
        { id: 'reports', label: 'Reports & Analytics', icon: Icons.Chart },
        { id: 'moderation', label: 'Content Moderation', icon: Icons.Shield },
        { id: 'settings', label: 'System Settings', icon: Icons.Settings },
    ];

    const getCurrentTitle = () => {
        return tabs.find(t => t.id === activeTab)?.label || 'Dashboard';
    };

    return (
        <div className="admin-container">
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="sidebar-header" style={{ padding: '0', justifyContent: 'center', height: '160px', width: '100%', flexDirection: 'column', alignItems: 'center' }}>
                    <img src={logoImage} alt="Shubh Vivah Harmony Hub" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>

                <nav className="nav-menu">
                    {tabs.map(tab => (
                        <div
                            key={tab.id}
                            className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <span className="nav-icon"><tab.icon /></span>
                            {tab.label}
                        </div>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                <header className="top-header">
                    <h1 className="page-title">{getCurrentTitle()}</h1>

                    <div className="header-tools">
                        <button className="icon-btn">
                            <Icons.Search />
                        </button>
                        <button className="icon-btn">
                            <Icons.Bell />
                            <span className="notification-badge"></span>
                        </button>

                        <button className="icon-btn" title="Logout" style={{ color: 'var(--status-danger)', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
                            <Icons.LogOut />
                        </button>
                    </div>
                </header>

                <div className="content-wrapper">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
