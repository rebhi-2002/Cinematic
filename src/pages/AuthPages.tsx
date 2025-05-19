import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Film, Mail, Lock, User } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Demo credentials notice
  const handleDemoLogin = () => {
    setEmail('user@example.com');
    setPassword('password');
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-lg shadow-lg">
          <div className="text-center">
            <div className="flex justify-center">
              <Film className="h-12 w-12 text-primary" />
            </div>
            <h2 className="mt-6 text-3xl font-bold text-white">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Or{' '}
              <a href="/register" className="font-medium text-primary hover:text-primary-light">
                create a new account
              </a>
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md space-y-4">
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-700 rounded bg-gray-700"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-primary hover:text-primary-light">
                  Forgot your password?
                </a>
              </div>
            </div>
            
            {error && (
              <div className="bg-destructive/20 border border-destructive text-white px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div>
              <Button
                type="submit"
                isLoading={isLoading}
                fullWidth
              >
                Sign in
              </Button>
            </div>
            
            <div className="text-center text-sm text-gray-400">
              <button
                type="button"
                onClick={handleDemoLogin}
                className="font-medium text-primary hover:text-primary-light"
              >
                Use demo credentials
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await register(username, email, password);
      navigate('/');
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-lg shadow-lg">
          <div className="text-center">
            <div className="flex justify-center">
              <Film className="h-12 w-12 text-primary" />
            </div>
            <h2 className="mt-6 text-3xl font-bold text-white">
              Create a new account
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Already have an account?{' '}
              <a href="/login" className="font-medium text-primary hover:text-primary-light">
                Sign in
              </a>
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md space-y-4">
              <Input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                icon={<User className="h-5 w-5 text-gray-400" />}
              />
              
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail className="h-5 w-5 text-gray-400" />}
              />
              
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock className="h-5 w-5 text-gray-400" />}
              />
              
              <Input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                label="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                icon={<Lock className="h-5 w-5 text-gray-400" />}
              />
            </div>
            
            {error && (
              <div className="bg-destructive/20 border border-destructive text-white px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div>
              <Button
                type="submit"
                isLoading={isLoading}
                fullWidth
              >
                Create account
              </Button>
            </div>
            
            <p className="text-xs text-gray-400 text-center">
              By creating an account, you agree to our{' '}
              <a href="#" className="text-primary hover:text-primary-light">Terms of Service</a>{' '}
              and{' '}
              <a href="#" className="text-primary hover:text-primary-light">Privacy Policy</a>.
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
}