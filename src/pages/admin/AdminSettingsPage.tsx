import React from 'react';
import { Layout } from '../../components/layout/Layout';

export function AdminSettingsPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Settings</h1>
        <div className="bg-white rounded-lg shadow p-6">
          {/* Settings configuration will go here */}
        </div>
      </div>
    </Layout>
  );
}