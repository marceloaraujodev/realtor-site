"use client";

import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImagePlus, X } from "lucide-react";
import { PropertyImagesProps } from "../../../types/formTypes";
import { useFieldArray, useFormContext  } from "react-hook-form";

export function PropertyImages({ register, control }: PropertyImagesProps) {
  const { setValue, watch } = useFormContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);


  const { fields, append, remove } = useFieldArray({
    control,
    name: "images", // Name of the field array
  });
  console.log('this is fields', fields);

  const cover = watch("cover");

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    // Append each file to the field array
    files.forEach((file) => {
      append({ file, preview: URL.createObjectURL(file) });
    });

    // Create preview URLs
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);

    // // Store the actual files
    setSelectedFiles((prev) => [...prev, ...files]);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = (index: number) => {
    // Revoke the object URL to prevent memory leaks
    URL.revokeObjectURL(previews[index]);

    // Remove preview and file from state
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));

    // Remove from formData (field array)
    remove(index);
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
          {previews.map((preview, index) => (
            <div key={index} className="relative group aspect-[4/3]">
              <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 p-1.5 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <X className="h-4 w-4" />
              </button>
              <label className="absolute bottom-2 left-2 flex items-center gap-2 bg-black/50 text-white px-2 py-1 rounded-lg cursor-pointer">
                <input
                  type="radio"
                  value={index}
                  checked={cover === index}
                  className="hidden peer"
                  {...register("cover")}
                  onChange={() => setValue("cover", index)}
                />
                <div className="w-4 h-4 border-2 border-white rounded-full flex items-center justify-center peer-checked:bg-white" />
                Capa
              </label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
