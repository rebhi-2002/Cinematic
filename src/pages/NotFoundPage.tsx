import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
import { Home } from 'lucide-react';

export function NotFoundPage() {
  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="text-6xl font-bold text-gray-900">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700">Page Not Found</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="pt-4">
            <Link to="/">
              <Button>
                <Home className="w-4 h-4 mr-2" />
                Return Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}