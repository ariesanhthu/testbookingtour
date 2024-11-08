"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ImageComponent = ({ src, alt, text, description, price, oldPrice, salePercentage, link }) => {
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
            <div className='h-44 w-52'>
              <Image src={src} alt={alt} fill className='object-cover'/>
            </div>

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
                <div style={{display: 'flex', justifyContent: 'flex-start', flexDirection: 'column'}}>
                  <div style={{ color: '#fff', fontSize: '1rem', fontWeight: 'bold' }}>{text}</div>
                  <div style={{ color: '#fff', fontSize: '0.8rem', marginTop: '5px' }}>{description}</div>
                  <div style={{ color: '#fff', fontSize: '0.8rem', marginTop: '5px', display: hovered ? '' : 'none' }}>dịch vụ: đưa đón, ăn trưa</div>
                </div>
                
                <div style={{display: 'flex', justifyContent: 'flex-end', flexDirection: 'column', alignItems: 'center'}}>
                  <div style={{ textDecoration: 'line-through', fontSize: '0.8rem', color: '#ddd' }}>
                    {price + 100000} ₫
                  </div>
                  <div style={{ color: '#FF9800'}} className='font-bold text-sm top-2 left-3'>{price} ₫</div>
                </div>
              
              </div>
            </div>
        </div>
      </Link>
    );
  };

export default ImageComponent;