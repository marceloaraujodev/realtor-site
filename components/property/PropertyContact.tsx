'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { PropertyDetailsProps } from '@/types/propertyType';
import axios from 'axios';

export default function PropertyContact({ property }: PropertyDetailsProps) {
  console.log('this should be property.tile here', property)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: `Olá, gostaria de mais informações sobre o imóvel "${property.title}".`
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setFormData({
      name: '',
      email: '',
      phone: '',
      message: `Olá, gostaria de mais informações sobre o imóvel "${property.title}".`
    });
    
    const res = await axios.post('/api/propriedades/contact', {
      ...formData,
    })
    console.log(res)

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
  };

  return (
    <div className="bg-card p-6 rounded-lg border">
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