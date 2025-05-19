import React from 'react';
import { Layout } from '../components/layout/Layout';
import { Film, Users, Globe, Award } from 'lucide-react';

export function AboutPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">About Us</h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-gray-300 mb-8">
              Welcome to Cinematic, your premier destination for streaming the world's best movies and TV shows. 
              We're passionate about bringing quality entertainment directly to your screens, whenever and wherever you want it.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-800 p-6 rounded-lg">
                <Film className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Quality Content</h3>
                <p className="text-gray-300">
                  Access thousands of movies and shows in HD and 4K quality, from classics to the latest releases.
                </p>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg">
                <Users className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">For Everyone</h3>
                <p className="text-gray-300">
                  Family-friendly content and personalized profiles for every member of your household.
                </p>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg">
                <Globe className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
                <p className="text-gray-300">
                  Available worldwide with content in multiple languages and regional selections.
                </p>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg">
                <Award className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Award-Winning</h3>
                <p className="text-gray-300">
                  Curated selection of critically acclaimed and award-winning content.
                </p>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-300 mb-6">
              Founded in 2025, Cinematic was born from a simple idea: everyone deserves access to great entertainment. 
              We've grown from a small startup to a leading streaming platform, serving millions of users worldwide.
            </p>
            
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-300 mb-6">
              To provide the best streaming experience with a diverse catalog of high-quality content, 
              making entertainment accessible and enjoyable for audiences everywhere.
            </p>
            
            <div className="bg-gray-800 p-8 rounded-lg mt-12">
              <h2 className="text-2xl font-bold mb-6">Quick Facts</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">1M+</div>
                  <div className="text-gray-300">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">10K+</div>
                  <div className="text-gray-300">Movies & Shows</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">50+</div>
                  <div className="text-gray-300">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">4.8</div>
                  <div className="text-gray-300">User Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}