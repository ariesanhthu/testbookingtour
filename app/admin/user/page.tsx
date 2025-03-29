'use client';

import { useState, useEffect } from 'react';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash, Pencil } from "lucide-react";

type Role = {
  _id: string;
  name: string;
};

type User = {
  _id: string;
  username: string;
  password?: string;
  roles: string[];
};

export default function RolePage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRole, setSelectedRole] = useState('');

  const [users, setUser] = useState<User[]>([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [editUsername, setEditUser] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    fetchRoles();
    fetchUsers();
  }, []);

  // Fetch all roles
  const fetchRoles = async () => {
    try {
      const res = await fetch('/api/role');
      const data = await res.json();
      if (data.success) {
        setRoles(data.data || []);
        setStatus(null); // Clear any previous status
      } else {
        setStatus('Failed to fetch roles');
      }
    } catch (error) {
      setStatus('Error fetching roles');
    }
  }

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

  const findRoleUser = (roleIds: string[]) => {
    console.log("ID", roleIds[0]);
    if (!roleIds || roleIds.length === 0) return 'Unknown Role';
    const role = roles.find((role: Role) => role._id === roleIds[0]);
    return role ? role.name : 'Unknown Role';
  };

  const assignRoleToUser = async (userId: string, roleId: string) => {
    try {
      const res = await fetch(`/api/role/${roleId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        setStatus(data.error);
      }
    } catch (error: any) {
      setStatus(error.message);
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
        assignRoleToUser(data.data._id, selectedRole);
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
  const handleEdit = (user: User) => {
    setEditUser(user._id);
    setUsername(user.username);
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
    <div className="my-10 flex flex-col justify-center items-center mx-auto">
      <h1 className='title'>Quản lý người dùng</h1>
      <div className="flex flex-col lg:flex-row gap-10 p-10 mx-auto justify-center">
        {/* User Form */}
        <Card className="min-w-[30rem]">
          {status && <p style={{ color: 'red'}}>{status}</p>}
          <CardHeader>
            <CardTitle>{editUsername ? 'Chỉnh sửa vai trò' : 'Thêm người dùng'}</CardTitle>
          </CardHeader>
          <form>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  type='text'
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="username"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu </Label>
                <Input
                  id="password"
                  value={password}
                  type='text'
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mật khẩu"
                />
              </div>
              <div className="space-y-2 flex flex-col">
                <Label htmlFor="role">Vai trò</Label>
                <select
                  id="role"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                >
                  <option value="">Chọn vai trò</option>
                  {roles.map((role: Role) => (
                    <option key={role._id} value={role._id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>
            </CardContent>
            <CardFooter className="justify-center">
              <Button onClick={handleCreateOrUpdate} className="text-white">
                <Plus className="w-4 h-4 mr-2 text-white" />
                {editUsername ? 'Save Changes' : 'Thêm người dùng'}
              </Button>
              {/* <Button onClick={resetForm} className="text-white">
                <Plus className="w-4 h-4 mr-2 text-white" />
                Reset form
              </Button> */}
            </CardFooter>
          </form>
        </Card>
        {/* User List */}
        <Table className="w-full border rounded-md">
          <TableCaption>Danh sách người dùng</TableCaption>
          <TableHeader>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Chỉnh sửa</TableCell>
              <TableCell>Xóa</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user: User) => (
              <TableRow key={user._id}>
                <TableCell className='min-w-[10rem]'>{user.username}</TableCell>
                <TableCell className='min-w-[10rem]'>{findRoleUser(user.roles)}</TableCell>
                <TableCell className='min-w-[10rem]'>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleEdit(user)}
                  >
                    <Pencil className="w-4 h-4 mr-2" />
                    Chỉnh sửa
                  </Button>
                </TableCell>
                <TableCell className='min-w-[10rem]'>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(user._id)}
                  >
                    <Trash className="w-4 h-4 mr-2" />
                    Xóa
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
