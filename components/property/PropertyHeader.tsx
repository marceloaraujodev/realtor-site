'use client';

import { Building2, MapPin, Share2, Pencil, Trash } from 'lucide-react';
import { Button } from '../ui/button';
import { useToast } from '@/hooks/use-toast';
import { formatCurrency } from '@/lib/utils';
import { PropertyProps } from '@/types/propertyType';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { siteUrl } from '@/config';
import { useProperty } from '@/app/context/PropertyContext';

export default function PropertyHeader({ property }: PropertyProps) {
  const { setPropertyList, propertyList } = useProperty();
  const { toast } = useToast();
  const { data: session, status } = useSession();
  const router = useRouter();


  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: 'Link copiado!',
      description: 'O link foi copiado para sua área de transferência.',
    });
  };

  const handleEdit = () => {
   // grab id and redirect to the form basic info page
   router.push(`${siteUrl}/propriedades/update/${property.propertyId}`);
  }

  const handleDelete = async () => {
    // grab id and send request to delete property to the backend
    const res = await axios.delete(`${siteUrl}/api/propriedades/delete/${property.propertyId}`)

    if (res.status === 200) {
      setPropertyList(propertyList.filter(p => p.propertyId !== property.propertyId))
      toast({
        title: 'Propriedade removida!',
        description: 'Propriedade removida com sucesso.',
      });
      router.push('/propriedades');
    }else{
      toast({
        title: 'Falha ao excluir!',
        description: 'Ocorreu um erro ao tentar excluir a propriedade.',
      });
    }
  }

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
          <h1 className="sm: text-2xl md:text-3xl font-bold mb-2 pr-3">{property.title}</h1>
          <p className="text-2xl font-bold text-primary">
            {formatCurrency(property.price)}
          </p>
        </div>

        <div className="flex">
          {session ? (
            <>
              <Button
                className="ml-2 sm:ml-0"
                variant="outline"
                size="icon"
                onClick={handleEdit}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                className="ml-2"
                variant="outline"
                size="icon"
                onClick={handleDelete}>
                <Trash className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <Button
              className="ml-2"
              variant="outline"
              size="icon"
              onClick={handleShare}>
              <Share2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
