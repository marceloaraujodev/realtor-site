'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';


// properties grid search is the one which actually searches for properties
// properties grid only displays all the properties


export default function SearchProperties() {
  const router = useRouter();
  const [filters, setFilters] = useState({
    propertyType: '',
    bedrooms: '',
    priceRange: '',
    location: '',
  });

  // useEffect(() => {
  //   // if (searchParams.toString()) {
  //   //   router.replace('/propriedades'); // Clears all query parameters
  //   // }
  //   // console.log(properties)
  //   // console.log('filers', filters)
  // }, [filters])


  const handleSearch = () => {
    const queryParams = new URLSearchParams(filters);
    router.push(`/propriedades?${queryParams.toString()}`);
  };

  const clearSearch = () => {
    router.push('/propriedades'); // Clears all query parameters
    setFilters({ propertyType: '', bedrooms: '', priceRange: '', location: '' });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Select
            value={filters.propertyType} // Bind value to state
            onValueChange={(value) => setFilters({ ...filters, propertyType: value })}
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
            value={filters.bedrooms}
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
            value={filters.priceRange} // Bind value to state
            onValueChange={(value) => setFilters({ ...filters, priceRange: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Faixa de Preço" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="0-500000">Até R$ 500.000</SelectItem>
              <SelectItem value="500000-1000000">R$ 500.000 - R$ 1.000.000</SelectItem>
              <SelectItem value="1000000-2000000">R$ 1.000.000 - R$ 2.000.000</SelectItem>
              <SelectItem value="2000000+">Acima de R$ 2.000.000</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex space-x-4 w-full justify-center md:justify-start">
        <Button className="w-1/2" onClick={handleSearch}>
          Pesquisar
        </Button>
        <Button className="w-1/3 " onClick={clearSearch}> 
          Limpar
        </Button>
      </div>
        </div>
      </div>
    </div>
  );
}