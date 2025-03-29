// // "use client";

// // import { useState, useEffect } from "react";
// // import { ChevronLeft, ChevronRight, Star } from "lucide-react";
// // import { cn } from "@/lib/utils"; 
// // import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
// // import Image from "next/image";

// // const testimonials = [
// //   { id: 1, name: "Phung Quach", avatar: "/avatar1.jpg", review: "HDV vui vẻ, nhiệt tình sẽ ủng hộ nữa ạ!", rating: 5 },
// //   { id: 2, name: "Nguyễn Đức Vĩnh", avatar: "/avatar2.jpg", review: "Dịch vụ tốt, chất lượng!", rating: 4 },
// //   { id: 3, name: "Louis Tran", avatar: "/avatar3.jpg", review: "Giá cả hợp lý, hướng dẫn viên tận tình!", rating: 5 },
// //   // { id: 4, name: "Alice Wonderland", avatar: "/avatar4.jpg", review: "Highly recommend!", rating: 5 },
// //   // { id: 5, name: "David Johnson", avatar: "/avatar5.jpg", review: "Wonderful experience!", rating: 4 },
// // ];

// // const infiniteTestimonials = [...testimonials, ...testimonials];

// // export default function Testimonial() {
// //   const [index, setIndex] = useState(testimonials.length - 2); // Bắt đầu ở giữa danh sách nhân đôi

// //   // Hàm cuộn sang trái
// //   const prevTestimonial = () => {
// //     setIndex((prev) => prev - 1);
// //   };

// //   // Hàm cuộn sang phải
// //   const nextTestimonial = () => {
// //     setIndex((prev) => prev + 1);
// //   };

// //   // Hiệu ứng reset index khi chạm giới hạn
// //   useEffect(() => {
// //     const timer = setTimeout(() => {
// //       if (index === -1) {
// //         setIndex(testimonials.length - 1);
// //       } else if (index === infiniteTestimonials.length - 2) {
// //         setIndex(testimonials.length - 2);
// //       }
// //     }, 500); // Delay nhỏ để reset vị trí mượt hơn

// //     return () => clearTimeout(timer);
// //   }, [index]);
  
// //   const intervalTime = 5000; // 5 giây (có thể chỉnh sửa)

// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       nextTestimonial();
// //     }, intervalTime);
  
// //     return () => clearInterval(interval); // Dọn dẹp khi component unmount
// //   }, [index]); // Chạy lại mỗi khi index thay đổi
  
// //   return (
// //     <div className="relative flex flex-col items-center justify-center w-full mx-auto mt-28 px-5">
// //       <div className="container mx-auto text-center">
// //         <h2 className="text-xl md:text-2xl font-bold">Khách hàng nói gì về chúng tôi?</h2>
// //         <p className="text-md md:text-lg mt-2">Những đánh giá thực tế từ những chuyến đi đáng nhớ.</p>
// //       </div>

// //       <div className="relative flex flex-row h-full w-full justify-center items-center">
// //         {/* Nút trái */}
// //         <button 
// //           onClick={prevTestimonial} 
// //           className="flex-[1] absolute left-0 z-10 p-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600"
// //         >
// //           <ChevronLeft className="w-4 md:w-6 h-4 md:h-6" />
// //         </button>
        

// //         {/* Danh sách Card */}
// //         <div className="relative flex w-full h-[25rem] justify-center items-center overflow-hidden mx-0">
// //           <div
// //             className="flex flex-row space-x-0 transition-transform duration-700 ease-in-out"
// //             style={{ transform: `translateX(-${index * 20}%)` }} // Trượt nhẹ, luôn thấy 3 card
// //           >
// //             {infiniteTestimonials.map((t, i) => {
// //               let scale = "scale-[80%] opacity-50"; // Mặc định: nhỏ + mờ (hai bên)
// //               if (i === index + 2) scale = "scale-[100%]  opacity-100 glow-card hover:shadow-glow-hover"; // Card chính giữa

