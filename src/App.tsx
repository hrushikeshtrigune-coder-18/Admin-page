import React, { useState } from 'react';
import AdminLayout from './components/AdminLayout';
import Dashboard from './components/Dashboard';
import KYCManager from './components/KYCManager';
import UserManager from './components/UserManager';
import VendorManager from './components/VendorManager';
import RequestMonitor from './components/RequestMonitor';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import ContentModeration from './components/ContentModeration';
import PlatformSettings from './components/PlatformSettings';
import { ToastProvider } from './context/ToastContext';
import { DataProvider } from './context/DataContext';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <DataProvider>
      <ToastProvider>
        <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'kyc' && <KYCManager />}
          {activeTab === 'users' && <UserManager />}
          {activeTab === 'vendors' && <VendorManager />}
          {activeTab === 'requests' && <RequestMonitor />}
          {activeTab === 'reports' && <AnalyticsDashboard />}
          {activeTab === 'moderation' && <ContentModeration />}
          {activeTab === 'settings' && <PlatformSettings />}
        </AdminLayout>
      </ToastProvider>
    </DataProvider>
  );
}

export default App;
