import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validateEmail = (email: string) => {
    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const validateUsername = (username: string) => {
    // Regular expression to validate username format
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
  }

  const validatePassword = (password: string) => {
    // Regular expression to validate password format
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,64}$/;
    return passwordRegex.test(password);
  }

  const validateField = (name: string, value: string) => {
    // Validate the field based on its name and value
    const message = getFieldError(name, value);

    // If there is an error message, set it in the fieldErrors state
    setFieldErrors((prev) => ({ ...prev, [name]: message }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Reset error state
    setError('');

    // Validate each field and set error messages if needed
    const fieldsToValidate = {
      username,
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
    };

    // Create a new object to store field errors
    const newFieldErrors: Record<string, string> = {};

    // Iterate over the fields to validate and check for errors
    for (const [name, value] of Object.entries(fieldsToValidate)) {
      // Validate the field and get the error message
      const error = getFieldError(name, value);
      if (error) {
        // If there is an error, set it in the newFieldErrors object
        newFieldErrors[name] = error;
      }
    }

    // Set the field errors in the state
    setFieldErrors(newFieldErrors);

    // If there are any field errors, return early to prevent form submission
    // This ensures that the form will not be submitted if there are validation errors
    if (Object.keys(newFieldErrors).length > 0) return;

    // Check that the password is at least 6 characters long
    try {
      // Fetch the API host, port, and base path from environment variables
      const API_HOST = import.meta.env.VITE_API_HOST;
      const API_PORT = import.meta.env.VITE_API_PORT;
      const API_BASE_PATH = import.meta.env.VITE_API_BASE_PATH;

      // Ensure trailing slash is handled correctly
      const API_BASE_URL = `${API_HOST}:${API_PORT}${API_BASE_PATH.startsWith('/') ? '' : '/'}${API_BASE_PATH}`;

      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          email,
          password,
          firstName,
          middleName,
          lastName,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        navigate('/login');
      } else {
        setError(data.message || 'Registration failed.');
      }
    } catch (error) {
      setError('Something went wrong!');
    }
  };

  // Function to get field error messages based on field name and value
  const getFieldError = (name: string, value: string) => {
    switch (name) {
      case 'username':
        if (!value) {
          return 'Username is required.';
        } else if (!validateUsername(value)) {
          return 'Username must be 3-20 characters and only contain letters, numbers, and underscores.';
        }
        break;

      case 'email':
        if (!value) {
          return 'Email is required.';
        } else if (!validateEmail(value)) {
          return 'Invalid email format.';
        }
        break;

      case 'password':
        if (!value) {
          return 'Password is required.';
        } else if (!validatePassword(value)) {
          return 'Password must be at least 8 characters, include uppercase, number, and special character.';
        }
        break;

      case 'confirmPassword':
        if (!value) {
          return 'Please confirm your password.';
        } else if (value !== password) {
          return 'Passwords do not match.';
        }
        break;

      case 'firstName':
        if (!value) {
          return 'First name is required.';
        }
        break;

      case 'lastName':
        if (!value) {
          return 'Last name is required.';
        }
        break;
    }

    return '';
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-[250px] sm:max-w-[300px]">
        <h1 className="text-3xl font-bold text-center mb-4">Register</h1>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Username *"
              className="px-3 py-2 border rounded w-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={(e) => validateField('username', e.target.value)}
            />
            {fieldErrors.username && <p className="text-red-500 text-sm">{fieldErrors.username}</p>}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email *"
              className="px-3 py-2 border rounded w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={(e) => validateField('email', e.target.value)}
            />
            {fieldErrors.email && <p className="text-red-500 text-sm">{fieldErrors.email}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password *"
              className="px-3 py-2 border rounded w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={(e) => validateField('password', e.target.value)}
            />
            {fieldErrors.password && <p className="text-red-500 text-sm">{fieldErrors.password}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Confirm Password *"
              className="px-3 py-2 border rounded w-full"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={(e) => validateField('confirmPassword', e.target.value)}
            />
            {fieldErrors.confirmPassword && <p className="text-red-500 text-sm">{fieldErrors.confirmPassword}</p>}
          </div>

          <div>
            <input
              type="text"
              placeholder="First Name *"
              className="px-3 py-2 border rounded w-full"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              onBlur={(e) => validateField('firstName', e.target.value)}
            />
            {fieldErrors.firstName && <p className="text-red-500 text-sm">{fieldErrors.firstName}</p>}
          </div>

          <input
            type="text"
            placeholder="Middle Name"
            className="px-3 py-2 border rounded"
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
          />

          <div>
            <input
              type="text"
              placeholder="Last Name *"
              className="px-3 py-2 border rounded w-full"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              onBlur={(e) => validateField('lastName', e.target.value)}
            />
            {fieldErrors.lastName && <p className="text-red-500 text-sm">{fieldErrors.lastName}</p>}
          </div>

          {error && <p className="text-red-600 text-sm text-center mt-2">{error}</p>}

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded transition text-sm"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
