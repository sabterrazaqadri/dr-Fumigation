import { Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">DR Fumigation</h3>
            <p className="text-blue-200 leading-relaxed">
              Professional pest control and fumigation services in Karachi. Your trusted partner for a pest-free environment.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })} className="text-blue-200 hover:text-white transition">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="text-blue-200 hover:text-white transition">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} className="text-blue-200 hover:text-white transition">
                  Services
                </button>
              </li>
              <li>
                <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="text-blue-200 hover:text-white transition">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-orange-500" />
                <a href="tel:03032237137" className="text-blue-200 hover:text-white transition">
                  0303-2237137
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-orange-500" />
                <span className="text-blue-200">Karachi, Pakistan</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-blue-800 pt-8 text-center">
          <p className="text-blue-200">
            &copy; {currentYear} DR Fumigation. All rights reserved. | Professional Pest Control Services in Karachi
          </p>
        </div>
      </div>
    </footer>
  );
}
