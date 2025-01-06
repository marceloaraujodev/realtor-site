'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export default function SearchProperties() {
  const router = useRouter();
  const [filters, setFilters] = useState({
    type: '',
    bedrooms: '',
    priceRange: '',
    location: '',
  });

  const handleSearch = () => {
    const queryParams = new URLSearchParams(filters);
    router.push(`/propriedades?${queryParams.toString()}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Select
            onValueChange={(value) => setFilters({ ...filters, type: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Tipo de Imóvel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Apartamento">Apartamento</SelectItem>
              <SelectItem value="Casa">Casa</SelectItem>
              <SelectItem value="Terreno">Terreno</SelectItem>
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) => setFilters({ ...filters, bedrooms: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Quartos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Quarto</SelectItem>
              <SelectItem value="2">2 Quartos</SelectItem>
              <SelectItem value="3">3 Quartos</SelectItem>
              <SelectItem value="4">4+ Quartos</SelectItem>
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) => setFilters({ ...filters, priceRange: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Faixa de Preço" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-500000">Até R$ 500.000</SelectItem>
              <SelectItem value="500000-1000000">R$ 500.000 - R$ 1.000.000</SelectItem>
              <SelectItem value="1000000-2000000">R$ 1.000.000 - R$ 2.000.000</SelectItem>
              <SelectItem value="2000000+">Acima de R$ 2.000.000</SelectItem>
            </SelectContent>
          </Select>

          <Button className="w-full" onClick={handleSearch}>
            Pesquisar
          </Button>
        </div>
      </div>
    </div>
  );
}