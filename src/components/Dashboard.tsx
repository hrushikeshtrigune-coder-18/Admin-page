import React, { useState, useEffect } from 'react';
import { Icons } from '../utils/Icons';
import { getBadgeClass } from '../utils/mockData';
import { useToast } from '../context/ToastContext';
import { useData } from '../context/DataContext';

// Custom Hook for Number Count Up Animation
const useCountUp = (end, duration = 2000) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime = null;
        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            // Ease out quad
            const easing = progress * (2 - progress);
            setCount(Math.floor(easing * end));
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    }, [end, duration]);

    return count;
};

const AnimatedStat = ({ label, targetValue, prefix = "", suffix = "", icon: Icon }) => {
    // Handle formatting for revenue vs regular numbers
    const isRevenue = prefix === '₹';
    const numValue = isRevenue ? parseInt(targetValue.replace(/,/g, '')) : parseInt(targetValue.replace(/,/g, ''));
    const currentCount = useCountUp(isNaN(numValue) ? 0 : numValue);

    const displayValue = isNaN(numValue)
        ? targetValue
        : `${prefix}${currentCount.toLocaleString()}${suffix}`;

    return (
        <div className="stat-box animate-slide-up">
            <div className="stat-icon-wrapper">
                <Icon />
            </div>
            <div className="stat-details">
                <div className="stat-label">{label}</div>
                <div className="stat-value">{displayValue}</div>
            </div>
        </div>
    );
};

const Dashboard = () => {
    const showToast = useToast();
    const { users, updateUserStatus } = useData();

    const handleApprove = (id, name) => {
        updateUserStatus(id, 'Active');
        showToast(`${name} Approved`, 'success');
    };

    const handleReject = (id, name) => {
        updateUserStatus(id, 'Suspended');
        showToast(`${name} Rejected`, 'error');
    };

    const dashStats = [
        { label: 'Total Registered Users', targetValue: '14250', icon: Icons.Users },
        { label: 'Active Profiles', targetValue: '12100', icon: Icons.Users },
        { label: 'Total Reports Generated', targetValue: '1240', icon: Icons.FileText },
        { label: 'Successful Matches', targetValue: '890', icon: Icons.Message },
        { label: 'Monthly Revenue', targetValue: '450000', prefix: '₹', icon: Icons.Chart },
    ];

    return (
        <div className="dashboard-wrapper">
            {/* 1. Overview Analytics Cards */}
            <div className="stats-container" style={{ marginBottom: '32px' }}>
                {dashStats.map((stat, idx) => (
                    <AnimatedStat key={idx} {...stat} />
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '24px', alignItems: 'start' }}>
                {/* Left Column: Chart & Table */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                    {/* 4. Match Analytics Section (Mockup) */}
                    <div className="glass-card animate-slide-up">
                        <div className="section-header" style={{ marginBottom: '20px' }}>
                            <h3 className="section-title">Matchmaking Engagement & Success Rates</h3>
                            <button className="btn-premium btn-secondary">Detailed Report</button>
                        </div>
                        <div style={{ height: '300px', background: 'rgba(255, 255, 228, 0.4)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'flex-end', padding: '20px', gap: '8px', border: '1px solid rgba(242, 149, 2, 0.2)' }}>
                            {/* CSS Mock Bar Chart */}
                            {[40, 65, 45, 80, 55, 90, 75].map((h, i) => (
                                <div key={i} style={{ flex: 1, backgroundColor: 'var(--color-dark-haldi)', height: `${h}%`, borderRadius: '4px 4px 0 0', opacity: 0.8, transition: 'height 1.5s ease-out' }}></div>
                            ))}
                        </div>
                    </div>

                    {/* 2. Recent User Profiles Table */}
                    <div className="glass-card animate-slide-up">
                        <div className="section-header" style={{ marginBottom: '20px' }}>
                            <h3 className="section-title">Recent User Profiles</h3>
                            <button className="btn-premium btn-outline">View All</button>
                        </div>
                        <div className="premium-table-container">
                            <table className="premium-table">
                                <thead>
                                    <tr>
                                        <th>Profile</th>
                                        <th>Details</th>
                                        <th>Role</th>
                                        <th>Verification</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.slice(0, 4).map(user => (
                                        <tr key={user.id}>
                                            <td>
                                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-kumkum)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                                    {user.name.charAt(0)}
                                                </div>
                                            </td>
                                            <td>
                                                <div style={{ fontWeight: 600 }}>{user.name}</div>
                                                <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>26 Yrs • Mumbai</div>
                                            </td>
                                            <td>
                                                <span className={`status-badge ${user.role === 'Vendor' ? 'warning' : 'info'}`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td><span className={getBadgeClass(user.status)}>{user.status === 'Active' ? 'Verified' : user.status}</span></td>
                                            <td>
                                                <div style={{ display: 'flex', gap: '8px' }}>
                                                    <button onClick={() => handleApprove(user.id, user.name)} className="btn-premium btn-action btn-primary" style={{ padding: '6px 12px' }}>Approve</button>
                                                    <button onClick={() => handleReject(user.id, user.name)} className="btn-premium btn-action btn-secondary" style={{ padding: '6px 12px', background: 'transparent', color: 'var(--color-kumkum)', border: '1px solid var(--color-kumkum)' }}>Reject</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Column: Verification Panel & Notifications */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                    {/* 3. Profile Verification Panel */}
                    <div className="glass-card animate-slide-up" style={{ padding: '24px' }}>
                        <h3 className="section-title" style={{ marginBottom: '20px', fontSize: '1.1rem' }}>Pending Verification Queue</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {[1, 2, 3].map(i => (
                                <div key={i} style={{ padding: '16px', background: 'rgba(255,255,255,0.6)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(242, 149, 2, 0.15)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontWeight: 600 }}>ID: KYC-00{i}</span>
                                        <span className="status-badge warning" style={{ cursor: 'default' }}>Review Docs</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 5. Notifications & Activity Feed */}
                    <div className="glass-card animate-slide-up" style={{ padding: '24px' }}>
                        <h3 className="section-title" style={{ marginBottom: '20px', fontSize: '1.1rem' }}>Live Activity Feed</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                <div style={{ color: 'var(--status-success)', marginTop: '2px' }}><Icons.CheckCircle /></div>
                                <div>
                                    <div style={{ fontWeight: 500, fontSize: '0.9rem' }}>New Premium Subscription</div>
                                    <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Alok Sharma upgraded to Gold Plan.</div>
                                    <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '4px' }}>2 mins ago</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                <div style={{ color: 'var(--color-kumkum)', marginTop: '2px' }}><Icons.Users /></div>
                                <div>
                                    <div style={{ fontWeight: 500, fontSize: '0.9rem' }}>Match Successful</div>
                                    <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>User U-001 and U-045 connected.</div>
                                    <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '4px' }}>15 mins ago</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                <div style={{ color: 'var(--status-warning)', marginTop: '2px' }}><Icons.AlertTriangle /></div>
                                <div>
                                    <div style={{ fontWeight: 500, fontSize: '0.9rem' }}>Profile Flagged</div>
                                    <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Suspicious activity on profile V-054.</div>
                                    <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '4px' }}>1 hour ago</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
