import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();

  // State that stores the login form data
  // This state is used to manage the username and password inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Error state to handle login errors
  // This state is used to display error messages to the user
  const [error, setError] = useState('');

  // State to handle password visibility
  // This state is used to toggle the visibility of the password input field
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    // Prevent the default form submission behavior
    // This is important to prevent the page from reloading when the form is submitted
    e.preventDefault();

    // Reset error state
    setError(''); 

    // Check that both fields are not empty
    // This state is used to display error messages to the user
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    try {
      // Fetch the API host, port, and base path from environment variables
      // This is important to ensure that the API URL is constructed correctly
      const API_HOST = import.meta.env.VITE_API_HOST;
      const API_PORT = import.meta.env.VITE_API_PORT;
      const API_BASE_PATH = import.meta.env.VITE_API_BASE_PATH;

      // Ensure trailing slash is handled correctly
      // This is important to ensure that the API URL is constructed correctly
      const API_BASE_URL = `${API_HOST}:${API_PORT}${API_BASE_PATH.startsWith('/') ? '' : '/'}${API_BASE_PATH}`;

      // Simulate an API call to authenticate the user
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();
      if (response.ok) {
        // If login is successful, store the token in local storage
        const token = result.data.accessToken;

        // Check if the token is valid
        if (!token) {
          setError('Invalid response from server. Please try again.');
          return;
        }

        // Store the token in local storage for future requests
        localStorage.setItem('token', token);
        
        // Redirect to dashboard on success
        navigate('/dashboard'); 
      } else {
        // Handle login errors based on the response from the server
        // Display a user-friendly error message based on the server response
        setError(result.message === 'Bad credentials'
          ? 'Invalid username or password. Please try again.'
          : result.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      // Handle network errors or other unexpected errors
      console.error('Login error:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-[250px] sm:max-w-[300px]">
        <h1 className="text-3xl font-bold text-center mb-4">Login</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="px-3 py-2 border rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          {/* Password input with toggle */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="px-3 py-2 border rounded w-full pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute inset-y-0 right-2 flex items-center cursor-pointer text-gray-500 text-sm"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '👁️' : '🙈'}
            </span>
          </div>
          
          {error && (
            <p className="text-red-500 text-sm break-words">{error}</p>
          )}

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded transition text-sm"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