// //               return (
// //                 <Card
// //                   className={cn(
// //                     "w-2/5 py-6 flex-shrink-0 flex flex-col justify-center px-2 md:px-6 rounded-lg transition-all duration-700 ease-in-out transform",
// //                     scale
// //                   )}
// //                 >
// //                   <CardHeader className="flex flex-row">
// //                     {/*thay cai nay bang Image*/}
// //                     <Image
// //                       src={t.avatar}
// //                       alt={"t.name"}
// //                       width={50} 
// //                       height={50} 
// //                       className="rounded-full"
// //                     />
// //                     <p className="ml-3 text-md md:text-xl font-semibold">{t.name}</p>
// //                   </CardHeader>

// //                   <CardContent className="">
// //                     <p className="mt-4 text-sm md:text-lg">{t.review.length > 50 ? t.review.substring(0, 50) + "..." : t.review}</p>
// //                   </CardContent>

// //                   <CardFooter>
// //                     {[...Array(t.rating)].map((_, i) => (
// //                       <Star key={i} fill="yellow" className="" size={18} />
// //                     ))}
// //                     {[...Array(5 - t.rating)].map((_, i) => (
// //                       <Star key={i} className="" strokeWidth={0} size={18} />
// //                     ))}
// //                   </CardFooter>
// //                 </Card>
// //               );
// //             })}
// //           </div>
// //         </div>
      
// //         {/* Nút phải */}
        
// //         <button 
// //           onClick={nextTestimonial} 
// //           className="flex-[1] absolute right-0 z-10 p-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600"
// //         >
// //           <ChevronRight className="w-4 md:w-6 h-4 md:h-6" />
// //         </button>
        
// //       </div>
// //     </div>
// //   );
// // }
// // ------------------------------------------------------------

// "use client";

// import { useState, useEffect } from "react";
// import { ChevronLeft, ChevronRight, Star } from "lucide-react";
// import { cn } from "@/lib/utils"; 
// import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
// import Image from "next/image";

// const testimonials = [
//   { id: 1, name: "Phung Quach", avatar: "/avatar1.jpg", review: "Hdv vui vẻ , nhiệt tình sẽ ủng hộ nữa ạ", rating: 5 },
//   { id: 2, name: "Nguyễn Đức Vĩnh", avatar: "/avatar2.jpg", review: "Dịch vụ tốt, chất lượng!", rating: 4 },
//   { id: 3, name: "Louis Tran", avatar: "/avatar3.jpg", review: "Giá cả hợp lý, hướng dẫn viên tận tình!", rating: 5 },
// ];

// const infiniteTestimonials = [...testimonials, ...testimonials];

// export default function Testimonial() {
//   // const [index, setIndex] = useState(testimonials.length - 2);
//   const [activeIndex, setActiveIndex] = useState(1);

//   // Hàm chuyển sang card kế tiếp (hướng phải)
//   const goToNext = () => {
//     setActiveIndex((prev) => (prev + 1) % testimonials.length);
//   };

//   // Hàm chuyển sang card trước (hướng trái)
//   const goToPrev = () => {
//     setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
//   };

//   // Tự động chuyển sau mỗi 5 giây
//   useEffect(() => {
//     const interval = setInterval(() => {
//       goToNext();
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   // Tính chỉ số của card bên trái và bên phải dựa vào activeIndex
//   const leftIndex = (activeIndex - 1 + testimonials.length) % testimonials.length;
//   const rightIndex = (activeIndex + 1) % testimonials.length;

//   // const prevTestimonial = () => {
//   //   setIndex((prev) => prev - 1);
//   // };

//   // const nextTestimonial = () => {
//   //   setIndex((prev) => prev + 1);
//   // };

//   // useEffect(() => {
//   //   const timer = setTimeout(() => {
//   //     if (index === -1) {
//   //       setIndex(testimonials.length - 1);
//   //     } else if (index === infiniteTestimonials.length - 2) {
//   //       setIndex(testimonials.length - 2);
//   //     }
//   //   }, 500);
//   //   return () => clearTimeout(timer);
//   // }, [index]);

//   // const intervalTime = 5000;
//   // useEffect(() => {
//   //   const interval = setInterval(() => {
//   //     nextTestimonial();
//   //   }, intervalTime);
//   //   return () => clearInterval(interval);
//   // }, [index]);

