import React, { useState } from 'react';
import { Icons } from '../utils/Icons';
import { useToast } from '../context/ToastContext';
import { useData } from '../context/DataContext';

const ContentModeration = () => {
    const [activeTab, setActiveTab] = useState('Reported Posts');
    const [searchTerm, setSearchTerm] = useState('');
    const showToast = useToast();
    const { updateUserStatus } = useData();

    const tabs = ['Reported Profiles', 'Reported Posts', 'Reported Reviews', 'Image Verification', 'Inappropriate Messages'];

    // Mock data internally for this view
    const mockReports = [
        { id: 'FLG-809', type: 'Image (Gallery)', author: 'Delhi Caterers', reason: 'Inappropriate Imagery', status: 'Review Needed' },
        { id: 'FLG-810', type: 'Review (Text)', author: 'Alok Sharma', reason: 'Spam / Fake', status: 'Review Needed' },
        { id: 'FLG-811', type: 'Profile (Bio)', author: 'User U-099', reason: 'Fake Identity', status: 'Review Needed' }
    ];

    const mockMessageReports = [
        { id: 'BLK-001', reportedBy: 'Priya Singh', offender: 'Rahul Verma', reason: 'Abusive Language', time: '10 mins ago', status: 'Review Needed' },
        { id: 'BLK-002', reportedBy: 'Sita Sharma', offender: 'Amit Kumar', reason: 'Inappropriate Photos', time: '1 hour ago', status: 'Review Needed' },
        { id: 'BLK-003', reportedBy: 'Neha Gupta', offender: 'Vikas Singh', reason: 'Harassment', time: '3 hours ago', status: 'Warned' }
    ];

    return (
        <div className="glass-card animate-slide-up">
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
                    <button className="btn-premium btn-secondary" onClick={() => showToast('Opening Auto-Filters Configuration', 'success')}>Auto-Filters</button>
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
                        {activeTab === 'Inappropriate Messages' ? (
                            <tr>
                                <th>Block ID</th>
                                <th>Reported By</th>
                                <th>Offending User</th>
                                <th>Report Reason</th>
                                <th>Status</th>
                                <th>Admin Actions</th>
                            </tr>
                        ) : (
                            <tr>
                                <th>Flag ID</th>
                                <th>Content Type</th>
                                <th>Posted By</th>
                                <th>Reason for Flag</th>
                                <th>Status</th>
                                <th>Review Actions</th>
                            </tr>
                        )}
                    </thead>
                    <tbody>
                        {activeTab === 'Inappropriate Messages' ? (
                            mockMessageReports.map((report, idx) => (
                                <tr key={idx}>
                                    <td style={{ fontWeight: 600 }}>{report.id}</td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <Icons.Users />
                                            {report.reportedBy}
                                        </div>
                                    </td>
                                    <td style={{ color: 'var(--color-kumkum)', fontWeight: 600 }}>{report.offender}</td>
                                    <td>
                                        <span className="status-badge danger" style={{ background: 'transparent', border: '1px solid var(--status-danger)' }}>
                                            {report.reason}
                                        </span>
                                    </td>
                                    <td><span className={report.status === 'Warned' ? 'status-badge success' : 'status-badge warning'}>{report.status}</span></td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button className="btn-premium btn-action btn-view" onClick={() => showToast(`Viewing chat between ${report.reportedBy} & ${report.offender}`, 'info')}>View Chat</button>
                                            <button className="btn-premium btn-action btn-secondary" style={{ background: 'var(--color-dark-haldi)', color: 'white' }} onClick={() => showToast(`Warning issued to ${report.offender}`, 'warning')}>Issue Warning</button>
                                            <button className="btn-premium btn-action btn-approve" style={{ background: 'var(--color-border)', color: 'var(--color-text-main)' }} onClick={() => showToast('Report Ignored', 'success')}>Ignore</button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : activeTab === 'Reported Profiles' || activeTab === 'Reported Posts' || activeTab === 'Reported Reviews' ? (
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
                                            <button className="btn-premium btn-action btn-view" onClick={() => showToast('Opening Post Viewer...', 'success')}>View Post</button>
                                            <button className="btn-premium btn-action btn-reject" style={{ background: 'var(--color-maroon)' }} onClick={() => showToast('Content Deleted Permanently', 'error')}>Delete Content</button>
                                            <button className="btn-premium btn-action btn-approve" style={{ background: 'var(--color-border)', color: 'var(--color-text-main)' }} onClick={() => showToast('Report Ignored', 'success')}>Ignore</button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : activeTab === 'Image Verification' ? (
                            [
                                { id: 'IMG-001', author: 'Neha Gupta', type: 'Profile Verification', img: 'User Upload', status: 'Pending Model Scan' },
                                { id: 'IMG-002', author: 'Raj Event Decorators', type: 'Portfolio Gallery', img: 'Stage Photo 3', status: 'Flagged (Watermark)' }
                            ].map((imgReq, idx) => (
                                <tr key={idx}>
                                    <td style={{ fontWeight: 600 }}>{imgReq.id}</td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <Icons.Image />
                                            {imgReq.type}
                                        </div>
                                    </td>
                                    <td>{imgReq.author}</td>
                                    <td style={{ color: 'var(--color-kumkum)' }}>{imgReq.img}</td>
                                    <td><span className={imgReq.status.includes('Scan') ? 'status-badge info' : 'status-badge danger'}>{imgReq.status}</span></td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button className="btn-premium btn-action btn-view" onClick={() => showToast('Opening Image Viewer...', 'info')}>View Image</button>
                                            <button className="btn-premium btn-action btn-approve" onClick={() => showToast('Image Approved', 'success')}><Icons.CheckCircle /></button>
                                            <button className="btn-premium btn-action btn-reject" style={{ backgroundColor: 'var(--color-maroon)' }} onClick={() => showToast('Image Rejected', 'error')}><Icons.XCircle /></button>
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
