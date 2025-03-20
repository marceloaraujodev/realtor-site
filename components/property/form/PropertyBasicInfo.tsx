"use client";
import { useState, useEffect } from "react";
import { useForm, useFormContext, useWatch } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { PropertyBasicInfoProps, FormData } from "@/types/formTypes";
import { IpropertyType } from "../../../types/propertyType";

export function PropertyBasicInfo({ register, errors, setValue }: PropertyBasicInfoProps) {
  // Use useFormContext to access the control
  const { control } = useFormContext();

  // Subscribe to propertyType changes using useWatch
  const propertyType = useWatch({
    control,
    name: "propertyType",
  });

  const listingType = useWatch({
    control,
    name: "listingType",
  });

  /* takes either of the values and returns a function that sets the value
    Why Use Two Arrow Functions?  
    onValueChange only accepts a function with one argument (value: string), we need to first specify which field we are updating (propertyType or listingType).
  */
  const handleSelect = (field: keyof FormData) => (value: string) => {
    setValue(field, value, { shouldValidate: true });
  };

  const formatPrice = (value: string) => {
    // Remove any non-numeric characters except commas and dots
    let newValue = value.replace(/[^0-9,]/g, "");
  
    // Handle the comma for decimal
    if (newValue.includes(",")) {
      // Split the value into integer and decimal parts
      const parts = newValue.split(",");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Format the integer part with dots
  
      // Ensure the decimal part has exactly two digits
      if (parts[1]) {
        parts[1] = parts[1].substring(0, 2); // Limit to two digits after the comma
      }
  
      // Rejoin the integer and decimal parts
      newValue = parts.join(",");
    } else {
      // If no comma, format the integer part only with dots
      newValue = newValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  
    return newValue;
  };
  

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Format the input value while the user types
    const formattedValue = formatPrice(value);

    // Update the form with the formatted value
    setValue("price", formattedValue, { shouldValidate: true });
  };

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Título</Label>
          <Input
            id="title"
            {...register("title", { required: "Título é obrigatório" })}
            placeholder="Ex: Apartamento de Luxo com Vista para o Mar"
          />
          {errors.title && <span className="text-xs text-red-600">{errors.title.message}</span>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Localização</Label>
          <Input
            id="location"
            {...register("location", { required: "Localização é obrigatória" })}
            placeholder="Ex: Centro, Balneário Camboriú"
          />
          {errors.location && <span className="text-xs text-red-600">{errors.location.message}</span>}
        </div>

        <div data-name="price" className="space-y-2">
          <Label htmlFor="price">Preço</Label>
          <Input
            id="price"
            type="text"
            placeholder="Valor em reais"
            {...register("price", { required: "Preço é obrigatório" })}
            onChange={handlePriceChange}
          />
          {errors.price && <span className="text-xs text-red-600">{errors.price.message}</span>}
        </div>

        <div data-name="condominio" className="space-y-2">
          <Label htmlFor="condominio">Condomínio</Label>
          <Input id="condominio" type="number" {...register("condominio")} placeholder="Valor em reais" />
          {errors.condominio && <span className="text-xs text-red-600">{errors.condominio.message}</span>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="propertyType">Tipo de Imóvel</Label>
          <Select value={propertyType || ""} onValueChange={handleSelect("propertyType")}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Casa">Casa</SelectItem>
              <SelectItem value="Apartamento">Apartamento</SelectItem>
              <SelectItem value="Galpão">Galpão</SelectItem>
              <SelectItem value="Sala">Sala</SelectItem>
              <SelectItem value="Loft">Loft</SelectItem>
              <SelectItem value="Terreno">Terreno</SelectItem>
            </SelectContent>
          </Select>
          
        </div>

        <div className="space-y-2" data-name="listying type sale or rent">
          <Label htmlFor="listingType">Tipo de Listagem</Label>
          <Select value={listingType || ""} onValueChange={handleSelect("listingType")}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="venda">Venda</SelectItem>
              <SelectItem value="aluguel">Aluguel</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            {...register("description", { required: "Descrição é obrigatória" })}
            placeholder="Descreva o imóvel em detalhes"
            rows={6}
          />
          {errors.description && <span>{errors.description.message}</span>}
        </div>
      </CardContent>
    </Card>
  );
}
