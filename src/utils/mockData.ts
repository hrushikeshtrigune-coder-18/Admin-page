export const MOCK_KYC = [
    { id: 'KYC-101', name: 'Ramesh Trading', type: 'Vendor', status: 'Pending', doc: 'Aadhar Card', date: '2026-03-01' },
    { id: 'KYC-102', name: 'Sita Verma', type: 'User', status: 'Approved', doc: 'Passport', date: '2026-03-02' },
    { id: 'KYC-103', name: 'Royal Mandap', type: 'Vendor', status: 'Rejected', doc: 'Business PAN', date: '2026-03-03' },
    { id: 'KYC-104', name: 'Alok Sharma', type: 'User', status: 'Pending', doc: 'Aadhar Card', date: '2026-03-04' },
];

export const MOCK_USERS = [
    { id: 'U-001', name: 'Alok Sharma', role: 'User', joined: '2026-01-15', status: 'Active', reports: 0 },
    { id: 'V-054', name: 'Delhi Caterers', role: 'Vendor', joined: '2026-02-10', status: 'Suspended', reports: 3 },
    { id: 'U-002', name: 'Priya Singh', role: 'User', joined: '2026-02-28', status: 'Active', reports: 1 },
    { id: 'V-012', name: 'Royal Mandap', role: 'Vendor', joined: '2025-11-20', status: 'Active', reports: 0 },
];

export const MOCK_REQUESTS = [
    { id: 'REQ-501', user: 'Alok Sharma', vendor: 'Delhi Caterers', type: 'Booking', status: 'Completed', date: '2026-03-01 10:30 AM' },
    { id: 'REQ-502', user: 'Priya Singh', vendor: 'Royal Mandap', type: 'Interest', status: 'Pending', date: '2026-03-03 14:15 PM' },
    { id: 'REQ-503', user: 'Sita Verma', vendor: 'Ramesh Trading', type: 'Dispute', status: 'Reported', date: '2026-03-04 09:00 AM' },
];

export const MOCK_KYC_AUDIT = [
    { id: 'ALOG-001', kycRef: 'KYC-809', action: 'Approved', admin: 'Super Admin', timestamp: '2026-03-04 10:15:00', notes: 'Documents verified matched govt DB.' },
    { id: 'ALOG-002', kycRef: 'KYC-810', action: 'Rejected', admin: 'Moderator_Priya', timestamp: '2026-03-04 09:30:22', notes: 'Aadhaar image was blurry. Requested re-submission.' },
    { id: 'ALOG-003', kycRef: 'KYC-795', action: 'Requested Info', admin: 'Moderator_Rahul', timestamp: '2026-03-03 16:45:10', notes: 'GST certificate missing.' }
];

export const MOCK_SYSTEM_AUDIT_LOGS = [
    { id: 'SYS-LOG-091', admin: 'Super Admin', action: 'Changed Commission Rate', target: 'Global Settings', timestamp: '2026-03-04 11:20:00', ip: '192.168.1.45', status: 'Success' },
    { id: 'SYS-LOG-090', admin: 'Moderator_Priya', action: 'Suspended User', target: 'U-003 (Rajesh K.)', timestamp: '2026-03-04 10:45:12', ip: '192.168.1.22', status: 'Success' },
    { id: 'SYS-LOG-089', admin: 'Super Admin', action: 'Failed Login Attempt', target: 'System', timestamp: '2026-03-04 08:30:00', ip: '192.168.1.99', status: 'Failed' },
    { id: 'SYS-LOG-088', admin: 'Moderator_Rahul', action: 'Resolved Dispute', target: 'REQ-503', timestamp: '2026-03-03 16:20:05', ip: '192.168.1.18', status: 'Success' },
];

export const MOCK_VENDOR_PERFORMANCE = [
    { id: 'V-012', name: 'Royal Mandap', leads: 45, bookings: 12, revenue: '₹4,50,000', rating: 4.8 },
    { id: 'V-054', name: 'Delhi Caterers', leads: 12, bookings: 0, revenue: '₹0', rating: 2.1 },
    { id: 'V-088', name: 'Perfect Moments Photo', leads: 80, bookings: 34, revenue: '₹8,40,000', rating: 4.9 },
];

export const STATS = [
    { label: 'Total Users', value: '12,450', icon: 'Users', growth: '+12%', progress: 78 },
    { label: 'Total Vendors', value: '3,820', icon: 'Vendors', growth: '+5%', progress: 65 },
    { label: 'Pending KYC Approvals', value: '145', icon: 'Shield', growth: '-2%', progress: 30 },
    { label: 'Active Requests (User ↔ Vendor)', value: '890', icon: 'Message', growth: '+18%', progress: 85 },
    { label: 'Today’s New Registrations', value: '64', icon: 'Users', growth: '+24%', progress: 92 },
    { label: 'Revenue / Commission Overview', value: '₹4.2L', icon: 'Chart', growth: '+15%', progress: 80 },
];

export const getBadgeClass = (status) => {
    switch (status) {
        case 'Approved': case 'Active': case 'Completed': case 'Success': return 'status-badge success';
        case 'Pending': case 'Reported': case 'Failed': return 'status-badge warning';
        case 'Rejected': case 'Suspended': return 'status-badge danger';
        default: return 'status-badge neutral';
    }
};
