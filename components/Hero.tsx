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
      
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Encontre o imóvel dos seus sonhos em Balneário Camboriú
        </h1>
        <p className="text-xl md:text-2xl text-white mb-8">
          Casas, apartamentos e terrenos disponíveis para venda ou locação
        </p>
      </div>
    </div>
  );
}