import { Phone, MessageSquare, Shield } from 'lucide-react';

export default function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-orange-500" />
              <span className="text-orange-500 font-semibold">Professional Pest Control Experts</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 leading-tight mb-6">
              Pest Control, Fumigation & Disinfection Services
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Protect your home and business with DR Fumigation's reliable and safe pest control solutions in Karachi. We eliminate pests effectively and ensure long-lasting results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:03150118718"
                className="flex items-center justify-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-orange-600 transition shadow-lg"
              >
                <Phone className="w-5 h-5" />
                Call Now: 0315-0118718
              </a>
              <button
                onClick={scrollToContact}
                className="flex items-center justify-center gap-2 bg-white text-blue-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-50 transition border-2 border-blue-900"
              >
                <MessageSquare className="w-5 h-5" />
                Get Free Inspection
              </button>
            </div>
            <div className="mt-8 flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 font-bold text-xl">✓</span>
                </div>
                <span className="text-gray-700 font-medium">Certified Staff</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 font-bold text-xl">✓</span>
                </div>
                <span className="text-gray-700 font-medium">Safe Chemicals</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 font-bold text-xl">✓</span>
                </div>
                <span className="text-gray-700 font-medium">Guaranteed Results</span>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl transform rotate-3"></div>
              <div className="relative bg-white p-8 rounded-3xl shadow-2xl">
                <img
                  src="/o.png"
                  alt="Professional Pest Control Service"
                  className="rounded-2xl w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
