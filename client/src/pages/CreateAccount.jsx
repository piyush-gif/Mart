import  { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { UserPlus } from 'lucide-react';
import API_URL from "../config";
const CreateAccountPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { isDark } = useTheme();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Email validation
    if (!email.includes('@') || !email.includes('.com')) {
      alert('Please enter a valid email address.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const passwordErrors = [];
    if (password.length < 8) {
      passwordErrors.push('8 characters');
    }
    if (!/[a-z]/.test(password)) {
      passwordErrors.push('one lowercase letter');
    }
    if (!/[A-Z]/.test(password)) {
      passwordErrors.push('one uppercase letter');
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      passwordErrors.push('one special character');
    }

    if (passwordErrors.length > 0) {
      alert(`Password must contain at least ${passwordErrors.join(', ')}.`);
      return;
    }

  fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert('Account created successfully!');
        } else {
          return response.json().then((data) => {
            throw new Error(data.message || 'Failed to create account');
          });
        }
      })
      .catch((error) => {
        alert(`Error: ${error.message}`);
      });
    
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-black' : 'bg-white'}`}>
      <div className={`max-w-md w-full p-8 rounded-lg shadow-lg ${isDark ? 'bg-black' : 'bg-white'}`}>
        <div className="flex flex-col items-center mb-4">
          <UserPlus size={40} className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`} />
        </div>
        <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-black'}`}>Create Account</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${isDark ? 'bg-gray-900 border-gray-800 text-gray-200 placeholder-gray-400' : 'border-gray-300'}`}
              required
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${isDark ? 'bg-gray-900 border-gray-800 text-gray-200 placeholder-gray-400' : 'border-gray-300'}`}
              required
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${isDark ? 'bg-gray-900 border-gray-800 text-gray-200 placeholder-gray-400' : 'border-gray-300'}`}
              required
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${isDark ? 'bg-gray-900 border-gray-800 text-gray-200 placeholder-gray-400' : 'border-gray-300'}`}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black hover:bg-gray-800 text-white py-3 px-6 rounded-lg font-medium transition-colors"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccountPage;