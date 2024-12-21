'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent } from '../ui/dialog';
import { cn } from '@/lib/utils';

interface PropertyGalleryProps {
  images: string[];
}

export default function PropertyGallery({ images }: PropertyGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={image}
            className={cn(
              "relative aspect-[4/3] cursor-pointer overflow-hidden rounded-lg",
              index === 0 && "col-span-2 row-span-2"
            )}
            onClick={() => setSelectedImage(image)}
          >
            <Image
              src={image}
              alt={`Imagem ${index + 1}`}
              fill
              className="object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl">
          <div className="relative aspect-[16/9]">
            {selectedImage && (
              <Image
                src={selectedImage}
                alt="Imagem ampliada"
                fill
                className="object-contain"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}