//   return (
//     <div className="relative flex flex-col items-center justify-center w-full mx-auto mt-28 px-5">
//       <div className="container mx-auto text-center">
//         <h2 className="text-xl md:text-2xl font-bold">Khách hàng nói gì về chúng tôi?</h2>
//         <p className="text-md md:text-lg mt-2">Những đánh giá thực tế từ những chuyến đi đáng nhớ.</p>
//       </div>

//       <div className="relative flex flex-row h-full w-full justify-center items-center">
//         {/* Left navigation button */}
//         <button 
//           onClick={prevTestimonial} 
//           className="absolute left-0 z-10 p-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600"
//         >
//           <ChevronLeft className="w-4 md:w-6 h-4 md:h-6" />
//         </button>

//         {/* Cards container */}
//         <div className="relative flex w-full h-[25rem] justify-center items-center overflow-hidden">
//           <div
//             className="flex flex-row space-x-4 transition-transform duration-700 ease-in-out"
//             style={{ transform: `translateX(-${index * 24}%)` }} // Adjust the translate percentage if needed
//           >
//             {infiniteTestimonials.map((t, i) => {
//               const scaleClass = i === index + 2 
//                 ? "scale-110 opacity-100 glow-card hover:shadow-glow-hover" 
//                 : "scale-90 opacity-50";
//               return (
//                 <Card
//                   key={`${t.id}-${i}`}
//                   className={cn(
//                     "w-96 py-6 flex-shrink-0 flex flex-col justify-center px-2 md:px-6 rounded-lg transition-all duration-700 ease-in-out transform",
//                     scaleClass
//                   )}
//                 >
//                   <CardHeader className="flex flex-row items-center">
//                     <Image
//                       src={t.avatar}
//                       alt={t.name}
//                       width={50} 
//                       height={50} 
//                       className="rounded-full"
//                     />
//                     <p className="ml-3 text-md md:text-xl font-semibold">{t.name}</p>
//                   </CardHeader>

//                   <CardContent>
//                     <p className="mt-4 text-sm md:text-lg w-5/6 font-bold">
//                       {t.review.length > 50 ? t.review.substring(0, 50) + "..." : t.review}
//                     </p>
//                   </CardContent>

//                   <CardFooter className="flex space-x-1 mt-4">
//                     {[...Array(t.rating)].map((_, i) => (
//                       <Star key={i} fill="yellow" strokeWidth={0} size={18} />
//                     ))}
//                     {[...Array(5 - t.rating)].map((_, i) => (
//                       <Star key={i} strokeWidth={0} size={18} />
//                     ))}
//                   </CardFooter>
//                 </Card>
//               );
//             })}
//           </div>
//         </div>

//         {/* Right navigation button */}
//         <button 
//           onClick={nextTestimonial} 
//           className="absolute right-0 z-10 p-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600"
//         >
//           <ChevronRight className="w-4 md:w-6 h-4 md:h-6" />
//         </button>
//       </div>
//     </div>
//   );
// }
// "use client";

// import { useState, useEffect } from "react";
// import { ChevronLeft, ChevronRight, Star } from "lucide-react";
// import { cn } from "@/lib/utils"; 
// import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
// import Image from "next/image";

// const testimonials = [
//   { id: 1, name: "Phung Quach", avatar: "/avatar1.jpg", review: "Hdv vui vẻ , nhiệt tình sẽ ủng hộ nữa ạ", rating: 5 },
//   { id: 2, name: "Nguyễn Đức Vĩnh", avatar: "/avatar2.jpg", review: "Dịch vụ tốt, chất lượng!", rating: 4 },
//   { id: 3, name: "Louis Tran", avatar: "/avatar3.jpg", review: "Giá cả hợp lý, hướng dẫn viên tận tình!", rating: 5 },
// ];

// export default function Testimonial() {
//   // activeIndex dùng để xác định card ở giữa
//   const [activeIndex, setActiveIndex] = useState(1);

//   // Chuyển sang card bên phải (vòng lặp)
//   const goToNext = () => {
//     setActiveIndex((prev) => (prev + 1) % testimonials.length);
//   };

//   // Chuyển sang card bên trái (vòng lặp)
//   const goToPrev = () => {
//     setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
//   };

