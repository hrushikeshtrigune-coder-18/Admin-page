import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_USERS, MOCK_KYC } from '../utils/mockData';

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
    // Initializing state from mock data
    const [users, setUsers] = useState(MOCK_USERS);
    const [kyc, setKyc] = useState(MOCK_KYC);

    // Update status for users or vendors
    const updateUserStatus = (id, newStatus) => {
        setUsers(prev => prev.map(user =>
            user.id === id ? { ...user, status: newStatus } : user
        ));
    };

    // Update status for KYC requests
    const updateKycStatus = (id, newStatus) => {
        setKyc(prev => prev.map(item =>
            item.id === id ? { ...item, status: newStatus } : item
        ));

        // If a KYC is approved/rejected, we might want to update the corresponding user/vendor status too
        const kycItem = kyc.find(k => k.id === id);
        if (kycItem) {
            // Logic to sync KYC status with user status if needed
            // For now, we'll just update the KYC status
        }
    };

    // Suspend/Restore User Action
    const toggleUserSuspension = (id) => {
        setUsers(prev => prev.map(user => {
            if (user.id === id) {
                const newStatus = user.status === 'Suspended' ? 'Active' : 'Suspended';
                return { ...user, status: newStatus };
            }
            return user;
        }));
    };

    return (
        <DataContext.Provider value={{
            users,
            vendors: users.filter(u => u.role === 'Vendor'),
            allUsers: users.filter(u => u.role === 'User'),
            kyc,
            updateUserStatus,
            updateKycStatus,
            toggleUserSuspension
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
