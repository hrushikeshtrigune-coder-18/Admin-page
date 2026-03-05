import React, { useState } from 'react';
import { MOCK_SYSTEM_AUDIT_LOGS, getBadgeClass } from '../utils/mockData';
import { Icons } from '../utils/Icons';
import { useToast } from '../context/ToastContext';

const PlatformSettings = () => {
    const [activeTab, setActiveTab] = useState('General Settings');
    const showToast = useToast();
    const tabs = ['General Settings', 'Roles & Permissions', 'Communications', 'API Config', 'System Audit Logs'];

    return (
        <div className="glass-card animate-slide-up" style={{ padding: '32px' }}>
            <div className="section-header" style={{ marginBottom: '24px' }}>
                <h3 className="section-title">Platform Configuration & Administration</h3>
                {activeTab !== 'System Audit Logs' ? (
                    <button className="btn-premium btn-primary" onClick={() => showToast('Settings Saved Successfully', 'success')}><Icons.CheckCircle /> Save Changes</button>
                ) : (
                    <button className="btn-premium btn-secondary" onClick={() => showToast('Audit Export Started', 'info')}><Icons.Download /> Export Audit</button>
                )}
            </div>

            <div className="inner-tabs" style={{ marginBottom: '32px' }}>
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

            {activeTab === 'General Settings' && (
                <div className="form-grid animate-slide-up">
                    <div className="form-item">
                        <label>Global Commission Rate (%)</label>
                        <input type="number" defaultValue={10} min={1} max={100} />
                    </div>

                    <div className="form-item">
                        <label>Minimum Payout Threshold (₹)</label>
                        <input type="number" defaultValue={5000} step={1000} />
                    </div>

                    <div className="form-item">
                        <label>Content Moderation Mode</label>
                        <select defaultValue="Moderate">
                            <option value="Strict">Strict (Manual Review All Posts)</option>
                            <option value="Moderate">Moderate (Auto-flag suspicious)</option>
                            <option value="Light">Light (Community Reporting)</option>
                        </select>
                    </div>

                    <div className="form-item">
                        <label>Maintenance Mode Toggle</label>
                        <select defaultValue="Off">
                            <option value="Off">System Online (Normal Operation)</option>
                            <option value="On">Maintenance Mode (Admins Only)</option>
                        </select>
                    </div>

                    <div className="form-item full-width" style={{ marginTop: '12px' }}>
                        <label>System-Wide Broadcast Announcement</label>
                        <textarea
                            rows="4"
                            placeholder="Type a message to push to all registered users and vendors instantly..."
                            style={{ resize: 'vertical' }}
                        ></textarea>
                    </div>
                </div>
            )}

            {activeTab === 'System Audit Logs' && (
                <div className="premium-table-container animate-slide-up">
                    <table className="premium-table">
                        <thead>
                            <tr>
                                <th>Log ID</th>
                                <th>Timestamp</th>
                                <th>Admin User</th>
                                <th>Action Performed</th>
                                <th>Target Object</th>
                                <th>IP Address</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MOCK_SYSTEM_AUDIT_LOGS.map(log => (
                                <tr key={log.id}>
                                    <td style={{ fontWeight: 600, color: '#6b7280' }}>{log.id}</td>
                                    <td>{log.timestamp}</td>
                                    <td style={{ fontWeight: 600 }}>{log.admin}</td>
                                    <td>{log.action}</td>
                                    <td>{log.target}</td>
                                    <td style={{ fontFamily: 'monospace', color: '#6b7280' }}>{log.ip}</td>
                                    <td><span className={getBadgeClass(log.status)}>{log.status}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {(activeTab === 'Roles & Permissions' || activeTab === 'Communications' || activeTab === 'API Config') && (
                <div style={{ textAlign: 'center', padding: '60px', color: '#6b7280' }} className="animate-slide-up">
                    <Icons.Settings />
                    <p style={{ marginTop: '16px' }}>{activeTab} module is under construction.</p>
                </div>
            )}
        </div>
    );
};

export default PlatformSettings;
