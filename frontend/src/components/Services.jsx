import React from 'react';
import { Stethoscope, Salad, HeartPulse, Shield, Calendar, Phone } from 'lucide-react';

// The ServiceCard component displays a single service with an icon, title, and description.
// It includes a subtle hover animation for an interactive feel.
const ServiceCard = ({ icon, title, description }) => {
  return (
    <div className="group relative overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl rounded-3xl p-6 bg-white border-2 border-transparent hover:border-blue-400">
      <div className="relative z-10">
        <div className="mb-4 inline-block p-3 rounded-full bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
          {icon}
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
      {/* Background animation for a cool effect */}
      <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl"></div>
      </div>
    </div>
  );
};

// The main Services component that renders the entire services section.
const Services = () => {
  const services = [
    {
      title: 'Find a Doctor',
      description: 'Search and book appointments with verified doctors and specialists in your area with ease.',
      icon: <Stethoscope size={32} />,
    },
    {
      title: 'Personalized Diet Plans',
      description: 'Get custom diet and nutrition plans crafted by experts to meet your health goals.',
      icon: <Salad size={32} />,
    },
    {
      title: 'Emergency Care',
      description: 'Immediate access to our emergency care team for urgent medical needs.',
      icon: <HeartPulse size={32} />,
    },
    {
      title: 'Telemedicine',
      description: 'Consult with healthcare professionals from the comfort of your home via video calls.',
      icon: <Phone size={32} />,
    },
    {
      title: 'Health Insurance',
      description: 'Navigate complex insurance plans and find coverage that is right for you and your family.',
      icon: <Shield size={32} />,
    },
    {
      title: 'Schedule a Visit',
      description: 'Effortlessly schedule your next clinic visit and receive timely reminders.',
      icon: <Calendar size={32} />,
    },
  ];

  return (
    <div className="min-h-screen font-sans  flex items-center justify-center p-4 sm:p-6 lg:p-10">
      <script src="https://cdn.tailwindcss.com"></script>
      {/* Main container for the services section */}
      <div className="w-full max-w-7xl mx-auto text-center py-10">
        {/* Section Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-100 mb-4 tracking-tight">
          Our Health Services
        </h2>
        {/* Section Subtitle */}
        <p className="text-lg md:text-xl text-gray-200 mb-12 max-w-3xl mx-auto">
          We provide a comprehensive range of services to ensure your health and well-being.
        </p>

        {/* Responsive grid for the service cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
