import React from 'react';
import { Icons } from '../utils/Icons';
import { STATS, MOCK_REQUESTS } from '../utils/mockData';

const Dashboard = () => {
    return (
        <div className="animate-fade-in">
            <div className="stats-container">
                {STATS.map((stat, idx) => {
                    const IconComponent = Icons[stat.icon] || Icons.Chart;
                    return (
                        <div className="stat-box" key={idx}>
                            <div className="stat-icon-wrapper">
                                <IconComponent />
                            </div>
                            <div className="stat-details">
                                <div className="stat-label">{stat.label}</div>
                                <div className="stat-value">{stat.value}</div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="glass-card" style={{ marginTop: '24px' }}>
                <h3 className="section-title" style={{ marginBottom: '20px' }}>Recent Platform Activity</h3>
                <div className="premium-table-container">
                    <table className="premium-table">
                        <thead>
                            <tr>
                                <th>User/Vendor</th>
                                <th>Interaction</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MOCK_REQUESTS.map(req => (
                                <tr key={req.id}>
                                    <td>
                                        <div style={{ fontWeight: 600 }}>{req.user}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>with {req.vendor}</div>
                                    </td>
                                    <td>{req.type}</td>
                                    <td>{req.date}</td>
                                    <td><span className={req.status === 'Completed' ? 'status-badge success' : req.status === 'Pending' ? 'status-badge warning' : 'status-badge danger'}>{req.status}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
