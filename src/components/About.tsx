import { Award, Users, Clock, Target } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">About DR Fumigation</h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Your trusted partner in pest control and fumigation services across Karachi
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img
              src="/a.jpg"
              alt="DR Fumigation Team"
              className="rounded-2xl shadow-xl w-full h-auto object-cover"
            />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-blue-900 mb-4">Professional Pest Control Services in Karachi</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              DR Fumigation is a leading pest control company in Karachi, dedicated to providing safe, effective, and affordable pest management solutions for both residential and commercial properties.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              With years of experience in the industry, our certified team uses advanced techniques and eco-friendly chemicals to eliminate pests while ensuring the safety of your family, pets, and employees.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              We understand the urgency of pest problems and are committed to delivering prompt, reliable, and guaranteed results every time.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="tel:03032237137"
                className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition"
              >
                Contact Us Today
              </a>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center p-6 bg-blue-50 rounded-xl hover:shadow-lg transition">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-xl font-bold text-blue-900 mb-2">Certified Experts</h4>
            <p className="text-gray-600">Trained and licensed professionals</p>
          </div>
          <div className="text-center p-6 bg-blue-50 rounded-xl hover:shadow-lg transition">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-xl font-bold text-blue-900 mb-2">Experienced Team</h4>
            <p className="text-gray-600">Years of pest control expertise</p>
          </div>
          <div className="text-center p-6 bg-blue-50 rounded-xl hover:shadow-lg transition">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-xl font-bold text-blue-900 mb-2">Quick Response</h4>
            <p className="text-gray-600">Same-day service available</p>
          </div>
          <div className="text-center p-6 bg-blue-50 rounded-xl hover:shadow-lg transition">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-xl font-bold text-blue-900 mb-2">Guaranteed Results</h4>
            <p className="text-gray-600">100% satisfaction promise</p>
          </div>
        </div>
      </div>
    </section>
  );
}
