import { CheckCircle, DollarSign, ShieldCheck, Clock, Leaf, Star } from 'lucide-react';

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: ShieldCheck,
      title: 'Certified & Trained Staff',
      description: 'Our technicians are fully certified and regularly trained on the latest pest control methods and safety protocols.',
    },
    {
      icon: Leaf,
      title: 'Safe & Eco-Friendly Chemicals',
      description: 'We use environmentally safe products that are effective against pests but safe for your family, pets, and the environment.',
    },
    {
      icon: DollarSign,
      title: 'Affordable Pricing',
      description: 'Competitive rates without compromising on quality. We offer transparent pricing with no hidden charges.',
    },
    {
      icon: CheckCircle,
      title: 'Guaranteed Results',
      description: 'We stand behind our work with a satisfaction guarantee. If pests return, so do we - at no extra cost.',
    },
    {
      icon: Clock,
      title: '24/7 Emergency Service',
      description: 'Pests don\'t wait, and neither should you. We offer round-the-clock emergency pest control services.',
    },
    {
      icon: Star,
      title: 'Residential & Commercial',
      description: 'Whether it\'s your home, office, warehouse, or factory, we have customized solutions for all property types.',
    },
  ];

  return (
    <section id="why-choose-us" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">Why Choose DR Fumigation?</h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Your satisfaction and safety are our top priorities. Here's what sets us apart
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="flex gap-4 p-6 bg-blue-50 rounded-xl hover:bg-blue-100 transition group"
            >
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                  <reason.icon className="w-7 h-7 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">{reason.title}</h3>
                <p className="text-gray-600 leading-relaxed">{reason.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-8 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
            <div className="text-5xl font-bold text-orange-600 mb-2">500+</div>
            <div className="text-gray-700 font-semibold">Happy Customers</div>
          </div>
          <div className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
            <div className="text-5xl font-bold text-blue-600 mb-2">5+</div>
            <div className="text-gray-700 font-semibold">Years Experience</div>
          </div>
          <div className="p-8 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
            <div className="text-5xl font-bold text-orange-600 mb-2">100%</div>
            <div className="text-gray-700 font-semibold">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
}
