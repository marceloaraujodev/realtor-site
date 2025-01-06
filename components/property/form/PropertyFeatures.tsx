'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X } from 'lucide-react';
import { PropertyFeaturesProps } from '@/types/formTypes';
import { useFormContext, useFieldArray } from 'react-hook-form';

export function PropertyFeatures({ register, control }: PropertyFeaturesProps) {

  // Use useFieldArray to manage features as an array
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'features', 
  });
 console.log(fields)
  // Function to handle adding a feature
  const addFeature = () => {
    const newFeature = (
      document.getElementById('newFeature') as HTMLInputElement
    )?.value.trim();
    console.log('new feature input', newFeature);

    if (newFeature) {
      // Add the new feature to the array
      append({ name: newFeature }); // 'append' adds a new feature to the array
      (document.getElementById('newFeature') as HTMLInputElement).value = '';
    }
  };

  // Function to handle removing a feature
  const removeFeature = (index: number) => {
    remove(index); // This will remove the feature at the given index
  };

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex gap-2">
          <Input
            id="newFeature"
            placeholder="Ex: Piscina, Academia, etc."
            // Register 'features' as an array
          />
          <Button type="button" onClick={() => addFeature()}>
            Adicionar
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {fields.length > 0 &&
            fields.map((field, index) => (
              <div
                key={field.id} // Unique key to identify each feature
                className="flex items-center gap-2 bg-secondary px-3 py-1 rounded-full">
                <span>{field.name}</span>
                <button
                  type="button"
                  onClick={() => removeFeature(index)} // Remove feature
                  className="text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
