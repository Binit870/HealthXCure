import React from "react";
import { Link } from "react-router-dom";
import { FaMicroscope, FaCalendarCheck, FaMapMarkerAlt, FaAppleAlt } from "react-icons/fa";

const DoctorsSection = () => (
  <section id="doctors" className="py-12 fade-in-on-scroll rounded-3xl shadow-2xl p-8 mb-16 bg-white/10 backdrop-blur-xl border border-white/10">
          <h3 className="text-4xl font-extrabold text-white text-center mb-12">Meet Our Specialists</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="rounded-3xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition duration-300 bg-gradient-to-br from-sky-600 to-blue-700 text-white">
              <img src="https://placehold.co/120x120/E2E8F0/000?text=Dr.A" alt="Doctor 1" className="w-24 h-24 rounded-full mb-4 object-cover border-4 border-blue-500" />
              <h4 className="text-xl font-bold">Dr. Jane Doe</h4>
              <p className="text-white/80 font-medium">Cardiologist</p>
              <p className="text-yellow-400 mt-2 text-lg">
                <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star-half-alt"></i> (4.5)
              </p>
              <button className="mt-4 bg-blue-500 text-white font-medium py-2 px-6 rounded-full hover:bg-blue-600 transition duration-300">
                Book Now
              </button>
            </div>

            <div className="rounded-3xl p-6 shadow-md flex flex-col items-center text-center hover:shadow-xl transition duration-300 bg-gradient-to-br from-green-600 to-emerald-700 text-white">
              <img src="https://placehold.co/120x120/E2E8F0/000?text=Dr.B" alt="Doctor 2" className="w-24 h-24 rounded-full mb-4 object-cover border-4 border-green-500" />
              <h4 className="text-xl font-bold">Dr. John Smith</h4>
              <p className="text-white/80 font-medium">Dermatologist</p>
              <p className="text-yellow-400 mt-2 text-lg">
                <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="far fa-star"></i> (4.0)
              </p>
              <button className="mt-4 bg-blue-500 text-white font-medium py-2 px-6 rounded-full hover:bg-blue-600 transition duration-300">
                Book Now
              </button>
            </div>

            <div className="rounded-3xl p-6 shadow-md flex flex-col items-center text-center hover:shadow-xl transition duration-300 bg-gradient-to-br from-purple-600 to-fuchsia-700 text-white">
              <img src="https://placehold.co/120x120/E2E8F0/000?text=Dr.C" alt="Doctor 3" className="w-24 h-24 rounded-full mb-4 object-cover border-4 border-purple-500" />
              <h4 className="text-xl font-bold">Dr. Emily White</h4>
              <p className="text-white/80 font-medium">Pediatrician</p>
              <p className="text-yellow-400 mt-2 text-lg">
                <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i> (5.0)
              </p>
              <button className="mt-4 bg-blue-500 text-white font-medium py-2 px-6 rounded-full hover:bg-blue-600 transition duration-300">
                Book Now
              </button>
            </div>
          </div>
        </section>
);

export default DoctorsSection;
