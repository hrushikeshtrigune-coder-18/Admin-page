import React, { useState } from 'react';
import { Icons } from '../utils/Icons';
import logoImage from '../assets/logo3.jpeg';
import { useToast } from '../context/ToastContext';

const AdminLayout = ({ children, activeTab, setActiveTab }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const showToast = useToast();

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
            <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
                <div className="sidebar-header">
                    <div className="logo-wrapper">
                        {isCollapsed ? (
                            <div style={{ color: 'var(--color-kumkum)', fontWeight: 'bold', fontSize: '1.2rem' }}>SV</div>
                        ) : (
                            <img src={logoImage} alt="Shubh Vivah Harmony Hub" className="sidebar-logo" />
                        )}
                    </div>
                </div>

                <nav className="nav-menu">
                    {tabs.map(tab => (
                        <div
                            key={tab.id}
                            className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                            title={isCollapsed ? tab.label : ''}
                        >
                            <span className="nav-icon"><tab.icon /></span>
                            <span className="nav-label">{tab.label}</span>
                        </div>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className={`main-content ${isCollapsed ? 'expanded' : ''}`}>
                <header className="top-header">
                    <div className="header-left">
                        <button className="toggle-sidebar-btn" onClick={() => setIsCollapsed(!isCollapsed)}>
                            <Icons.Menu />
                        </button>
                        <h1 className="page-title">{getCurrentTitle()}</h1>
                    </div>

                    <div className="header-tools">
                        <div className="header-search">
                            <Icons.Search size={18} color="var(--color-text-main)" />
                            <input type="text" placeholder="Search across dashboard..." />
                        </div>

                        <button className="icon-btn" onClick={() => showToast('Opening Notifications', 'success')}>
                            <Icons.Bell />
                            <span className="notification-badge"></span>
                        </button>

                        <div className="user-profile" style={{ position: 'relative', paddingLeft: '24px', borderLeft: '1px solid var(--color-border)' }}>
                            <button className="icon-btn" onClick={() => setShowProfileMenu(!showProfileMenu)}>
                                <Icons.Settings />
                            </button>

                            {showProfileMenu && (
                                <div className="profile-dropdown">
                                    <div className="dropdown-header">
                                        <strong>Admin Settings</strong>
                                    </div>
                                    <button className="dropdown-item" onClick={() => { setShowProfileMenu(false); showToast('Settings Opened', 'success'); }}>
                                        <Icons.Settings />
                                        <span>Preferences</span>
                                    </button>
                                    <button className="dropdown-item text-danger" onClick={() => { setShowProfileMenu(false); showToast('Logged Out Successfully', 'success'); }}>
                                        <Icons.LogOut />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            )}
                        </div>
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
