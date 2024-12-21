export default function Testimonials() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">O que nossos clientes dizem</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center mb-4">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80"
                alt="Cliente"
                className="w-12 h-12 rounded-full"
              />
              <div className="ml-4">
                <h4 className="font-semibold">Ana Silva</h4>
                <p className="text-gray-600">Proprietária</p>
              </div>
            </div>
            <p className="text-gray-600">
              "Excelente experiência na compra do meu apartamento. A equipe foi muito profissional
              e atenciosa durante todo o processo."
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center mb-4">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80"
                alt="Cliente"
                className="w-12 h-12 rounded-full"
              />
              <div className="ml-4">
                <h4 className="font-semibold">Carlos Santos</h4>
                <p className="text-gray-600">Investidor</p>
              </div>
            </div>
            <p className="text-gray-600">
              "Ótimo atendimento e profissionalismo. Consegui fazer um excelente investimento
              graças às recomendações da equipe."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}