'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
      console.log('submit')
    try {
      await axios.post(`/api/newsletter/register`, {
        email
      })
      toast({
        title: "Inscrição realizada!",
        description: "Você receberá nossas melhores ofertas em seu e-mail.",
      });
      setEmail('');
    } catch (error) {
      toast({
        title: "Error!",
        description: "Não conseguimos cadastrar o seu email tente por favor novamente.",
      });
      console.log(error)
    }
    
  };

  return (
    <section className="py-16 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">
          Receba as melhores ofertas em seu e-mail
        </h2>
        <p className="text-white/80 mb-8 max-w-2xl mx-auto">
          Fique por dentro das novidades e ofertas exclusivas do mercado imobiliário
          em Balneário Camboriú.
        </p>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-4">
          <Input
            type="email"
            placeholder="Seu melhor e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-white"
          />
          <Button type="submit" variant="secondary">
            Inscrever-se
          </Button>
        </form>
      </div>
    </section>
  );
}