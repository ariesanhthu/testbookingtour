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

export default function ServicePage() {
  const [services, setServices] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editserviceId, setEditService] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  // Fetch all Services
  const fetchServices = async () => {
    try {
      const res = await fetch('/api/service');
      const data = await res.json();
      if (data.success) {
        setServices(data.data || []);
        setStatus(null); // Clear any previous status
      } else {
        setStatus('Failed to fetch Services');
      }
    } catch (error) {
      setStatus('Error fetching Services');
    }
  };

  // Create or update service
  const handleCreateOrUpdate = async () => {
    if (!name) {
      setStatus('service name is required');
      return;
    }

    const url = '/api/service';
    const method = editserviceId ? 'PUT' : 'POST';
    const body = JSON.stringify({
      _id: editserviceId,
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
        fetchServices();
        resetForm();
        setStatus(editserviceId ? 'service updated successfully' : 'service created successfully');
      } else {
        setStatus(data.error || 'Failed to save service');
      }
    } catch (error) {
      setStatus('Error saving service');
    }
  };

  // Delete service
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch('/api/service', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        fetchServices();
        setStatus('service deleted successfully');
      } else {
        setStatus(data.error || 'Failed to delete service');
      }
    } catch (error) {
      setStatus('Error deleting service');
    }
  };

  // Edit service (populate form fields)
  const handleEdit = (service: any) => {
    setEditService(service._id);
    setName(service.name);
    setDescription(service.description || '');
    setStatus(null);
  };

  // Reset form fields
  const resetForm = () => {
    setName('');
    setDescription('');
    setEditService(null);
  };

  return (
    <div className="my-10 flex flex-col justify-center items-center mx-auto">
      <h1 className="title">Quản lý dịch vụ</h1>
      <div className="flex flex-col lg:flex-row gap-10 p-10 mx-auto justify-center">
        <Card className="min-w-[30rem]">
          {status && <p style={{ color: 'red'}}>{status}</p>}
          <CardHeader>
            <CardTitle>{editserviceId ? 'Chỉnh sửa dịch vụ' : 'Thêm dịch vụ'}</CardTitle>
          </CardHeader>
          <form>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="roleName">Dịch vụ</Label>
                <Input
                  id="roleName"
                  value={name}
                  type='text'
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Dịch vụ"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="roleDescription">Mô tả dịch vụ </Label>
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
                {editserviceId ? 'Save Changes' : 'Thêm dịch vụ'}
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
          <TableCaption>Danh sách dịch vụ</TableCaption>
          <TableHeader>
            <TableRow>
              <TableCell>Dịch vụ</TableCell>
              <TableCell> Mô tả </TableCell>
              <TableCell>Chỉnh sửa</TableCell>
              <TableCell>Xóa</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((role: any) => (
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
