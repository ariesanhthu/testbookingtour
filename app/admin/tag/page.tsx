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
  const [tags, setTag] = useState([]);
  const [name, setTagname] = useState('');
  const [description, setDescription] = useState('');
  const [editTagname, setEditTag] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    fetchTags();
  }, []);

  // Fetch all tags
  const fetchTags = async () => {
    try {
      const res = await fetch('/api/tag');
      const data = await res.json();
      if (data.success) {
        setTag(data.data || []);
        setStatus(null); // Clear any previous status
      } else {
        setStatus('Failed to fetch Tags');
      }
    } catch (error) {
      setStatus('Error fetching Tags');
    }
  };

  // Create or update tag
  const handleCreateOrUpdate = async () => {
    if (!name) {
      setStatus('Tagname is required');
      return;
    }

    const url = '/api/tag';
    const method = editTagname ? 'PUT' : 'POST';
    const body = JSON.stringify({
      _id: editTagname,
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
        fetchTags();
        resetForm();
        setStatus(editTagname ? 'tag updated successfully' : 'tag created successfully');
      } else {
        setStatus(data.error || 'Failed to save tag');
      }
    } catch (error) {
      setStatus('Error saving tag');
    }
  };

  // Delete tag
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch('/api/tag', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        fetchTags();
        setStatus('tag deleted successfully');
      } else {
        setStatus(data.error || 'Failed to delete tag');
      }
    } catch (error) {
      setStatus('Error deleting tag');
    }
  };

  // Edit tag (populate form fields)
  const handleEdit = (tag: any) => {
    setEditTag(tag._id);
    setTagname(tag.name);
    setStatus(null);
  };

  // Reset form fields
  const resetForm = () => {
    setTagname('');
    setEditTag(null);
  };

  return (
    <div className="my-10 flex flex-col justify-center items-center mx-auto">
      <h1 className='title'>Quản lý tag</h1>
      <div className="flex flex-col lg:flex-row gap-10 p-10 mx-auto justify-center">
        <Card className="min-w-[30rem]">
          {status && <p style={{ color: 'red'}}>{status}</p>}
          <CardHeader>
            <CardTitle>{editTagname ? 'Chỉnh sửa tag' : 'Thêm tag'}</CardTitle>
          </CardHeader>
          <form>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="roleName">Tag</Label>
                <Input
                  id="roleName"
                  value={name}
                  type='text'
                  onChange={(e) => setTagname(e.target.value)}
                  placeholder="Tag"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="roleDescription">Mô tả tag </Label>
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
                {editTagname ? 'Save Changes' : 'Thêm tag'}
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
          <TableCaption>Danh sách tag</TableCaption>
          <TableHeader>
            <TableRow>
              <TableCell>Tag</TableCell>
              <TableCell> Mô tả </TableCell>
              <TableCell>Chỉnh sửa</TableCell>
              <TableCell>Xóa</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tags.map((tag: any) => (
              <TableRow key={tag._id}>
                <TableCell className='min-w-[10rem]'>{tag.name}</TableCell>
                <TableCell className='min-w-[10rem]'>{tag.description || "Khong có mô tả"}</TableCell>
                <TableCell className='min-w-[10rem]'> 
                  <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleEdit(tag._id)}
                    >
                      <Pencil className="w-4 h-4 mr-2" />
                      Chỉnh sửa
                    </Button>
                </TableCell>
                <TableCell className='min-w-[10rem]'>
                  <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(tag._id)}
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
