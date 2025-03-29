"use client";

import Contactform from "./components/contactform/Contactform";
import RegionTour from "./components/RegionTour";
import ImageSlider from "./components/slider/SliderFull";
import Slogan from "./components/Slogan";
import { categoryProps, productProps } from "./interface";
import { useState, useEffect } from "react";
import axios from "axios";
import Tab from "./components/Tab";
import ProductList from "./components/ProductList";
import seedData from "@/app/lib/seedData";
import tourDatas from "./lib/tourData";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Testimonial from "./components/testimonials/Testimonials"
// export const dynamic = "force-dynamic";

const testimonials = [
  {
    name: "John Doe",
    avatar: "/avatar1.jpg",
    review: "Amazing experience! The team was so professional and helpful. I will definitely come back!",
    rating: 5,
  },
  {
    name: "Jane Smith",
    avatar: "/avatar2.jpg",
    review: "Great service and friendly staff. I highly recommend this to everyone!",
    rating: 4,
  },
  {
    name: "Michael Brown",
    avatar: "/avatar3.jpg",
    review: "Absolutely fantastic! They exceeded all my expectations.",
    rating: 5,
  },
];

export default function Home() {
  const [categories, setCategories] = useState<categoryProps[]>([]);
  const [products, setProducts] = useState<productProps[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingHomePage, setLoadingHomePage] = useState(true);
  const [homePageData, setHomePageData] = useState({
    _id: "",
    images: [] as string[],
    navbar: [
      {
        name: "",
        href: "",
        sublinks: [{ name: "", href: "" }],
      },
    ],
    logo: "",
    slogan: "",
    subSlogan: "",
    footer: {
      email: "",
      phone: "",
      address: "",
    },
  });

  // Fetch categories and homepage data concurrently on initial load
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
  //       // Fetch categories
  //       const categoryRes = await axios.get("/api/category");
  //       const categoriesData = categoryRes.data.data;
  //       setCategories(categoriesData);

  //       // If categories are available, select the first as default
  //       if (categoriesData.length > 0) {
  //         setSelectedCategory(categoriesData[0]._id);
  //       }
          setSelectedCategory("6782b1ad0cf0a980a16c16bd");
          setCategories(
            [
              {'_id': "6782b1ad0cf0a980a16c16bd", 'slug': "mien-nam", 'name': "Miền Nam"},
              {'_id': "6782b19f0cf0a980a16c16b8", 'slug': "mien-bac", 'name': "Miền Bắc"},
              {'_id': "678e5aa8f160f6e25546f998", 'slug': "mien-trung", 'name': "Miền Trung"},
            ]);
  //       // Fetch homepage data
          const homeRes = await fetch("/api/homepage");
          if (homeRes.ok) {
            const homeData = await homeRes.json();
            setHomePageData(homeData.data);
          } else {
            // If not found, create new homepage data
            const newHomeRes = await fetch("/api/homepage", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(seedData),
            });
            const newHomeData = await newHomeRes.json();
            setHomePageData(newHomeData.data);
          }
        } catch (error) {
          console.error("Error fetching initial data:", error);
        } finally {
          setLoadingHomePage(false);
      }
    };

    fetchInitialData();
  }, []);

  // Fetch products whenever the selected category changes
  useEffect(() => {
    if (selectedCategory) {
      const fetchProducts = async (categoryId: string) => {
        setLoadingProducts(true);
        try {
          const { data } = await axios.get(`/api/product/category/${categoryId}`);
          setProducts(data);
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          setLoadingProducts(false);
        }
      };

      fetchProducts(selectedCategory);
    }
  }, [selectedCategory]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="w-full h-full">
      <ImageSlider images={homePageData.images} />
      <Slogan slogan={homePageData.slogan} subSlogan={homePageData.subSlogan} />

      <div className="m-10">

        <h4 className="title">
          🔥 Tour được yêu thích
        </h4>

        {categories.length > 0 && (
          <Tab
            categories={categories}
            onSelect={(categoryId) => setSelectedCategory(categoryId)}
          />
        )}

        <ProductList products={products} isLoading={loadingProducts} />

      </div>

      <RegionTour />
      <Testimonial/>
      <Contactform />
    </div>
  );
}










