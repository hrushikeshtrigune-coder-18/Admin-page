import React, { useState } from 'react';
import { Icons } from '../utils/Icons';

const ContentModeration = () => {
    const [activeTab, setActiveTab] = useState('Reported Posts');
    const [searchTerm, setSearchTerm] = useState('');

    const tabs = ['Reported Profiles', 'Reported Posts', 'Reported Reviews', 'Image Verification'];

    // Mock data internally for this view
    const mockReports = [
        { id: 'FLG-809', type: 'Image (Gallery)', author: 'Delhi Caterers', reason: 'Inappropriate Imagery', status: 'Review Needed' },
        { id: 'FLG-810', type: 'Review (Text)', author: 'Alok Sharma', reason: 'Spam / Fake', status: 'Review Needed' }
    ];

    return (
        <div className="glass-card animate-fade-in">
            <div className="section-header">
                <h3 className="section-title">Content Moderation Feed</h3>
                <div className="header-tools">
                    <div className="search-box">
                        <Icons.Search />
                        <input
                            type="text"
                            placeholder="Search flagged content..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="btn-premium btn-secondary">Auto-Filters</button>
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
                    <thead>
                        <tr>
                            <th>Flag ID</th>
                            <th>Content Type</th>
                            <th>Posted By</th>
                            <th>Reason for Flag</th>
                            <th>Status</th>
                            <th>Review Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activeTab === 'Reported Posts' || activeTab === 'Reported Reviews' ? (
                            mockReports.map((report, idx) => (
                                <tr key={idx}>
                                    <td style={{ fontWeight: 600 }}>{report.id}</td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            {report.type.includes('Image') ? <Icons.Image /> : <Icons.FileText />}
                                            {report.type}
                                        </div>
                                    </td>
                                    <td>{report.author}</td>
                                    <td>
                                        <span className="status-badge warning" style={{ background: 'transparent', border: '1px solid var(--status-warning)' }}>
                                            {report.reason}
                                        </span>
                                    </td>
                                    <td><span className="status-badge danger">{report.status}</span></td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button className="btn-premium btn-action btn-view">View Post</button>
                                            <button className="btn-premium btn-action btn-reject" style={{ background: 'var(--color-maroon)' }}>Delete Content</button>
                                            <button className="btn-premium btn-action btn-approve" style={{ background: 'var(--color-border)', color: 'var(--color-text-main)' }}>Ignore</button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                                        <Icons.CheckCircle />
                                        <p>No pending {activeTab.toLowerCase()} in the queue.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ContentModeration;
