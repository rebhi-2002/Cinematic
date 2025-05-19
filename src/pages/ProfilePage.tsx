import React, { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../contexts/AuthContext';
import { GENRES } from '../utils/constants';

export function ProfilePage() {
  const { user, isAuthenticated, updateProfile, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [selectedGenres, setSelectedGenres] = useState<number[]>(user?.favoriteGenres || []);

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto bg-gray-800 rounded-lg p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Profile</h1>
            <p className="text-gray-300 mb-6">
              You need to be logged in to view and edit your profile.
            </p>
            <Button onClick={() => window.location.href = '/login'}>
              Log In
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!username || !email) {
      setError('Username and email are required');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await updateProfile({
        username,
        email,
        favoriteGenres: selectedGenres
      });
      setSuccess('Profile updated successfully');
    } catch (err) {
      setError('Failed to update profile');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleGenre = (genreId: number) => {
    setSelectedGenres(prev => 
      prev.includes(genreId)
        ? prev.filter(id => id !== genreId)
        : [...prev, genreId]
    );
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">My Profile</h1>
          
          <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-700">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gray-700 overflow-hidden">
                    {user?.profileImage ? (
                      <img 
                        src={user.profileImage} 
                        alt={user.username} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500 text-4xl">
                        {username.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <button className="absolute bottom-0 right-0 rounded-full bg-primary p-2 text-white shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-xl font-semibold text-white">{user?.username}</h2>
                  <p className="text-gray-400">{user?.email}</p>
                  <p className="text-gray-500 text-sm mt-2">Member since {new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              {success && (
                <div className="mb-6 p-3 bg-green-900/20 border border-green-800 rounded-md text-white">
                  {success}
                </div>
              )}
              
              {error && (
                <div className="mb-6 p-3 bg-destructive/20 border border-destructive rounded-md text-white">
                  {error}
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Input
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                
                <Input
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className="mb-8">
                <h3 className="text-white font-semibold mb-3">Favorite Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {GENRES.map((genre) => (
                    <button
                      key={genre.id}
                      type="button"
                      onClick={() => toggleGenre(genre.id)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedGenres.includes(genre.id)
                          ? 'bg-primary text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {genre.name}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4 justify-between">
                <div>
                  <Button
                    type="submit"
                    isLoading={isLoading}
                  >
                    Save Changes
                  </Button>
                </div>
                
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => window.location.href = '/change-password'}
                  >
                    Change Password
                  </Button>
                  
                  <Button
                    type="button"
                    variant="danger"
                    onClick={logout}
                  >
                    Sign Out
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}