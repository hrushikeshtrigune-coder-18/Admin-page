import React, { useState } from 'react';
import { getBadgeClass, MOCK_VENDOR_PERFORMANCE } from '../utils/mockData';
import { Icons } from '../utils/Icons';
import { useToast } from '../context/ToastContext';
import { useData } from '../context/DataContext';

const VendorManager = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('All Vendors');
    const showToast = useToast();
    const { vendors, toggleUserSuspension } = useData();

    const handleToggleSuspension = (id, name, isSuspended) => {
        toggleUserSuspension(id);
        const action = isSuspended ? 'Access Restored' : 'Vendor Suspended';
        showToast(action, isSuspended ? 'success' : 'error');
    };

    const tabs = ['All Vendors', 'Active Vendors', 'Pending Approval', 'Blocked Vendors', 'Performance Metrics', 'Activity Logs'];

    const filteredVendors = vendors.filter(vendor => {
        const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vendor.id.toLowerCase().includes(searchTerm.toLowerCase());

        if (activeTab === 'Active Vendors') return matchesSearch && vendor.status === 'Active';
        if (activeTab === 'Blocked Vendors') return matchesSearch && vendor.status === 'Suspended';
        if (activeTab === 'Pending Approval') return matchesSearch && vendor.status === 'Pending';

        return matchesSearch;
    });

    return (
        <div className="glass-card animate-slide-up">
            <div className="section-header">
                <h3 className="section-title">Vendor Directory & Operations</h3>
                <div className="header-tools" style={{ display: 'flex', gap: '12px' }}>
                    <div className="search-box">
                        <Icons.Search />
                        <input
                            type="text"
                            placeholder="Search vendors..."
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
                    {activeTab === 'Performance Metrics' ? (
                        <>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Vendor Name</th>
                                    <th>Leads Gen</th>
                                    <th>Bookings</th>
                                    <th>Total Revenue</th>
                                    <th>Rating</th>
                                </tr>
                            </thead>
                            <tbody>
                                {MOCK_VENDOR_PERFORMANCE.map(perf => (
                                    <tr key={perf.id}>
                                        <td style={{ fontWeight: 600 }}>{perf.id}</td>
                                        <td>{perf.name}</td>
                                        <td>{perf.leads}</td>
                                        <td style={{ color: 'var(--status-success)', fontWeight: 600 }}>{perf.bookings}</td>
                                        <td>{perf.revenue}</td>
                                        <td><span className="status-badge" style={{ background: 'rgba(212, 175, 55, 0.2)', color: 'var(--color-maroon)' }}>⭐ {perf.rating}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </>
                    ) : activeTab === 'Activity Logs' ? (
                        <>
                            <thead>
                                <tr>
                                    <th>Timestamp</th>
                                    <th>Admin Assessor</th>
                                    <th>Action Performed</th>
                                    <th>Target Vendor</th>
                                    <th>Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { time: 'Today 11:30 AM', admin: 'Moderator_Karan', action: 'Approved Kyc Docs', target: 'V-045 (Royal Events)', notes: 'All docs clear.' },
                                    { time: 'Today 09:15 AM', admin: 'Super Admin', action: 'Suspended Listing', target: 'V-089 (Shree Caterers)', notes: 'Pending investigation.' },
                                    { time: 'Yesterday', admin: 'Moderator_Priya', action: 'Rejected Portfolio Image', target: 'V-012 (Glow Beauty)', notes: 'Watermark violated policy.' },
                                ].map((log, idx) => (
                                    <tr key={idx}>
                                        <td style={{ color: '#6b7280' }}>{log.time}</td>
                                        <td style={{ fontWeight: 600 }}>{log.admin}</td>
                                        <td><span className="status-badge info" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--status-info)' }}>{log.action}</span></td>
                                        <td>{log.target}</td>
                                        <td style={{ fontSize: '0.85rem' }}>{log.notes}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </>
                    ) : (
                        <>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Vendor Name</th>
                                    <th>Date Joined</th>
                                    <th>Flags</th>
                                    <th>Status</th>
                                    <th>Manage</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredVendors.length > 0 ? (
                                    filteredVendors.map(vendor => (
                                        <tr key={vendor.id}>
                                            <td style={{ fontWeight: 600 }}>{vendor.id}</td>
                                            <td>{vendor.name}</td>
                                            <td>{vendor.joined}</td>
                                            <td>
                                                {vendor.reports > 0 ? (
                                                    <span className="status-badge danger" style={{ backgroundColor: 'transparent', border: '1px solid var(--status-danger)' }}>
                                                        <Icons.AlertTriangle /> {vendor.reports} Report{vendor.reports > 1 ? 's' : ''}
                                                    </span>
                                                ) : (
                                                    <span style={{ color: '#10b981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                        <Icons.CheckCircle /> Clean Record
                                                    </span>
                                                )}
                                            </td>
                                            <td><span className={getBadgeClass(vendor.status)}>{vendor.status}</span></td>
                                            <td>
                                                <div style={{ display: 'flex', gap: '8px' }}>
                                                    <button className="btn-premium btn-action btn-view" onClick={() => showToast('Opening Vendor Profile', 'info')}>Profile</button>
                                                    {vendor.status !== 'Suspended' ? (
                                                        <button className="btn-premium btn-action btn-reject" style={{ backgroundColor: 'var(--color-maroon)' }} onClick={() => handleToggleSuspension(vendor.id, vendor.name, false)}><Icons.Lock /> Suspend</button>
                                                    ) : (
                                                        <button className="btn-premium btn-action btn-info" onClick={() => handleToggleSuspension(vendor.id, vendor.name, true)}><Icons.Unlock /> Restore</button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: 'center', padding: '32px', color: '#6b7280' }}>
                                            No vendors found matching your filters.
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

export default VendorManager;
