import React, { useState } from 'react';
import { getBadgeClass, MOCK_KYC_AUDIT } from '../utils/mockData';
import { Icons } from '../utils/Icons';
import { useToast } from '../context/ToastContext';
import { useData } from '../context/DataContext';

const KYCManager = () => {
    const [activeTab, setActiveTab] = useState('Pending');
    const [searchTerm, setSearchTerm] = useState('');
    const showToast = useToast();
    const { kyc, updateKycStatus } = useData();

    const handleApprove = (id) => {
        updateKycStatus(id, 'Approved');
        showToast(`${id} Approved Successfully`, 'success');
    };

    const handleReject = (id) => {
        updateKycStatus(id, 'Rejected');
        showToast(`${id} Rejected`, 'error');
    };

    const tabs = ['Pending', 'Approved', 'Rejected', 'Re-Submission', 'Audit Logs'];

    const filteredKYC = kyc.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.id.toLowerCase().includes(searchTerm.toLowerCase());

        if (activeTab === 'Pending') return matchesSearch && item.status === 'Pending';
        if (activeTab === 'Approved') return matchesSearch && item.status === 'Approved';
        if (activeTab === 'Rejected') return matchesSearch && item.status === 'Rejected';
        if (activeTab === 'Re-Submission') return matchesSearch && item.status === 'Re-Submission';

        return matchesSearch;
    });

    const filteredAuditLogs = MOCK_KYC_AUDIT.filter(log =>
        log.kycRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.admin.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="glass-card animate-slide-up">
            <div className="section-header">
                <h3 className="section-title">KYC & Verification Hub</h3>
                <div className="header-tools">
                    <div className="search-box">
                        <Icons.Search />
                        <input
                            type="text"
                            placeholder={activeTab === 'Audit Logs' ? "Search logs by ID or Admin..." : "Search by name or ID..."}
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
                    {activeTab !== 'Audit Logs' ? (
                        <>
                            <thead>
                                <tr>
                                    <th>Ref ID</th>
                                    <th>Name</th>
                                    <th>User Type</th>
                                    <th>Document Type</th>
                                    <th>Submission Date</th>
                                    <th>Status</th>
                                    <th>Review Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredKYC.length > 0 ? (
                                    filteredKYC.map(item => (
                                        <tr key={item.id}>
                                            <td style={{ fontWeight: 600 }}>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td><span style={{ color: item.type === 'Vendor' ? 'var(--color-saffron)' : 'var(--color-maroon)', fontWeight: 600 }}>{item.type}</span></td>
                                            <td>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                    <Icons.FileText /> {item.docType}
                                                </div>
                                            </td>
                                            <td>{item.date}</td>
                                            <td><span className={getBadgeClass(item.status)}>{item.status}</span></td>
                                            <td>
                                                <div style={{ display: 'flex', gap: '8px' }}>
                                                    <button className="btn-premium btn-action btn-view" onClick={() => showToast(`Opening Docs for ${item.id}`, 'success')}>Review Docs</button>
                                                    {item.status === 'Pending' && (
                                                        <>
                                                            <button className="btn-premium btn-action btn-approve" onClick={() => handleApprove(item.id)}><Icons.CheckCircle /> Approve</button>
                                                            <button className="btn-premium btn-action btn-reject" onClick={() => handleReject(item.id)}><Icons.XCircle /> Reject</button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" style={{ textAlign: 'center', padding: '32px', color: '#6b7280' }}>
                                            No {activeTab.toLowerCase()} submissions found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </>
                    ) : (
                        <>
                            <thead>
                                <tr>
                                    <th>Log ID</th>
                                    <th>KYC Ref</th>
                                    <th>Action Taken</th>
                                    <th>Admin Assessor</th>
                                    <th>Timestamp</th>
                                    <th>Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAuditLogs.map(log => (
                                    <tr key={log.id}>
                                        <td style={{ fontWeight: 600, color: '#6b7280' }}>{log.id}</td>
                                        <td style={{ fontWeight: 600 }}>{log.kycRef}</td>
                                        <td><span className={getBadgeClass(log.action === 'Approved' ? 'Approved' : 'Pending')}>{log.action}</span></td>
                                        <td>{log.admin}</td>
                                        <td>{log.timestamp}</td>
                                        <td style={{ fontSize: '0.85rem', color: '#4b5563', maxWidth: '300px' }}>{log.notes}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </>
                    )}
                </table>
            </div>
        </div>
    );
};

export default KYCManager;
