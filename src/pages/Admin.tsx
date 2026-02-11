import { useState, useEffect } from 'react';
import { Trash2, Clock, User, Phone, Mail, Lock } from 'lucide-react';

interface ContactSubmission {
  id: number;
  name: string;
  phone: string;
  message: string;
  created_at: string;
}

export default function Admin() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Check if user is already logged in (using localStorage)
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsLoggedIn(true);
      fetchSubmissions(token);
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Use environment variable for API base URL, fallback to relative path
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });
      
      // Handle the case where response is empty
      let data = {};
      if (response.headers.get('content-type')?.includes('application/json')) {
        data = await response.json();
      } else {
        // If response is not JSON, try to get text and parse manually
        const text = await response.text();
        try {
          data = JSON.parse(text);
        } catch {
          data = { error: 'Invalid response from server' };
        }
      }
      
      if (response.ok && data.token) {
        localStorage.setItem('adminToken', data.token);
        setIsLoggedIn(true);
        setAuthError('');
        setPassword('');
        fetchSubmissions(data.token);
      } else {
        setAuthError(data.error || 'Invalid password');
      }
    } catch (err) {
      console.error('Login error:', err);
      setAuthError('Connection error. Please try again.');
    }
  };

  const fetchSubmissions = async (token: string) => {
    try {
      setLoading(true);
      // Use environment variable for API base URL, fallback to relative path
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          // Token expired or invalid, log out user
          localStorage.removeItem('adminToken');
          setIsLoggedIn(false);
          setError('Session expired. Please log in again.');
        } else {
          throw new Error('Failed to fetch submissions');
        }
        return;
      }
      
      // Handle the case where response is empty
      let data = [];
      if (response.headers.get('content-type')?.includes('application/json')) {
        data = await response.json();
      } else {
        // If response is not JSON, try to get text and parse manually
        const text = await response.text();
        try {
          data = JSON.parse(text);
        } catch {
          data = [];
        }
      }
      
      setSubmissions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
    setSubmissions([]);
  };

  const deleteSubmission = async (id: number) => {
    const token = localStorage.getItem('adminToken');
    if (!token) return;

    if (window.confirm('Are you sure you want to delete this submission?')) {
      try {
        // Use environment variable for API base URL, fallback to relative path
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
        const response = await fetch(`${API_BASE_URL}/api/contact/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        
        if (!response.ok) {
          if (response.status === 401) {
            // Token expired or invalid, log out user
            localStorage.removeItem('adminToken');
            setIsLoggedIn(false);
            alert('Session expired. Please log in again.');
            return;
          }
          
          // Handle error response
          let errorData = { error: 'Failed to delete submission' };
          if (response.headers.get('content-type')?.includes('application/json')) {
            errorData = await response.json();
          } else {
            const text = await response.text();
            try {
              errorData = JSON.parse(text);
            } catch {
              errorData = { error: 'Failed to delete submission' };
            }
          }
          
          throw new Error(errorData.error || 'Failed to delete submission');
        }
        
        // Remove the deleted submission from the local state
        setSubmissions(submissions.filter(submission => submission.id !== id));
      } catch (err) {
        alert('Error deleting submission: ' + (err instanceof Error ? err.message : 'Unknown error'));
      }
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
          <div className="text-center">
            <Lock className="mx-auto h-12 w-12 text-gray-400" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Admin Access
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Please enter your admin password to access submissions
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Enter admin password"
              />
            </div>

            {authError && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">{authError}</h3>
                  </div>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Contact Submissions Admin</h1>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Logout
            </button>
          </div>
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading submissions...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Contact Submissions Admin</h1>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Logout
            </button>
          </div>
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md mx-auto">
            <strong>Error: </strong> {error}
            <button
              onClick={() => {
                const token = localStorage.getItem('adminToken');
                if (token) {
                  fetchSubmissions(token);
                } else {
                  setError('No authentication token found');
                }
              }}
              className="ml-4 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Contact Submissions Admin</h1>
          <div className="flex space-x-4">
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Recent Submissions ({submissions.length})
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              All contact form submissions are listed below
            </p>
          </div>

          {submissions.length === 0 ? (
            <div className="text-center py-12">
              <Mail className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No submissions</h3>
              <p className="mt-1 text-sm text-gray-500">
                No contact form submissions have been received yet.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {submissions.map((submission) => (
                <li key={submission.id}>
                  <div className="px-4 py-5 sm:px-6 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-4 mb-2">
                          <div className="flex items-center text-sm text-gray-500">
                            <User className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                            <span className="font-medium text-gray-900">{submission.name}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Phone className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                            <a
                              href={`tel:${submission.phone}`}
                              className="font-medium text-blue-600 hover:text-blue-800"
                            >
                              {submission.phone}
                            </a>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                            <span>{new Date(submission.created_at).toLocaleString()}</span>
                          </div>
                        </div>
                        <p className="text-gray-800 break-words max-w-3xl">{submission.message}</p>
                      </div>
                      <div className="ml-4 flex-shrink-0 flex items-center">
                        <button
                          onClick={() => deleteSubmission(submission.id)}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => {
              const token = localStorage.getItem('adminToken');
              if (token) {
                fetchSubmissions(token);
              } else {
                setError('No authentication token found');
              }
            }}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Refresh Data
          </button>
        </div>
      </div>
    </div>
  );
}