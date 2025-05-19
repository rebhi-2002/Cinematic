import React from 'react';
import { Layout } from '../components/layout/Layout';

export function TermsPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700">
              By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
            <p className="text-gray-700">
              Permission is granted to temporarily download one copy of the materials (information or software) on our website for personal, non-commercial transitory viewing only.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Disclaimer</h2>
            <p className="text-gray-700">
              The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Limitations</h2>
            <p className="text-gray-700">
              In no event shall we or our suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Subscription Terms</h2>
            <p className="text-gray-700">
              Subscription charges are billed in advance on a monthly basis. You agree to pay all fees or charges to your account based on the pricing and billing terms in effect at the time a fee or charge is due and payable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Content Usage</h2>
            <p className="text-gray-700">
              All content provided on this website is for informational purposes only. The streaming of movies and TV shows is subject to our content usage policies and applicable copyright laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Account Security</h2>
            <p className="text-gray-700">
              You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account or password.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Modifications</h2>
            <p className="text-gray-700">
              We reserve the right to revise these terms of service at any time without notice. By using this website, you are agreeing to be bound by the current version of these terms of service.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
}