import React, { useState } from 'react';
import { getBadgeClass } from '../utils/mockData';
import { Icons } from '../utils/Icons';
import { useToast } from '../context/ToastContext';
import { useData } from '../context/DataContext';

const UserManager = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('All Users');
    const showToast = useToast();
    const { allUsers, toggleUserSuspension } = useData();

    const tabs = ['All Users', 'Active Users', 'Suspended / Blocked', 'Reported Profiles', 'Activity Logs', 'Delete Requests'];

    const handleToggleSuspension = (id, name, isSuspended) => {
        toggleUserSuspension(id);
        const action = isSuspended ? 'Access Restored' : 'User Suspended';
        showToast(action, isSuspended ? 'success' : 'error');
    };

    const filteredUsers = allUsers.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.id.toLowerCase().includes(searchTerm.toLowerCase());

        if (activeTab === 'Active Users') return matchesSearch && user.status === 'Active';
        if (activeTab === 'Suspended / Blocked') return matchesSearch && user.status === 'Suspended';
        if (activeTab === 'Reported Profiles') return matchesSearch && user.reports > 0;

        return matchesSearch;
    });

    return (
        <div className="glass-card animate-slide-up">
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
                        <>
                            <thead>
                                <tr>
                                    <th>Timestamp</th>
                                    <th>Admin User</th>
                                    <th>Action Performed</th>
                                    <th>Target Data</th>
                                    <th>IP Address</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { time: '10:45 AM', admin: 'Super Admin', action: 'Suspended Account', target: 'U-012', ip: '192.168.1.45' },
                                    { time: '09:20 AM', admin: 'Moderator_Priya', action: 'Approved Profile Photo', target: 'U-089', ip: '10.0.0.12' },
                                    { time: 'Yesterday', admin: 'System Auto', action: 'Flagged suspicious IP', target: 'U-104', ip: '45.22.11.90' },
                                    { time: 'Yesterday', admin: 'Super Admin', action: 'Reset Password Link Sent', target: 'U-005', ip: '192.168.1.45' },
                                ].map((log, idx) => (
                                    <tr key={idx}>
                                        <td style={{ color: '#6b7280' }}>{log.time}</td>
                                        <td style={{ fontWeight: 600 }}>{log.admin}</td>
                                        <td><span className="status-badge info" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--status-info)' }}>{log.action}</span></td>
                                        <td>{log.target}</td>
                                        <td style={{ fontSize: '0.85rem' }}>{log.ip}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </>
                    ) : activeTab === 'Delete Requests' ? (
                        <>
                            <thead>
                                <tr>
                                    <th>Request ID</th>
                                    <th>User Name</th>
                                    <th>Reason Given</th>
                                    <th>Days Pending</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { id: 'DEL-04', user: 'Rohan Gupta', reason: 'Found match outside platform', days: 2 },
                                    { id: 'DEL-05', user: 'Sneha Patel', reason: 'Not satisfied with service', days: 5 },
                                ].map((req, idx) => (
                                    <tr key={idx}>
                                        <td style={{ fontWeight: 600 }}>{req.id}</td>
                                        <td>{req.user}</td>
                                        <td>{req.reason}</td>
                                        <td><span className={req.days > 3 ? 'status-badge danger' : 'status-badge warning'}>{req.days} Days</span></td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <button className="btn-premium btn-action btn-reject" style={{ backgroundColor: 'var(--color-maroon)' }} onClick={() => showToast('Account Deleted', 'success')}>Approve Deletion</button>
                                                <button className="btn-premium btn-action btn-info" onClick={() => showToast('Request Cancelled', 'info')}>Cancel</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </>
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
                                                    <button className="btn-premium btn-action btn-view" onClick={() => showToast('Opening User Profile', 'info')}>Profile</button>
                                                    {user.status !== 'Suspended' ? (
                                                        <button className="btn-premium btn-action btn-reject" style={{ backgroundColor: 'var(--color-maroon)' }} onClick={() => handleToggleSuspension(user.id, user.name, false)}><Icons.Lock /> Suspend</button>
                                                    ) : (
                                                        <button className="btn-premium btn-action btn-info" onClick={() => handleToggleSuspension(user.id, user.name, true)}><Icons.Unlock /> Restore</button>
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
