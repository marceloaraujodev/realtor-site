'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { PropertyBasicInfoProps } from '@/types/formTypes';
import { PropertyType } from '@prisma/client';


export function PropertyBasicInfo({ register, errors, setValue }: PropertyBasicInfoProps) {
  const [propertyType, setPropertyType] = useState<string>();

  const handleSelectChange = (value: string) => {
    const propertyTypeValue = value as PropertyType
    setPropertyType(value);
    setValue('propertyType', propertyTypeValue, { shouldValidate: true }); // Update the form value
  };

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Título</Label>
          <Input
            id="title"
            {...register('title', { required: 'Título é obrigatório' })}
            placeholder="Ex: Apartamento de Luxo com Vista para o Mar"
          />
          {errors.title && <span>{errors.title.message}</span>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Localização</Label>
          <Input
            id="location"
            {...register('location', { required: 'Localização é obrigatória' })}
            placeholder="Ex: Centro, Balneário Camboriú"
          />
          {errors.location && <span>{errors.location.message}</span>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Preço</Label>
          <Input
            id="price"
            type="number"
            {...register('price', { required: 'Preço é obrigatório' })}
            placeholder="Valor em reais"
          />
          {errors.price && <span>{errors.price.message}</span>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="propertyType">Tipo de Imóvel</Label>
          <Select onValueChange={handleSelectChange}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={PropertyType.Casa}>{PropertyType.Casa}</SelectItem>
              <SelectItem value={PropertyType.Apartamento}>{PropertyType.Apartamento}</SelectItem>
              <SelectItem value={PropertyType.Galpão}>{PropertyType.Galpão}</SelectItem>
              <SelectItem value={PropertyType.Sala}>{PropertyType.Sala}</SelectItem>
              <SelectItem value={PropertyType.Loft}>{PropertyType.Loft}</SelectItem>
              <SelectItem value={PropertyType.Terreno}>{PropertyType.Terreno}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            {...register('description', { required: 'Descrição é obrigatória' })}
            placeholder="Descreva o imóvel em detalhes"
            rows={6}
          />
          {errors.description && <span>{errors.description.message}</span>}
        </div>
      </CardContent>
    </Card>
  );
}