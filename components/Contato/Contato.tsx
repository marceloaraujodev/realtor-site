import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import ClipLoader from "react-spinners/ClipLoader";


export default function Contato() {
const [isloading, setIsLoading] = useState(false)
 const [formData, setFormData] = useState({
  name: '',
  email: '',
  phone: '',
  message: ``
});
const { toast } = useToast();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  const res = await axios.post('/api/contato', {
    ...formData,
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
  setFormData({
    name: '',
    email: '',
    phone: '',
    message: ``
  });
  setIsLoading(false);
};

//bg-gray-50
return (
  <section className='mt-[64px] flex-1 bg-slate-800 flex justify-center items-center text-center '>
  <div className=" relative bg-card p-6 rounded-lg border w-1/2 mt-20 mb-20">
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
  </section>
  )
}