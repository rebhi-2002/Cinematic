import React from 'react';
import { Layout } from '../../components/layout/Layout';

export function AdminDashboardPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Dashboard stats and content will go here */}
        </div>
      </div>
    </Layout>
  );
}