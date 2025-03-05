'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { PropertyProps } from '@/types/propertyType';
import ClipLoader from "react-spinners/ClipLoader";

import axios from 'axios';

export default function PropertyContact({ property }: PropertyProps) {
  const [isloading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: `Olá, gostaria de mais informações sobre o imóvel "${property.title}".`
    
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: `Olá, gostaria de mais informações sobre o imóvel "${property.title}".`
    });
    
    const res = await axios.post('/api/propriedades/contact', {
      ...formData,
      propertyId: property.propertyId,
    })


    if (res.status === 200) {
      toast({
        title: "Mensagem enviada!",
        description: "Em breve entraremos em contato.",
      });
    }else{
      toast({
        title: "Erro ao enviar a mensagem!",
        description: "Por favor, tente novamente.",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="relative bg-card p-6 rounded-lg border">
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    {isloading && <ClipLoader size={40} color="#020202" />}
    </div>
      <h2 className="text-xl font-semibold mb-6">Solicitar Informações</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Nome completo"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <Input
          type="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <Input
          type="tel"
          placeholder="Telefone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
        <Textarea
          placeholder="Mensagem"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
          rows={4}
        />
        <Button type="submit" className="w-full">Enviar Mensagem</Button>
      </form>
    </div>
  );
}