import React from 'react';
import { Layout } from '../components/layout/Layout';

export function ServicesPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Our Services</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Streaming</h2>
            <p className="text-gray-600 mb-4">
              Watch your favorite movies and TV shows in high quality, anytime and anywhere.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Downloads</h2>
            <p className="text-gray-600 mb-4">
              Download content to watch offline on your devices.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Multi-device Access</h2>
            <p className="text-gray-600 mb-4">
              Stream on multiple devices simultaneously with our premium plans.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">HD & 4K Quality</h2>
            <p className="text-gray-600 mb-4">
              Experience crystal clear video quality with our HD and 4K streaming options.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Personalized Profiles</h2>
            <p className="text-gray-600 mb-4">
              Create multiple profiles for different family members with personalized recommendations.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Parental Controls</h2>
            <p className="text-gray-600 mb-4">
              Set up parental controls to ensure age-appropriate content for your children.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}