'use client';

import { Building2, MapPin, Share2 } from 'lucide-react';
import { Button } from '../ui/button';
import { useToast } from '@/hooks/use-toast';
import { formatCurrency } from '@/lib/utils';
import type { Property } from '@/lib/properties';

export default function PropertyHeader({ property }: { property: Property }) {
  const { toast } = useToast();

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: 'Link copiado!',
      description: 'O link foi copiado para sua área de transferência.',
    });
  };

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 text-muted-foreground mb-2">
        <Building2 className="h-4 w-4" />
        <span>{property.propertyType}</span>
        <span>•</span>
        <MapPin className="h-4 w-4" />
        <span>{property.location}</span>
      </div>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
          <p className="text-2xl font-bold text-primary">
            {formatCurrency(property.price)}
          </p>
        </div>
        <Button variant="outline" size="icon" onClick={handleShare}>
          <Share2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
