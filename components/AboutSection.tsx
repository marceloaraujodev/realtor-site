export default function AboutSection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              // src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              src="/profile.JPG"
              alt="Corretor"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">Sobre Nós</h2>
            <p className="text-gray-600 mb-6">
              Com mais de 15 anos de experiência no mercado imobiliário de Balneário Camboriú,
              nossa equipe está comprometida em ajudar você a encontrar o imóvel perfeito.
              Oferecemos um serviço personalizado e profissional, garantindo a melhor
              experiência na compra ou venda do seu imóvel.
            </p>
            <ul className="space-y-4 text-gray-600">
              <li>✓ Mais de 1000 imóveis vendidos</li>
              <li>✓ Equipe especializada</li>
              <li>✓ Atendimento personalizado</li>
              <li>✓ Parceiros certificados</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}