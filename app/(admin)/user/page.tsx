'use client';

import { useState, useEffect } from 'react';

export default function RolePage() {
  const [users, setUser] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [editUsername, setEditUser] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch all roles
  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/user');
      const data = await res.json();
      if (data.success) {
        setUser(data.data || []);
        setStatus(null); // Clear any previous status
      } else {
        setStatus('Failed to fetch users');
      }
    } catch (error) {
      setStatus('Error fetching users');
    }
  };

  // Create or update role
  const handleCreateOrUpdate = async () => {
    if (!username) {
      setStatus('Username is required');
      return;
    }

    const url = '/api/user';
    const method = editUsername ? 'PUT' : 'POST';
    const body = JSON.stringify({
      _id: editUsername,
      username,
      password,
    });

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body,
      });
      const data = await res.json();
      if (data.success) {
        fetchUsers();
        resetForm();
        setStatus(editUsername ? 'User updated successfully' : 'User created successfully');
      } else {
        setStatus(data.error || 'Failed to save user');
      }
    } catch (error) {
      setStatus('Error saving user');
    }
  };

  // Delete role
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch('/api/user', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        fetchUsers();
        setStatus('User deleted successfully');
      } else {
        setStatus(data.error || 'Failed to delete user');
      }
    } catch (error) {
      setStatus('Error deleting user');
    }
  };

  // Edit role (populate form fields)
  const handleEdit = (user: any) => {
    setEditUser(user._id);
    setUsername(user.name);
    setPassword(user.password || '');
    setStatus(null);
  };

  // Reset form fields
  const resetForm = () => {
    setUsername('');
    setPassword('');
    setEditUser(null);
  };

  return (
    <div>
      <h1>User Management</h1>

      {/* Status Message */}
      {status && <p style={{ color: 'red'}}>{status}</p>}

      {/* Form for Create/Update */}
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleCreateOrUpdate}>
          {editUsername ? 'Update user' : 'Create user'}
        </button>
        {editUsername && <button onClick={resetForm}>Cancel</button>}
      </div>

      {/* Role List */}
      <ul>
        {users.map((user: any) => (
          <li key={user._id}>
            <strong>Username:  {user.username}</strong>
            <button onClick={() => handleEdit(user._id)}>Edit</button> 
            <button onClick={() => handleDelete(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
