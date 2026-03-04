import React, { useState } from 'react';
import { MOCK_USERS, getBadgeClass } from '../utils/mockData';
import { Icons } from '../utils/Icons';

const UserManager = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('All Users');

    const tabs = ['All Users', 'Active Users', 'Suspended / Blocked', 'Reported Profiles', 'Activity Logs', 'Delete Requests'];

    // Only Users for this component
    const users = MOCK_USERS.filter(u => u.role === 'User');

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.id.toLowerCase().includes(searchTerm.toLowerCase());

        if (activeTab === 'Active Users') return matchesSearch && user.status === 'Active';
        if (activeTab === 'Suspended / Blocked') return matchesSearch && user.status === 'Suspended';
        if (activeTab === 'Reported Profiles') return matchesSearch && user.reports > 0;

        return matchesSearch;
    });

    return (
        <div className="glass-card animate-fade-in">
            <div className="section-header">
                <h3 className="section-title">User Management Hub</h3>
                <div className="header-tools" style={{ display: 'flex', gap: '12px' }}>
                    <div className="search-box">
                        <Icons.Search />
                        <input
                            type="text"
                            placeholder="Search users by name or ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="inner-tabs">
                {tabs.map(tab => (
                    <div
                        key={tab}
                        className={`inner-tab ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </div>
                ))}
            </div>

            <div className="premium-table-container">
                <table className="premium-table">
                    {activeTab === 'Activity Logs' ? (
                        <tbody>
                            <tr>
                                <td style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
                                    <Icons.FileText />
                                    <p style={{ marginTop: '12px' }}>Activity Logs Database Connected. Fetching streams...</p>
                                </td>
                            </tr>
                        </tbody>
                    ) : activeTab === 'Delete Requests' ? (
                        <tbody>
                            <tr>
                                <td style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
                                    No pending account deletion requests at this time.
                                </td>
                            </tr>
                        </tbody>
                    ) : (
                        <>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Date Joined</th>
                                    <th>Account Flags</th>
                                    <th>Status</th>
                                    <th>Management Controls</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map(user => (
                                        <tr key={user.id}>
                                            <td style={{ fontWeight: 600 }}>{user.id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.joined}</td>
                                            <td>
                                                {user.reports > 0 ? (
                                                    <span className="status-badge danger" style={{ backgroundColor: 'transparent', border: '1px solid var(--status-danger)' }}>
                                                        <Icons.AlertTriangle /> {user.reports} Report{user.reports > 1 ? 's' : ''}
                                                    </span>
                                                ) : (
                                                    <span style={{ color: '#10b981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                        <Icons.CheckCircle /> Clean Record
                                                    </span>
                                                )}
                                            </td>
                                            <td><span className={getBadgeClass(user.status)}>{user.status}</span></td>
                                            <td>
                                                <div style={{ display: 'flex', gap: '8px' }}>
                                                    <button className="btn-premium btn-action btn-view">Profile</button>
                                                    {user.status !== 'Suspended' ? (
                                                        <button className="btn-premium btn-action btn-reject" style={{ backgroundColor: 'var(--color-maroon)' }}><Icons.Lock /> Suspend</button>
                                                    ) : (
                                                        <button className="btn-premium btn-action btn-info"><Icons.Unlock /> Restore</button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: 'center', padding: '32px', color: '#6b7280' }}>
                                            No users found matching your filters.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </>
                    )}
                </table>
            </div>
        </div >
    );
};

export default UserManager;