//   // Auto slide mỗi 5 giây
//   useEffect(() => {
//     const interval = setInterval(() => {
//       goToNext();
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   // Tính chỉ số của card bên trái và bên phải dựa trên activeIndex
//   const leftIndex = (activeIndex - 1 + testimonials.length) % testimonials.length;
//   const rightIndex = (activeIndex + 1) % testimonials.length;

//   return (
//     <div className="relative flex flex-col items-center justify-center w-full mx-auto mt-28 px-5">
//       <div className="container mx-auto text-center">
//         <h2 className="text-xl md:text-2xl font-bold">Khách hàng nói gì về chúng tôi?</h2>
//         <p className="text-md md:text-lg mt-2">Những đánh giá thực tế từ những chuyến đi đáng nhớ.</p>
//       </div>

//       <div className="relative flex flex-row h-full w-full justify-center items-center">
//         {/* Nút chuyển sang trái */}
//         <button 
//           onClick={goToPrev} 
//           className="absolute left-0 z-10 p-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600"
//         >
//           <ChevronLeft className="w-4 md:w-6 h-4 md:h-6" />
//         </button>

//         {/* Container chứa 3 card */}
//         <div className="flex space-x-4 items-center transition-transform duration-700 ease-in-out">
//           {/* Card bên trái */}
//           <div className="transform transition-all duration-700 scale-90 opacity-50 ease-in-out">
//             <Card className="w-96 py-6 flex-shrink-0 flex flex-col justify-center px-2 md:px-6 rounded-lg transition-all duration-700 ease-in-out">
//               <CardHeader className="flex flex-row items-center">
//                 <Image
//                   src={testimonials[leftIndex].avatar}
//                   alt={testimonials[leftIndex].name}
//                   width={50} 
//                   height={50} 
//                   className="rounded-full"
//                 />
//                 <p className="ml-3 text-md md:text-xl font-semibold">{testimonials[leftIndex].name}</p>
//               </CardHeader>

//               <CardContent>
//                 <p className="mt-4 text-sm md:text-lg w-5/6 font-bold">
//                   {testimonials[leftIndex].review.length > 50
//                     ? testimonials[leftIndex].review.substring(0, 50) + "..."
//                     : testimonials[leftIndex].review}
//                 </p>
//               </CardContent>

//               <CardFooter className="flex space-x-1 mt-4">
//                 {[...Array(testimonials[leftIndex].rating)].map((_, i) => (
//                   <Star key={i} fill="yellow" strokeWidth={0} size={18} />
//                 ))}
//                 {[...Array(5 - testimonials[leftIndex].rating)].map((_, i) => (
//                   <Star key={i} strokeWidth={0} size={18} />
//                 ))}
//               </CardFooter>
//             </Card>
//           </div>

//           {/* Card ở giữa (active) */}
//           <div className="transform transition-all duration-700 scale-110 opacity-100 glow-card hover:shadow-glow-hover ease-in-out">
//             <Card className="w-96 py-6 flex-shrink-0 flex flex-col justify-center px-2 md:px-6 rounded-lg transition-all duration-700 ease-in-out">
//               <CardHeader className="flex flex-row items-center">
//                 <Image
//                   src={testimonials[activeIndex].avatar}
//                   alt={testimonials[activeIndex].name}
//                   width={50} 
//                   height={50} 
//                   className="rounded-full"
//                 />
//                 <p className="ml-3 text-md md:text-xl font-semibold">{testimonials[activeIndex].name}</p>
//               </CardHeader>

//               <CardContent>
//                 <p className="mt-4 text-sm md:text-lg w-5/6 font-bold">
//                   {testimonials[activeIndex].review.length > 50
//                     ? testimonials[activeIndex].review.substring(0, 50) + "..."
//                     : testimonials[activeIndex].review}
//                 </p>
//               </CardContent>

//               <CardFooter className="flex space-x-1 mt-4">
//                 {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
//                   <Star key={i} fill="yellow" strokeWidth={0} size={18} />
//                 ))}
//                 {[...Array(5 - testimonials[activeIndex].rating)].map((_, i) => (
//                   <Star key={i} strokeWidth={0} size={18} />
//                 ))}
//               </CardFooter>
//             </Card>
//           </div>

