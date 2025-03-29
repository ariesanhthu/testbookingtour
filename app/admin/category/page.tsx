'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Plus, Pencil, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { categoryProps } from '@/app/interface';

export default function AdminCategoryPage() {
  const [categories, setCategories] = useState<categoryProps[]>([]);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [editingCategory, setEditingCategory] = useState<categoryProps | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/category');
      const data = await res.json();
      if (data.success) {
        setCategories(data.data || []);
      
        setStatus(null);
      } else {
        setStatus('Failed to fetch categories');
      }
    } catch (error) {
      setStatus('Error fetching categories');
    }
  };

  // Create or update category
  const handleCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      setStatus('Category name is required');
      return;
    }

    const url = editingCategory ? `/api/category/${editingCategory._id}` : '/api/category';
    const method = editingCategory ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, slug }),
      });
      const data = await res.json();
      if (data.success) {
        fetchCategories();
        resetForm();
        setStatus(editingCategory ? 'Category updated successfully' : 'Category created successfully');
      } else {
        setStatus(data.error || 'Failed to save category');
      }
    } catch (error) {
      setStatus('Error saving category');
    }
  };

  // Delete category
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/category/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (data.success) {
        fetchCategories();
        setStatus('Category deleted successfully');
      } else {
        setStatus(data.error || 'Failed to delete category');
      }
    } catch (error) {
      setStatus('Error deleting category');
    }
  };

  // Open edit dialog and populate form
  const handleEdit = (category: categoryProps) => {
    setEditingCategory(category);
    setName(category.name);
    setSlug(category.slug || '');
    setIsEditDialogOpen(true);
    setStatus(null);
  };

  // Reset form fields
  const resetForm = () => {
    setName('');
    setSlug('');
    setEditingCategory(null);
    setIsEditDialogOpen(false);
  };

  return (
    <div className="my-10 flex flex-col justify-center items-center mx-auto">
      <h1 className='title'>Quản lý danh mục</h1>
      {/* Status Message */}
      {status && <p className="text-red-500">{status}</p>}
      <div className="flex flex-col lg:flex-row gap-10 p-10 mx-auto justify-center">
      <Card className="min-w-[30rem]">
        <CardHeader>
          <CardTitle>{editingCategory ? 'Chỉnh sửa danh mục sản phẩm' : 'Thêm danh mục sản phẩm'}</CardTitle>
        </CardHeader>
        <form onSubmit={handleCreateOrUpdate}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="categoryName">Tên danh mục</Label>
              <Input
                id="categoryName"
                value={name}
                type='text'
                onChange={(e) => setName(e.target.value)}
                placeholder="Category name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="categorySlug">Category Slug</Label>
              <Input
                id="categorySlug"
                value={slug}
                type='text'
                onChange={(e) => setSlug(e.target.value)}
                placeholder="category-slug"
              />
            </div>
          </CardContent>
          <CardFooter className="justify-center">
            <Button type="submit" className="text-white">
              <Plus className="w-4 h-4 mr-2 text-white" />
              {editingCategory ? 'Lưu thay đổi' : 'Thêm mới'}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Table className="w-full border">
        <TableCaption>Danh sách category</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>Tên</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Sửa</TableHead>
                <TableHead>Xóa</TableHead>
            </TableRow>
        </TableHeader>

        <TableBody>
            {categories.map((category) => (
                <TableRow key={category._id}>
                    <TableCell className='w-[20rem]'>{category.name}</TableCell>
                    <TableCell className='w-[20rem]'>{category.slug}</TableCell>
                    <TableCell className='w-[10rem]'> 
                        <Button variant="outline" size="sm" onClick={() => handleEdit(category)}>
                            <Pencil className="w-4 h-4 mr-2" /> Sửa
                        </Button>
                    </TableCell >
                    <TableCell className='w-[10rem]'>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(category._id)}>
                            <Trash className="w-4 h-4 mr-2" /> Xóa
                        </Button>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
      </Table>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateOrUpdate}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="editCategoryName">Category Name</Label>
                <Input
                  id="editCategoryName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editCategorySlug">Category Slug</Label>
                <Input
                  id="editCategorySlug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
