"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImagePlus, X } from "lucide-react";
import { PropertyImagesProps } from "../../../types/formTypes";
import { useFieldArray, useFormContext  } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

export function PropertyImages({ register, control }: PropertyImagesProps) {
  const { setValue, watch } = useFormContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<{ id: string; url: string }[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<{ id: string; file: File }[]>([]);

  // react hook form elements
  const { fields, append, remove } = useFieldArray({
    control,
    name: "images", // Name of the field array
  });
  console.log('this is fields', fields);

  // was working just keeping for reference until i finish testing
  // useEffect(() => {
  //   // Create preview objects for each field
  //   const newPreviews = fields.map((field) => {
  //     if (!field.file) return null; // Skip fields without a file

  //     // Generate a preview URL for the file
  //     const previewUrl = URL.createObjectURL(field.file);
  //     return { id: field.imgId, url: previewUrl }; // here is the issue rhf ids!!!
  //   }).filter(Boolean); // Remove any null values

  //   // Update the previews state
  //   setPreviews(newPreviews as { id: string; url: string }[]);
  // }, [fields]); // Trigger this effect whenever `fields` changes


  useEffect(() => {
    const newPreviews = fields.map((field) => {
      // If a new file is present, generate a preview URL
      if (field.file) {
        return { id: field.imgId, url: URL.createObjectURL(field.file) };
      }
      // Otherwise, if a URL exists (preloaded image), use that
      else if (field.url) {
        return { id: field.imgId, url: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/${field.url}` };
      }
      return null;
    }).filter(Boolean) as { id: string; url: string }[];
    setPreviews(newPreviews);
    
  }, [fields]);

  const cover = watch("cover");
  console.log('this is cover', cover);


  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    files.forEach((file) => {
      const id = uuidv4(); // Generate unique ID
      const previewUrl = URL.createObjectURL(file);
      
      // Explicitly store imgId in React Hook Form
      append({ imgId: id, file });

      setPreviews((prev) => [...prev, { id, url: previewUrl }]);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

    const removeImage = (id: string) => {
      const previewToRemove = previews.find((p) => p.id === id);
      if (previewToRemove) {
        URL.revokeObjectURL(previewToRemove.url);
      }

      setPreviews((prev) => prev.filter((p) => p.id !== id));
      // setSelectedFiles((prev) => prev.filter((p) => p.id !== id));

      remove(fields.findIndex((field) => field.id === id));

      if (cover === id) {
        setValue("cover", null); // Reset cover if it was the removed image
      }
    };


  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-center">
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="w-full max-w-md">
            <ImagePlus className="h-4 w-4 mr-2" />
            Adicionar Imagens
          </Button>
          <input
            {...register("images")}
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {previews.map(({ id, url }, index) => {
            // console.log('this is id', id)
            return (
              <div key={id} className="relative group aspect-[4/3]">
              <img src={url} alt={`Preview ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
              <button
                type="button"
                onClick={() => removeImage(id)}
                className="absolute top-2 right-2 p-1.5 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <X className="h-4 w-4" />
              </button>
              <label className="absolute bottom-2 left-2 flex items-center gap-2 bg-black/50 text-white px-2 py-1 rounded-lg cursor-pointer">
                <input
                  type="radio"
                  value={id}
                  checked={cover === id}
                  className="hidden peer"
                  // {...register("cover")}
                  onChange={() => setValue("cover", id)}
                />
                <div className="w-4 h-4 border-2 border-white rounded-full flex items-center justify-center peer-checked:bg-white" />
                Capa
              </label>
            </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  );
}