//           {/* Card bên phải */}
//           <div className="transform transition-all duration-700 scale-90 opacity-50">
//             <Card className="w-96 py-6 flex-shrink-0 flex flex-col justify-center px-2 md:px-6 rounded-lg transition-transform duration-700 ease-in-out transform">
//               <CardHeader className="flex flex-row items-center">
//                 <Image
//                   src={testimonials[rightIndex].avatar}
//                   alt={testimonials[rightIndex].name}
//                   width={50} 
//                   height={50} 
//                   className="rounded-full"
//                 />
//                 <p className="ml-3 text-md md:text-xl font-semibold">{testimonials[rightIndex].name}</p>
//               </CardHeader>

//               <CardContent>
//                 <p className="mt-4 text-sm md:text-lg w-5/6 font-bold">
//                   {testimonials[rightIndex].review.length > 50
//                     ? testimonials[rightIndex].review.substring(0, 50) + "..."
//                     : testimonials[rightIndex].review}
//                 </p>
//               </CardContent>

//               <CardFooter className="flex space-x-1 mt-4">
//                 {[...Array(testimonials[rightIndex].rating)].map((_, i) => (
//                   <Star key={i} fill="yellow" strokeWidth={0} size={18} />
//                 ))}
//                 {[...Array(5 - testimonials[rightIndex].rating)].map((_, i) => (
//                   <Star key={i} strokeWidth={0} size={18} />
//                 ))}
//               </CardFooter>
//             </Card>
//           </div>
//         </div>

//         {/* Nút chuyển sang phải */}
//         <button 
//           onClick={goToNext} 
//           className="absolute right-0 z-10 p-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600"
//         >
//           <ChevronRight className="w-4 md:w-6 h-4 md:h-6" />
//         </button>
//       </div>
//     </div>
//   );
// }
// -------------------

"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { cn } from "@/lib/utils"; 
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";

const testimonials = [
  { id: 1, name: "Phung Quach", avatar: "/avatar1.jpg", review: "Hdv vui vẻ , nhiệt tình sẽ ủng hộ nữa ạ", rating: 5 },
  { id: 2, name: "Nguyễn Đức Vĩnh", avatar: "/avatar2.jpg", review: "Dịch vụ tốt, chất lượng!", rating: 4 },
  { id: 3, name: "Louis Tran", avatar: "/avatar3.jpg", review: "Giá cả hợp lý, hướng dẫn viên tận tình!", rating: 5 },
];

