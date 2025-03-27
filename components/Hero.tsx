'use client'
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <div className="relative h-[600px] overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")'
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>
      {/* px-4 sm:px-2 lg:px-8  sm:items-center md:items-start md:justify-center md:text-left lg:text-center md:pl-3 max-w-4xl 
      sm:mt-0
      */}
      
      <motion.div
        initial={{y: '-450px', x: '0px', opacity: 0}}
        animate={{ y: 300, x:'0px', opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className=" relative h-full  z-20 sm:z-0">

       <div className='flex flex-col  z-10 items-start md:justify-center lg:items-center lg:-ml-10' data-name='title subtitle div'>
        <h1 className=" sm:max-w-[460px] md:max-w-[480px]  text-3xl sm:text-5xl lg:max-w-[650px] text-center md:text-5xl font-bold text-white">
          Encontre o imóvel dos seus sonhos em Balneário Camboriú
        </h1>
        {/* <div className="hidden max-w-md sm:text-xl md:text-2xl text-white mb-10 sm:max-w-[400px] lg:text-center">
          Casas, apartamentos e terrenos disponíveis para venda ou locação
        </div> */}
       </div>
      </motion.div>

        <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className=" absolute h-[500px] sm:h-[550px] bottom-0 left-0 right-0 mx-auto w-fit sm:left-auto sm:-right-6 sm:mx-0 "
      >
        <img className="h-full" src="/profile-cutout.png" />
      </motion.div>
    </div>
  );
}