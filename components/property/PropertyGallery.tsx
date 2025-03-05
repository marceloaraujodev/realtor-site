'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../ui/dialog';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PropertyProps } from '@/types/propertyType';
import { useProperty } from '@/app/context/PropertyContext';


export default function PropertyGallery({ property }: PropertyProps) {
  const { fetchProperties } = useProperty();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  // console.log('S3 URL:', process.env.NEXT_PUBLIC_S3_BUCKET_URL);
  useEffect(() => {
    fetchProperties();
  }, [])

  const images = property.images?.map((image) => ({
    id: image.id,
    url: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/${image.url}`,
    cover: image.cover ? `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/${image.cover}` : null,
  })) || [];

  console.log(images)
 // Find the image that has the cover field
  const coverImage = images.find((image) => image.cover !== null);
  console.log('coverImage', coverImage)

  // Ensure the image with the 'cover' field is always the first in the array
  const mainImages = images.slice(0, 5);

  console.log('main images', mainImages);

  const thumbnailImages = images.slice(5);
  const combinedImages = [...mainImages, ...thumbnailImages];

  // url path : `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/${imageKey?.url}`)

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null && selectedImageIndex < combinedImages.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const showPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  return (
    <>
      {/* Main Images Grid */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        
        {mainImages.map((image, index) => {
        return(  
        <div
            key={image.id}
            className={cn(
              "relative cursor-pointer overflow-hidden rounded-lg",
              index === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-[4/3]",
              index === 0 ? "col-span-2 row-span-2" : 
              index === 1 ? "col-start-3" :
              index === 2 ? "col-start-4" : ""
            )}
            onClick={() => setSelectedImageIndex(index)}
          >
            <Image
              src={image.url}
              alt={`Imagem ${index + 1}`}
              fill
              priority={index === 0}
              className="object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>
          )
          })}
        </div>

      {/* Scrollable Thumbnails */}
      {thumbnailImages.length > 0 && (
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-2 min-w-min">
            {thumbnailImages.map((image, index) => (
              <div
                key={image.id}
                className="relative w-24 aspect-square flex-none cursor-pointer overflow-hidden rounded-lg"
                onClick={() => setSelectedImageIndex(index + 5)}
              >
                <Image
                  src={image.url}
                  alt={`Imagem ${index + 6}`}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Image Dialog */}
      <Dialog open={selectedImageIndex !== null} onOpenChange={() => setSelectedImageIndex(null)}>
        <DialogTitle></DialogTitle>
        <DialogContent className="max-w-4xl">
          <div className="relative aspect-[16/9]">
          {selectedImageIndex !== null && (
              <Image
                src={combinedImages[selectedImageIndex].url}
                alt="Imagem ampliada"
                fill
                className="object-contain"
              />
            )}
            
            {/* Navigation Buttons */}
            {selectedImageIndex !== null && selectedImageIndex > 0 && (
              <button
                onClick={showPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
            )}
            {selectedImageIndex !== null && selectedImageIndex < combinedImages.length - 1 && (
              <button
                onClick={showNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            )}
          </div>
          <DialogDescription></DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
}