import React, { useState } from 'react';
import { MOCK_REQUESTS, getBadgeClass } from '../utils/mockData';
import { Icons } from '../utils/Icons';

const RequestMonitor = () => {
    const [activeTab, setActiveTab] = useState('Vendor Booking Requests');
    const [searchTerm, setSearchTerm] = useState('');

    const tabs = ['Interest Requests (User ↔ User)', 'Vendor Booking Requests', 'Disputes / Complaints', 'Chat Monitoring'];

    const filteredRequests = MOCK_REQUESTS.filter(req => {
        const matchesSearch = req.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.vendor.toLowerCase().includes(searchTerm.toLowerCase());

        if (activeTab === 'Vendor Booking Requests') return matchesSearch && req.type === 'Booking';
        if (activeTab === 'Interest Requests (User ↔ User)') return matchesSearch && req.type === 'Interest';
        if (activeTab === 'Disputes / Complaints') return matchesSearch && req.type === 'Dispute';

        return matchesSearch;
    });

    return (
        <div className="glass-card animate-fade-in">
            <div className="section-header">
                <h3 className="section-title">Interaction & Booking Monitor</h3>
                <div className="header-tools">
                    <div className="search-box">
                        <Icons.Search />
                        <input
                            type="text"
                            placeholder="Search by user or vendor..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="btn-premium btn-secondary"><Icons.Download /> Export Log</button>
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
                    {activeTab === 'Chat Monitoring' ? (
                        <tbody>
                            <tr>
                                <td style={{ textAlign: 'center', padding: '60px', color: '#6b7280' }}>
                                    <div style={{ fontSize: '2rem', marginBottom: '16px', color: 'var(--color-gold)' }}>
                                        <Icons.Message />
                                    </div>
                                    <h4 style={{ color: 'var(--color-maroon)', marginBottom: '8px' }}>Real-time Chat Monitor Endpoint</h4>
                                    <p>Select a flagged conversation from the Disputes tab to monitor chat history.</p>
                                </td>
                            </tr>
                        </tbody>
                    ) : (
                        <>
                            <thead>
                                <tr>
                                    <th>Req ID</th>
                                    <th>Initiator User</th>
                                    <th>Target Participant</th>
                                    <th>Interaction Type</th>
                                    <th>Date & Time</th>
                                    <th>Current Status</th>
                                    <th>Admin Intervention</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRequests.length > 0 ? (
                                    filteredRequests.map(req => (
                                        <tr key={req.id}>
                                            <td style={{ fontWeight: 600 }}>{req.id}</td>
                                            <td>{req.user}</td>
                                            <td style={{ color: req.type === 'Interest' ? 'inherit' : 'var(--color-saffron)', fontWeight: 600 }}>{req.vendor}</td>
                                            <td>
                                                <span style={{
                                                    padding: '4px 8px',
                                                    borderRadius: '4px',
                                                    background: req.type === 'Booking' ? 'rgba(212, 175, 55, 0.15)' :
                                                        req.type === 'Dispute' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(59, 130, 246, 0.15)',
                                                    color: req.type === 'Booking' ? 'var(--color-text-main)' :
                                                        req.type === 'Dispute' ? 'var(--status-danger)' : 'var(--status-info)',
                                                    fontWeight: 600
                                                }}>
                                                    {req.type}
                                                </span>
                                            </td>
                                            <td>{req.date}</td>
                                            <td><span className={getBadgeClass(req.status)}>{req.status}</span></td>
                                            <td>
                                                <div style={{ display: 'flex', gap: '8px' }}>
                                                    <button className="btn-premium btn-action btn-view"><Icons.Message /> View Chat</button>
                                                    {req.status === 'Reported' && (
                                                        <button className="btn-premium btn-action btn-reject" style={{ background: 'var(--color-maroon)' }}>Resolve Dispute</button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" style={{ textAlign: 'center', padding: '32px', color: '#6b7280' }}>
                                            No {activeTab.toLowerCase()} found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </>
                    )}
                </table>
            </div>
        </div>
    );
};

export default RequestMonitor;
