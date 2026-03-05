import React, { useState } from 'react';
import { STATS } from '../utils/mockData';
import { Icons } from '../utils/Icons';
import { useToast } from '../context/ToastContext';
import { exportToPDF } from '../utils/pdfGenerator';

// Custom Hook for Number Count Up Animation
const useCountUp = (end, duration = 2000) => {
    const [count, setCount] = useState(0);

    React.useEffect(() => {
        let startTime = null;
        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
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

const PremiumStatCard = ({ stat, index }) => {
    const delay = index * 0.1; // Staggered entrance
    const isRevenue = stat.value.startsWith('₹');

    // Parse the target value safely
    let targetNum = 0;
    let suffix = '';
    if (isRevenue) {
        targetNum = parseFloat(stat.value.replace(/[^0-9.]/g, ''));
        suffix = stat.value.slice(-1) === 'L' ? 'L' : '';
    } else {
        targetNum = parseInt(stat.value.replace(/,/g, ''));
    }

    const currentCount = useCountUp(isNaN(targetNum) ? 0 : targetNum);

    // Format the display value
    const displayValue = isNaN(targetNum)
        ? stat.value
        : isRevenue
            ? `₹${currentCount}${suffix ? '.' + Math.floor(Math.random() * 9) + suffix : ''}` // approximate decimals for visual effect
            : currentCount.toLocaleString();

    // Re-hardcode the accurate value once animation finishes to prevent weird random decimals pausing
    const finalDisplay = currentCount >= targetNum ? stat.value : displayValue;

    const isPositive = stat.growth && stat.growth.startsWith('+');

    return (
        <div className="premium-stat-card" style={{ animationDelay: `${delay}s`, animationFillMode: 'both' }}>
            <div className="stat-header">
                <div className="stat-content">
                    <span className="stat-title">{stat.label}</span>
                    <span className="stat-number">{finalDisplay}</span>
                </div>
                <div className="stat-icon-container">
                    {stat.icon === 'Users' && <Icons.Users />}
                    {stat.icon === 'Vendors' && <Icons.Users />}
                    {stat.icon === 'Shield' && <Icons.Shield />}
                    {stat.icon === 'Message' && <Icons.Message />}
                    {stat.icon === 'Chart' && <Icons.Chart />}
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                <div className={`stat-growth ${isPositive ? 'positive' : 'negative'}`}>
                    {isPositive ? <Icons.ArrowUpRight /> : <Icons.ArrowDownRight />}
                    {stat.growth}
                </div>
                <div style={{ flex: 1, marginLeft: '16px' }}>
                    <div className="stat-progress-container">
                        <div
                            className="stat-progress-bar"
                            style={{ width: `${stat.progress || 0}%`, transitionDelay: `${delay + 0.5}s` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AnalyticsDashboard = () => {
    const [activeTab, setActiveTab] = useState('Overview Stats');
    const showToast = useToast();
    const tabs = ['Overview Stats', 'User Growth Reports', 'Vendor Growth Reports', 'Booking & Revenue', 'Commission Config', 'KYC Stats'];

    return (
        <div className="animate-slide-up">
            <div className="section-header">
                <h3 className="section-title">Growth & Revenue Analytics</h3>
                <div className="header-tools">
                    <button className="btn-premium btn-secondary" onClick={() => showToast(`Exporting ${activeTab} to CSV`, 'success')}><Icons.Download /> Export {activeTab} (CSV)</button>
                    <button className="btn-premium btn-primary" onClick={() => exportToPDF(`Analytics_${activeTab}`)}><Icons.FileText /> Export PDF</button>
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
                <div className="stats-container animate-slide-up">
                    {STATS.map((stat, idx) => (
                        <PremiumStatCard key={idx} stat={stat} index={idx} />
                    ))}
                </div>
            )}

            {(activeTab !== 'Overview Stats') && (
                <div className="glass-card animate-slide-up" style={{ padding: '60px 40px', textAlign: 'center' }}>
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

                    {/* Mock Data Grid for sub-fields */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', maxWidth: '800px', margin: '0 auto 32px auto' }}>
                        {[
                            { label: 'Weekly Trend', val: '+14.5%', color: 'var(--status-success)' },
                            { label: 'Current Average', val: '2,450', color: 'var(--color-text-main)' },
                            { label: 'Predictive Forecast', val: 'High', color: 'var(--color-gold)' }
                        ].map((stat, i) => (
                            <div key={i} style={{ padding: '20px', background: 'rgba(255,255,255,0.5)', borderRadius: '12px', border: '1px solid rgba(242, 149, 2, 0.2)' }}>
                                <div style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{stat.label}</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: stat.color }}>{stat.val}</div>
                            </div>
                        ))}
                    </div>

                    <button className="btn-premium btn-outline" onClick={() => showToast('Configuration interface opening...', 'success')}>
                        Configure Data Source
                    </button>
                </div>
            )}
        </div>
    );
};

export default AnalyticsDashboard;
