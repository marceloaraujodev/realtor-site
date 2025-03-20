'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { PropertyDetailsProps } from '@/types/formTypes';


export function PropertyDetails({ register, errors }: PropertyDetailsProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="bedrooms">Quartos</Label>
            <Input
              id="bedrooms"
              type="number"
              {...register('bedrooms')}
            />
            {errors.bedrooms && <span className="text-xs text-red-600">{errors.bedrooms.message}</span>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="suites">Suites</Label>
            <Input
              id="suites"
              type="number"
              {...register('suites')}
            />
            {errors.suites && <span className="text-xs text-red-600">{errors.suites.message}</span>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="bathrooms">Banheiros</Label>
            <Input
              id="bathrooms"
              type="number"
              {...register('bathrooms')}
            />
            {errors.bathrooms && <span className="text-xs text-red-600">{errors.bathrooms.message}</span>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="garage">Vagas de Garagem</Label>
            <Input
              id="garage"
              type="number"
              {...register('garage')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="totalArea">Área Total</Label>
            <Input
              id="totalArea"
              type="number"
              {...register('totalArea')}
              placeholder="m²"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="privateArea">Área Privativa</Label>
            <Input
              id="privateArea"
              type="number"
              {...register('privateArea')}
              placeholder="m²"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}