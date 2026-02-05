import { Bug, Home, Bed, Rat, Droplets, Shield, Wind, Building } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: Home,
      title: 'Termite Control',
      description: 'Complete termite protection for your property with pre and post-construction treatments. We use advanced techniques to eliminate termites and prevent future infestations.',
    },
    {
      icon: Bug,
      title: 'Cockroach Control',
      description: 'Effective cockroach extermination using safe gel and spray treatments. We target breeding areas and provide long-lasting protection against cockroach infestations.',
    },
    {
      icon: Bed,
      title: 'Bed Bug Treatment',
      description: 'Professional bed bug elimination with thermal and chemical treatments. We ensure complete eradication of bed bugs from mattresses, furniture, and hiding spots.',
    },
    {
      icon: Rat,
      title: 'Rodent Control',
      description: 'Comprehensive rodent management including rats and mice removal. We use humane trapping methods and seal entry points to prevent future invasions.',
    },
    {
      icon: Droplets,
      title: 'Mosquito Control',
      description: 'Indoor and outdoor mosquito control services to protect against dengue and malaria. We use safe fogging and larvicidal treatments for lasting results.',
    },
    {
      icon: Shield,
      title: 'General Pest Control',
      description: 'Complete pest management for ants, spiders, lizards, and other common pests. Regular treatments keep your property pest-free year-round.',
    },
    {
      icon: Wind,
      title: 'Fumigation Services',
      description: 'Professional fumigation for warehouses, factories, and storage facilities. We eliminate all types of pests with certified fumigation techniques.',
    },
    {
      icon: Building,
      title: 'Disinfection Services',
      description: 'Complete sanitization and disinfection services for homes, offices, and commercial spaces. Protect against viruses, bacteria, and germs.',
    },
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">Our Services</h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive pest control solutions tailored to your specific needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition group hover:-translate-y-2 duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <service.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-900 to-blue-700 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Need Immediate Pest Control?</h3>
          <p className="text-blue-100 text-lg mb-6">
            Get in touch with us now for a free inspection and customized treatment plan
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:03032237137"
              className="bg-orange-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-orange-600 transition inline-block"
            >
              Call: 0303-2237137
            </a>
            <a
              href="https://wa.me/923032237137"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-green-600 transition inline-block"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
