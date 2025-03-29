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
export default function RolePage() {
  const [roles, setRoles] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editRoleId, setEditRoleId] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    fetchRoles();
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
  };

  // Create or update role
  const handleCreateOrUpdate = async () => {
    if (!name) {
      setStatus('Role name is required');
      return;
    }

    const url = '/api/role';
    const method = editRoleId ? 'PUT' : 'POST';
    const body = JSON.stringify({
      _id: editRoleId,
      name,
      description,
    });

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body,
      });
      const data = await res.json();
      if (data.success) {
        fetchRoles();
        resetForm();
        setStatus(editRoleId ? 'Role updated successfully' : 'Role created successfully');
      } else {
        setStatus(data.error || 'Failed to save role');
      }
    } catch (error) {
      setStatus('Error saving role');
    }
  };

  // Delete role
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch('/api/role', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        fetchRoles();
        setStatus('Role deleted successfully');
      } else {
        setStatus(data.error || 'Failed to delete role');
      }
    } catch (error) {
      setStatus('Error deleting role');
    }
  };

  // Edit role (populate form fields)
  const handleEdit = (role: any) => {
    setEditRoleId(role._id);
    setName(role.name);
    setDescription(role.description || '');
    setStatus(null);
  };

  // Reset form fields
  const resetForm = () => {
    setName('');
    setDescription('');
    setEditRoleId(null);
  };

  return (
    <div className="my-10 flex flex-col justify-center items-center mx-auto">
      <h1 className='title'>Quản lý vai trò</h1>
      <div className="flex flex-col lg:flex-row gap-10 p-10 mx-auto justify-center">
        <Card className="min-w-[30rem]">
          {status && <p style={{ color: 'red'}}>{status}</p>}
          <CardHeader>
            <CardTitle>{editRoleId ? 'Chỉnh sửa vai trò' : 'Thêm vai trò'}</CardTitle>
          </CardHeader>
          <form>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="roleName">Vai trò</Label>
                <Input
                  id="roleName"
                  value={name}
                  type='text'
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Vai trò"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="roleDescription">Mô tả vai trò </Label>
                <Input
                  id="roleDescription"
                  value={description}
                  type='text'
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Mô tả"
                />
              </div>
            </CardContent>
            <CardFooter className="justify-center">
              <Button onClick={handleCreateOrUpdate} className="text-white">
                <Plus className="w-4 h-4 mr-2 text-white" />
                {editRoleId ? 'Save Changes' : 'Thêm vai trò'}
              </Button>
              {/* <Button onClick={resetForm} className="text-white">
                <Plus className="w-4 h-4 mr-2 text-white" />
                Reset form
              </Button> */}
            </CardFooter>
          </form>
        </Card>
        {/* Role List */}
        <Table className="w-full border rounded-md">
          <TableCaption>Danh sách vai trò </TableCaption>
          <TableHeader>
            <TableRow>
              <TableCell>Vai trò</TableCell>
              <TableCell> Mô tả </TableCell>
              <TableCell>Chỉnh sửa</TableCell>
              <TableCell>Xóa</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.map((role: any) => (
              <TableRow key={role._id}>
                <TableCell className='min-w-[10rem]'>{role.name}</TableCell>
                <TableCell className='min-w-[10rem]'>{role.description || "Khong có mô tả"}</TableCell>
                <TableCell className='min-w-[10rem]'> 
                  <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleEdit(role._id)}
                    >
                      <Pencil className="w-4 h-4 mr-2" />
                      Chỉnh sửa
                    </Button>
                </TableCell>
                <TableCell className='min-w-[10rem]'>
                  <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(role._id)}
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
