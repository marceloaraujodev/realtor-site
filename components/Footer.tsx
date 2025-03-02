import Link from 'next/link';
import { Building2, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { FaInstagram } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";


export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center">
              <Building2 className="h-8 w-8" />
              <span className="ml-2 text-xl font-bold">ImobiliáriaBC</span>
            </div>
            <p className="mt-4 text-gray-400">
              Sua imobiliária de confiança em Balneário Camboriú.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><Link href="/propriedades" className="text-gray-400 hover:text-white">Propriedades</Link></li>
              <li><Link href="/sobre" className="text-gray-400 hover:text-white">Sobre Nós</Link></li>
              <li><Link href="/contato" className="text-gray-400 hover:text-white">Contato</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <span className="text-gray-400">(47) 3333-3333</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <span className="text-gray-400">contato@imobiliariabc.com.br</span>
              </li>
              <li className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span className="text-gray-400">Av. Atlântica, 1000 - Centro</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Redes Sociais</h3>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/dayse_fedrigo" target="_blank" className="text-gray-400 hover:text-white">
               <FaInstagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
               <FaWhatsapp className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
              <FaFacebookF className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} ImobiliáriaBC. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}