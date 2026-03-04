import React, { useState } from 'react';
import { STATS } from '../utils/mockData';
import { Icons } from '../utils/Icons';

const AnalyticsDashboard = () => {
    const [activeTab, setActiveTab] = useState('Overview Stats');
    const tabs = ['Overview Stats', 'User Growth Reports', 'Vendor Growth Reports', 'Booking & Revenue', 'Commission Config', 'KYC Stats'];

    return (
        <div className="animate-fade-in">
            <div className="section-header">
                <h3 className="section-title">Growth & Revenue Analytics</h3>
                <div className="header-tools">
                    <button className="btn-premium btn-secondary"><Icons.Download /> Export {activeTab} (CSV)</button>
                    <button className="btn-premium btn-secondary" style={{ background: 'var(--color-maroon)' }}><Icons.FileText /> Export PDF</button>
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

            {activeTab === 'Overview Stats' && (
                <div className="stats-container animate-fade-in">
                    {STATS.map((stat, idx) => (
                        <div className="stat-box" key={idx}>
                            <div className="stat-icon-wrapper">
                                {stat.icon === 'Users' && <Icons.Users />}
                                {stat.icon === 'Vendors' && <Icons.Users />}
                                {stat.icon === 'Shield' && <Icons.Shield />}
                                {stat.icon === 'Message' && <Icons.Message />}
                                {stat.icon === 'Chart' && <Icons.Chart />}
                            </div>
                            <div className="stat-details">
                                <div className="stat-label">{stat.label}</div>
                                <div className="stat-value">{stat.value}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {(activeTab !== 'Overview Stats') && (
                <div className="glass-card animate-fade-in" style={{ padding: '60px 40px', textAlign: 'center' }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        background: 'rgba(212, 175, 55, 0.1)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-gold)',
                        margin: '0 auto 24px auto',
                        fontSize: '2rem'
                    }}>
                        <Icons.Chart />
                    </div>
                    <h4 style={{ fontSize: '1.25rem', color: 'var(--color-maroon)', marginBottom: '12px' }}>
                        {activeTab} Analytics Module
                    </h4>
                    <p style={{ color: '#6b7280', maxWidth: '500px', margin: '0 auto 24px auto', lineHeight: '1.6' }}>
                        Connect your charting library (like Recharts or Chart.js) here to visualize
                        trends and export detailed graphical reports.
                    </p>
                    <button className="btn-premium btn-outline">
                        Configure Data Source
                    </button>
                </div>
            )}
        </div>
    );
};

export default AnalyticsDashboard;
