"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ImageComponentProps {
  src: string;
  alt: string;
  text: string;
  description: string;
  price: number;
  oldPrice?: number;
  salePercentage?: number;
  link: string;
}

const ImageComponent: React.FC<ImageComponentProps> = ({ src, alt, text, description, price, oldPrice, salePercentage, link }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={link} passHref>
      <div
        style={{
          position: 'relative',
          borderRadius: '2%',
          overflow: 'hidden',
          transition: 'transform 0.3s',
          transform: hovered ? 'scale(1.1)' : 'scale(1)',
          zIndex: hovered ? '1' : '0',
          width: '300px',
          height: '200px',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {salePercentage && (
          <div
            style={{
              position: 'absolute',
              top: '5px',
              right: '5px',
              backgroundColor: '#ff0000',
              color: '#fff',
              padding: '3px 5px',
              borderRadius: '5%',
              fontSize: '0.8rem',
              zIndex: '2',
            }}
          >
            -{salePercentage}%
          </div>
        )}
        <div className="relative w-full h-full">
          <Image src={src} alt={alt} width={300} height={200} className="cover h-full w-full"/>
          <div
            style={{
              position: 'absolute',
              bottom: '0',
              left: '0',
              width: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              padding: '10px',
              boxSizing: 'border-box',
              textAlign: 'left',
              borderRadius: '10% 0% 0% 0%',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
              <div style={{display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', width:'65%'}}>
                <div style={{ color: '#fff', fontSize: '1rem', fontWeight: 'bold' }}>{text}</div>
                <div style={{ color: '#fff', fontSize: '0.8rem', marginTop: '5px' }}>{description}</div>
                <div style={{ color: '#fff', fontSize: '0.8rem', marginTop: '5px', display: hovered ? '' : 'none' }}>dịch vụ: đưa đón, ăn trưa</div>
              </div>
              
              <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                {oldPrice && (
                  <div style={{ textDecoration: 'line-through', fontSize: '0.8rem', color: '#ddd' }}>
                    {oldPrice} ₫
                  </div>
                )}
                <div style={{ color: '#FF9800', fontSize: '0.8rem', marginLeft: '3px', marginTop: '0.5rem',fontWeight: 'bold'}}>{price} ₫</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ImageComponent; 