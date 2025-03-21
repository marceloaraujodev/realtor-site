'use client'
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <div className="relative h-[600px]">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")'
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      <motion.div
        initial={{y: '-450px', opacity: 0}}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative -mt-4 sm:mt-0 h-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center text-center">
        <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold text-white mb-3">
          Encontre o imóvel dos seus sonhos em Balneário Camboriú
        </h1>
        <p className="max-w-xs sm:text-xl md:text-2xl text-white mb-10">
          Casas, apartamentos e terrenos disponíveis para venda ou locação
        </p>
      </motion.div>

        <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute h-[250px]  sm:h-[550px] bottom-0 sm:right-0"
      >
        <img className="h-full" src="/profile-cutout.png" />
      </motion.div>
    </div>
  );
}