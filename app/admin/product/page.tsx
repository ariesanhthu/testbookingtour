'use client';

import { useState, useEffect } from 'react';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Trash, Sun, Sunset, Moon, Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Product } from '@/app/lib/models/Product';

import { categoryProps } from '@/app/interface';

import { productProps } from '@/app/interface';
import { BaseProduct, TourStop } from '@/app/interface';

import UploadFile from '@/app/components/uploadFile/UploadFile';
import mongoose from 'mongoose';

// UPLOAD IMAGE
import Image from 'next/image';
import Link from "next/link";
import { useEdgeStore } from "@/lib/edgestore";
import { SingleImageDropzone } from '@/app/components/uploadFile/SingleImageDropzone'

// preview
import ProductShow from '@/app/components/ProductInfo/ProductShow';

enum TimeOfDay {
    Morning = 'buổi sáng',
    Midday = 'buổi trưa',
    Afternoon = 'buổi chiều',
    Evening = 'buổi tối',
  }
  
// interface TourStop {
//     day: number;
//     timeOfDay: TimeOfDay;
//     time?: string | null;
//     place: string;
//     description?: string | null;
//     image: string;
//   }
  
  const INITIAL_PRODUCT: BaseProduct = {
    name: '',
    category: '',
    url: '',
    duration: '',
    groupSize: '',
    price: '',
    rating: 0,
    reviewCount: 0,
    description: '',
    highlights: [''],
    included: [''],
    notIncluded: [''],
    tourData: [],
  };
