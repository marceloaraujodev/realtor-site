'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { useToast } from '@/hooks/use-toast';
import type { Property } from '@/lib/properties';

export default function PropertyContact({ property }: { property: Property }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: `Olá, gostaria de mais informações sobre o imóvel "${property.title}".`
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Mensagem enviada!",
      description: "Em breve entraremos em contato.",
    });
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: `Olá, gostaria de mais informações sobre o imóvel "${property.title}".`
    });
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