export default function Testimonial() {
  // activeIndex dùng để xác định card ở giữa
  const [activeIndex, setActiveIndex] = useState(1);

  // Chuyển sang card bên phải (vòng lặp)
  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  // Chuyển sang card bên trái (vòng lặp)
  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto slide mỗi 5 giây
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Tính chỉ số của card bên trái và bên phải dựa trên activeIndex
  const leftIndex = (activeIndex - 1 + testimonials.length) % testimonials.length;
  const rightIndex = (activeIndex + 1) % testimonials.length;

  return (
    <div className="relative flex flex-col items-center justify-center w-full mx-auto mt-28 px-5">
      <div className="container mx-auto text-center mb-20">
        <h2 className="text-xl md:text-2xl font-bold">Khách hàng nói gì về chúng tôi?</h2>
        <p className="text-md md:text-lg mt-2">Những đánh giá thực tế từ những chuyến đi đáng nhớ.</p>
      </div>

      <div className="relative flex flex-row h-full w-full justify-center items-center mt-10">
        {/* Nút chuyển sang trái */}
        <button 
          onClick={goToPrev} 
          className="absolute left-0 z-10 p-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600"
        >
          <ChevronLeft className="w-4 md:w-6 h-4 md:h-6" />
        </button>

        {/* Container chứa 3 card */}
        <div className="flex space-x-4 items-center transition-transform duration-700 ease-in-out">
          {/* Card bên trái */}
          <div className="transform transition-all duration-700 scale-90 opacity-50 ease-in-out">
            <Card className="w-96 py-6 flex-shrink-0 flex flex-col justify-center px-2 md:px-6 rounded-lg transition-all duration-700 ease-in-out">
              <CardHeader className="flex flex-row items-center">
                <Image
                  src={testimonials[leftIndex].avatar}
                  alt={testimonials[leftIndex].name}
                  width={50} 
                  height={50} 
                  className="rounded-full"
                />
                <p className="ml-3 text-md md:text-xl font-semibold">{testimonials[leftIndex].name}</p>
              </CardHeader>

              <CardContent>
                <p className="mt-4 text-sm md:text-lg w-5/6 font-bold">
                  {testimonials[leftIndex].review.length > 50
                    ? testimonials[leftIndex].review.substring(0, 50) + "..."
                    : testimonials[leftIndex].review}
                </p>
              </CardContent>

              <CardFooter className="flex space-x-1 mt-4">
                {[...Array(testimonials[leftIndex].rating)].map((_, i) => (
                  <Star key={i} fill="yellow" strokeWidth={0} size={18} />
                ))}
                {[...Array(5 - testimonials[leftIndex].rating)].map((_, i) => (
                  <Star key={i} strokeWidth={0} size={18} />
                ))}
              </CardFooter>
            </Card>
          </div>

          {/* Card ở giữa (active) */}
          <div className="transform transition-all duration-700 scale-100 opacity-100 glow-card hover:shadow-glow-hover ease-in-out">
          <Card className="w-96 py-6 flex-shrink-0 flex flex-col justify-center px-2 md:px-6 rounded-lg transition-all duration-700 ease-in-out">
              <CardHeader className="flex flex-row items-center">
                <Image
                  src={testimonials[activeIndex].avatar}
                  alt={testimonials[activeIndex].name}
                  width={50} 
                  height={50} 
                  className="rounded-full"
                />
                <p className="ml-3 text-md md:text-xl font-semibold">{testimonials[activeIndex].name}</p>
              </CardHeader>

              <CardContent>
                <p className="mt-4 text-sm md:text-lg w-5/6 font-bold">
                  {testimonials[activeIndex].review.length > 50
                    ? testimonials[activeIndex].review.substring(0, 50) + "..."
                    : testimonials[activeIndex].review}
                </p>
              </CardContent>

              <CardFooter className="flex space-x-1 mt-4">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <Star key={i} fill="yellow" strokeWidth={0} size={18} />
                ))}
                {[...Array(5 - testimonials[activeIndex].rating)].map((_, i) => (
                  <Star key={i} strokeWidth={0} size={18} />
                ))}
              </CardFooter>
            </Card>
          </div>

          {/* Card bên phải */}
          <div className="transform transition-all duration-700 scale-90 opacity-50">
            <Card className="w-96 py-6 flex-shrink-0 flex flex-col justify-center px-2 md:px-6 rounded-lg transition-transform duration-700 ease-in-out transform">
              <CardHeader className="flex flex-row items-center">
                <Image
                  src={testimonials[rightIndex].avatar}
                  alt={testimonials[rightIndex].name}
                  width={50} 
                  height={50} 
                  className="rounded-full"
                />
                <p className="ml-3 text-md md:text-xl font-semibold">{testimonials[rightIndex].name}</p>
              </CardHeader>

              <CardContent>
                <p className="mt-4 text-sm md:text-lg w-5/6 font-bold">
                  {testimonials[rightIndex].review.length > 50
                    ? testimonials[rightIndex].review.substring(0, 50) + "..."
                    : testimonials[rightIndex].review}
                </p>
              </CardContent>

              <CardFooter className="flex space-x-1 mt-4">
                {[...Array(testimonials[rightIndex].rating)].map((_, i) => (
                  <Star key={i} fill="yellow" strokeWidth={0} size={18} />
                ))}
                {[...Array(5 - testimonials[rightIndex].rating)].map((_, i) => (
                  <Star key={i} strokeWidth={0} size={18} />
                ))}
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Nút chuyển sang phải */}
        <button 
          onClick={goToNext} 
          className="absolute right-0 z-10 p-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600"
        >
          <ChevronRight className="w-4 md:w-6 h-4 md:h-6" />
        </button>
      </div>
    </div>
  );
}
