'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import { PropertyImagesProps } from '../../../types/formTypes';
import { useFieldArray } from 'react-hook-form';



export function PropertyImages({ control }: PropertyImagesProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'images', // Name of the field array
  });

  const [imageUrl, setImageUrl] = useState('');

  const addImage = () => {
    if (imageUrl.trim()) {
      append({ url: imageUrl.trim() }); // Append a new image
      setImageUrl('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addImage();
    }
  };

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex gap-2">
          <Input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="URL da imagem"
            onKeyDown={handleKeyPress}
          />
          <Button type="button" onClick={addImage}>
            Adicionar
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {fields.map((field, index) => (
            <div key={field.id} className="relative group">
              <img
                src={field.url}
                alt={`Imagem ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}