export default function AdProducts() {
    const [newProduct, setProduct] = useState<BaseProduct>(INITIAL_PRODUCT);
    
    const [products, setProducts] = useState<productProps[]>([]);
    const [categories, setCategories] = useState<categoryProps[]>([]);
    
    const [editingProduct, setEditingProduct] = useState<BaseProduct>();

    // ----------------------- IMAGE UPLOAD ------------------------
    const [file, setFile] = useState<File>();
    const [progress, setProgress] = useState(0);
    const [urls, setUrls] = useState<string>('');
    const { edgestore } = useEdgeStore();

    // -------------------------------------------------------------

    // -------------------- FETCH DATA -----------------------------
    useEffect(() => {
        fetchProducts();
        fetchCategories();
      }, []);

    const fetchCategories = async () => {
      try {
          console.log('fetch categories');

          const res = await fetch('/api/category');
          if (!res.ok) {
          throw new Error(`Failed to fetch categories: ${res.statusText}`);
          }
          const data = await res.json();
          if (data.success) {
          setCategories(data.data || []);
          } else {
          console.error('Error fetching categories: Invalid response format');
          }
      } catch (error) {
          console.error('Error fetching categories:', error);
      }
    };
    
    const fetchProducts = async () => {
    try {
        const response = await fetch('/api/product');
        const data = await response.json();
        console.log('products data: ', data);
        setProducts(data);
    } catch (error) {
        console.error('Failed to fetch products:', error);
    }
    };
    

    //---------------------------------------------------------------   


    const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();
      try {
        
        if(urls != '')
          await edgestore.publicFiles.confirmUpload({
            url: urls,
          });
        
        console.log('urls: ', urls);


        const response = await fetch('/api/product', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newProduct),
        });

        if (response.ok) {
          setProduct(INITIAL_PRODUCT);
          fetchProducts();
        }
      } catch (error) {
        console.error('Failed to create product:', error);
      }
    };

    const handleDelete = async (id: string) => {
      if (!confirm('Are you sure you want to delete this product?')) return;
      console.log(id);
      try {
        const response = await fetch(`/api/product/${id}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          fetchProducts();
        }
      } catch (error) {
        console.error('Failed to delete product:', error);
      }
    };
    // ===================== THÊM TRƯỜNG =====================
  const addArrayItem = (
    product: BaseProduct | typeof newProduct,
    field: keyof Pick<BaseProduct, 'highlights' | 'included' | 'notIncluded'>,
  ): void => {
    
    // Nếu product là null, thoát hàm
    if (!product) return; 
    
    // Sử dụng giá trị mặc định [] nếu product[field] là undefined
    const updatedArray = [...(product[field] ?? []), ''];
    
    // Nếu product là sản phẩm mới (INITIAL_PRODUCT)
    setProduct({ ...product, [field]: updatedArray });
    
    console.log(`Updated ${field}:`, updatedArray);
  };
  
  // ===================== XÓA TRƯỜNG =====================
  const removeArrayItem = (
    product: BaseProduct | typeof newProduct | null,
    field: keyof Pick<BaseProduct,'highlights' | 'included' | 'notIncluded'>,
    index: number
  ): void => {
    if (!product) return; // Nếu product là null, thoát hàm
  
    // Sử dụng giá trị mặc định [] nếu product[field] là undefined
    const updatedArray = (product[field] ?? []).filter((_, i) => i !== index);

      setProduct({ ...product, [field]: updatedArray });
    
      console.log(`REMOVE ${field}:`, updatedArray);
  };
  // edit
  const handleInputChangeArrayItem = (
    product: BaseProduct | typeof newProduct,
    field: keyof Pick<BaseProduct, 'highlights' | 'included' | 'notIncluded'>,
    index: number,
    value: string
  ): void => {
    
    // Nếu product là null, thoát hàm
    if (!product) return; 
    
    // Sử dụng giá trị mặc định [] nếu product[field] là undefined
    const updatedArray = [...(product[field] ?? [])];
    updatedArray[index] = value;

    // Nếu product là sản phẩm mới (INITIAL_PRODUCT)
    setProduct({ ...product, [field]: updatedArray });
    
    console.log(`CHANGE ${field}:`, updatedArray);
  };
  
// ===================== CRUD TOUR STOP =====================

const addTourStop = (product: BaseProduct | typeof newProduct) => {
    const updatedTourData : TourStop[] = [
      ...(product.tourData ?? []), // Provide a default empty array if tourData is undefined
      {
        day: (product.tourData?.length ?? 0) + 1, // Use 0 if tourData is undefined
        timeOfDay: TimeOfDay.Morning, // Use the enum value
        time: null,
        place: '',
        description: null,
        image: '',
      },
    ];

    // if (typeof product === 'object' && 'id' in product) {
    //   // Nếu product có trường 'id', nghĩa là đang chỉnh sửa sản phẩm hiện tại
    //   setEditingProduct({ ...(product as Product), tourData: updatedTourData });
    // } else if (product === INITIAL_PRODUCT) {
    //   // Nếu product là sản phẩm mới (INITIAL_PRODUCT)
      setProduct({ ...product, tourData: updatedTourData });
    // }
  };

  const updateTourStop = (
    product: BaseProduct | typeof newProduct,
    index: number,
    updates: Partial<TourStop>
  ) => {
    const updatedTourData = [...(product.tourData ?? [])];
    updatedTourData[index] = { ...(updatedTourData[index] ?? {}), ...updates };

    // if ('id' in product) {
    //   setEditingProduct({ ...(product as Product), tourData: updatedTourData });
    // } else {
      setProduct({ ...product, tourData: updatedTourData });
    // }
  };


  const removeTourStop = (product: BaseProduct | typeof newProduct, index: number) => {
    const updatedTourData = product.tourData?.filter((_, i) => i !== index) ?? [];

    // if ('id' in product) {
    //   setEditingProduct({ ...(product as Product), tourData: updatedTourData });
    // } else {
      setProduct({ ...product, tourData: updatedTourData });
    // }
  };
  const handleUploadSuccess = (url: string) => {
    setProduct((prev) => ({ ...prev, url }));
    console.log(newProduct);
  };

  const renderProductForm = (product: BaseProduct | typeof newProduct, onSubmit: (e: React.FormEvent) => Promise<void>) => (
    <form onSubmit={onSubmit} className="space-y-8">

      {/* ---------------- THÔNG TIN CHUNG ----------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Collapsible>
          
          <CollapsibleTrigger className='w-full flex flex-row items-center justify-start pb-2'>
              <Button type = "button" variant="secondary" size="sm">
                <ChevronsUpDown className="h-5 w-5 ml-auto text-primary" />
                <span className="sr-only">Toggle</span>
              </Button>
              <Label className='text-primary text-lg pl-10'>
                Thông tin chung
              </Label>
          </CollapsibleTrigger>

          <CollapsibleContent>
            {/* NAME */}
            <div className="space-y-2">
                <Label htmlFor="name">Tên</Label>
                    <Input
                    id="name"
                    value= {newProduct.name ?? ''}
                    onChange={(e) =>
                    //   'id' in product
                    //     ? setEditingProduct({ ...(product as Product), name: e.target.value })
                        setProduct({ ...newProduct, name: e.target.value })
                    }
                    required
                    />
            </div>
            {/* CATEGORIES */}
            <div className="space-y-2">
                <Label htmlFor="category">Danh mục sản phẩm</Label>
                <Select
                    value={product.category}
                    onValueChange={(value) =>
                        setProduct({ ...product, category: value })
                    }
                >
                    <SelectTrigger>
                    <SelectValue placeholder="Chọn mục" />
                    </SelectTrigger>
                    <SelectContent>
                    {categories.map((category) => (
                        <SelectItem key={category._id} value={category._id}>
                        {category.name}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Image URL */}
            <div className="space-y-2">
                <SingleImageDropzone
                  width={200}
                  height={200}
                  value={file}
                  dropzoneOptions={{
                    maxSize: 1024 * 1024 * 3, // 1MB
                  }}
                  onChange={async (file) => {
                    await setFile(file);
                    
                    if(file){
                      try {
                        const res = await edgestore.publicFiles.upload({
                            file,
                            options:{
                              temporary: true
                            }
                          }
                        )

                        await setUrls(res.url);
                       
                        await setProduct({ ...product, url: res.url });
                      } catch (error) 
                      {
                        console.error('Error uploading file:', error);
                      }
                    }
                  }
                  
                }
                />
               
                
            </div>

            {/* Duration */}
            <div className="space-y-2">
                <Label htmlFor="duration">Khoảng thời gian</Label>
                <Input
                id="duration"
                value={product.duration ?? ''}
                placeholder='2N1D'
                onChange={(e) =>
                    setProduct({ ...product, duration: e.target.value })
                }
                required
                />
            </div>

            {/* Group Size */}
            <div className="space-y-2">
                <Label htmlFor="groupSize">Số lượng hành khách</Label>
                <Input
                id="groupSize"
                value={product.groupSize ?? ''}
                onChange={(e) =>
                    setProduct({ ...product, groupSize: e.target.value })
                }
                required
                />
            </div>
            {/* Price */}
            <div className="space-y-2">
                <Label htmlFor="price">Giá</Label>
                <Input
                id="price"
                value={product.price ?? ''}
                onChange={(e) => setProduct({ ...product, price: e.target.value })
                }
                required
                />
            </div>
        
            {/* Description */}
            <div className="space-y-2">
                <Label htmlFor="description">Mô tả sản phẩm</Label>
                <Textarea
                id="description"
                value={product.description ?? ''}
                onChange={(e) => setProduct({ ...product, description: e.target.value })
                }
                required
                />
            </div>
            </CollapsibleContent>
        </Collapsible>
        </div>
      {/* ------------ THÔNG TIN NỔI BẬT ----------------- */}
        <Collapsible>
            <CollapsibleTrigger className='w-full flex flex-row items-center justify-start pb-2'>
              <Button type = "button" variant="secondary" size="sm" >
                <ChevronsUpDown className="h-5 w-5 ml-auto text-primary" />
                <span className="sr-only">Toggle</span>
              </Button>
              <Label className='text-primary text-lg pl-10'>
                Thông nổi bật
              </Label>
            </CollapsibleTrigger>
          {/* ========= HIGHTLIGHTS - INCLUDED - NOTINCLUED ========= */}
          <CollapsibleContent>
                {/* Highlights */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Địa điểm nổi bật</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addArrayItem(product, 'highlights')}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Thêm mục
                </Button>
              </div>
              {product.highlights?.map((highlight, index) => (
                <div key={index} className="flex gap-2">
                  <Textarea
                    value={highlight}
                    onChange={(e) =>
                      handleInputChangeArrayItem(product, 'highlights', index, e.target.value)
                    }
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeArrayItem(product, 'highlights', index)}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Included */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Giá sản phẩm bao gồm</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addArrayItem(product, 'included')}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Thêm mục
                </Button>
              </div>
              {product.included?.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={item}
                    onChange={(e) =>
                      handleInputChangeArrayItem(product, 'included', index, e.target.value)
                    }
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeArrayItem(product, 'included', index)}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* NOT INCLUDED */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <Label>Giá sản phẩm không bao gồm</Label>
                    <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addArrayItem(product, 'notIncluded')}
                    >
                    <Plus className="w-4 h-4 mr-2" />
                    Thêm mục
                    </Button>
                </div>
                {product.notIncluded?.map((item, index) => (
                    <div key={index} className="flex gap-2">
                    <Input
                        value={item}
                        onChange={(e) => 
                        handleInputChangeArrayItem(product, 'notIncluded', index, e.target.value)
                        }
                    />
                    
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeArrayItem(product, 'notIncluded', index)}
                    >
                        <Trash className="w-4 h-4" />
                    </Button>
                    </div>
                ))}
            </div>

          </CollapsibleContent>
        </Collapsible>

  {/* Tour Data */}
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <Label>Lịch trình</Label>
      <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => addTourStop(product)}
      >
        <Plus className="w-4 h-4 mr-2" />
          Thêm lịch trình
      </Button>
    </div>
        {product.tourData?.map((stop, index) => (
          <Card key={index}>
            <Collapsible>
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CollapsibleTrigger className='w-full'>
                  <CardHeader className="flex flex-row items-center w-full justify-between space-y-0 pb-2">
                    <div className="flex items-center space-x-2">
                      {/* Toggle Button: Căn trái */}
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        className="mr-2"
                      >
                        <ChevronsUpDown className="h-5 w-5" />
                        <span className="sr-only">Toggle</span>
                      </Button>

                      {/* Input Field */}
                      <Input
                        type="number"
                        value={stop.day}
                        onChange={(e) =>
                          updateTourStop(product, index, { day: Number(e.target.value) })
                        }
                        className="w-20"
                        min="1"
                      />
                      <span>Day</span>
                    </div>

                    {/* Trash Button: Căn phải */}
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeTourStop(product, index)}
                      className="ml-auto"
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </CardHeader>
                </CollapsibleTrigger>
              </div>
          
            <CollapsibleContent>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Time of Day</Label>
                    <select
                      value={stop.timeOfDay}
                      onChange={(e) =>
                        updateTourStop(product, index, {
                          timeOfDay: e.target.value as TimeOfDay,
                        })
                      }
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="buổi sáng">Buổi sáng</option>
                      <option value="buổi trưa">Buổi trưa</option>
                      <option value="buổi chiều">Buổi chiều</option>
                      <option value="buổi tối">Buổi tối</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Thời gian</Label>
                    <Input
                      type="text"
                      value={stop.time || ''}
                      onChange={(e) =>
                        updateTourStop(product, index, { time: e.target.value })
                      }
                      placeholder="HH:MM"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Địa điểm</Label>
                  <Input
                    value={stop.place}
                    onChange={(e) =>
                      updateTourStop(product, index, { place: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Mô tả</Label>
                  <Textarea
                    value={stop.description || ''}
                    onChange={(e) =>
                      updateTourStop(product, index, { description: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Image URL</Label>
                  <Input
                    value={stop.image}
                    onChange={(e) =>
                      updateTourStop(product, index, { image: e.target.value })
                    }
                    required
                  />
                  
                  <UploadFile onUploadSuccess={handleUploadSuccess}/>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
          </Card>
        ))}
      </div>

        <Button type="submit" className="w-full text-white">
            Tạo mới
        </Button>
    </form>
  );
    return (
  <div className="my-10 p-6 justify-center h-full w-full">
    <Tabs defaultValue="product" className='h-full w-full'>
      <TabsList>
        <TabsTrigger value="create">Tạo tour</TabsTrigger>
        <TabsTrigger value="list">Tour đã tạo</TabsTrigger>
      </TabsList>
      {/* Tab dành cho tạo tour */}
      <TabsContent value="create">
        <div className="flex flex-col md:flex-row gap-4 p-4">
          {/* Left Side - Product Display */}
          <div className="flex-1 rounded-md p-4 shadow">
            <ProductShow product={newProduct}/>
          </div>

          {/* Right Side - Form */}
          <div className="flex-1 p-4 shadow">
            <Card>
              <CardHeader>
                  <CardTitle>Thêm sản phẩm mới</CardTitle>
              </CardHeader>
              <CardContent>
                  {renderProductForm(newProduct, handleSubmit)}
              </CardContent>
            </Card>
          </div>
        </div>
      </TabsContent>
      
      {/* Tab dành cho danh sách tour */}
      <TabsContent value="list">
        <Table className='border my-10 rounded-2xl w-full'>
          <TableHeader>
            <TableRow>
              <TableHead>Tên sản phẩm</TableHead>
              <TableHead>Thời gian</TableHead>
              <TableHead>Giá</TableHead>
              <TableHead>Mô tả</TableHead>
              <TableHead>Xóa</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell className='min-w-[20rem]'>{product.name}</TableCell>
                <TableCell className='min-w-[10rem]'>{product.duration}</TableCell>
                <TableCell className='min-w-[10rem]'>{product.price}</TableCell>
                <TableCell className='min-w-[20rem] max-w-[30rem]'>{product.description}</TableCell>
                <TableCell className='min-w-[10rem]'>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(product._id)}
                  >
                    <Trash className="w-4 h-4 mr-2" />
                    Xóa
                  </Button>
                </TableCell>
              </TableRow>
            ))} 
          </TableBody>
        </Table>
      </TabsContent>
    </Tabs>
  </div>
)}