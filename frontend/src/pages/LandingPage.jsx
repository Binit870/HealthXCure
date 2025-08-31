import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // external stylesheet
import {
  FaHeartbeat,
  FaRunning,
  FaBed,
  FaMicroscope,
  FaCalendarCheck,
  FaMapMarkerAlt,
  FaAppleAlt,
  FaPaperPlane
} from 'react-icons/fa';
import healthImage from '../assets/healthcare.png'; // Example image import
const LandingPage = () => {
  useEffect(() => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });

    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-on-scroll').forEach(section => {
      observer.observe(section);
    });

    // Scroll-to-top button
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    const handleScroll = () => {
      if (window.scrollY > 300) {
        scrollToTopBtn?.classList.add("show");
      } else {
        scrollToTopBtn?.classList.remove("show");
      }
    };

    const handleScrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("scroll", handleScroll);
    scrollToTopBtn?.addEventListener("click", handleScrollToTop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      scrollToTopBtn?.removeEventListener("click", handleScrollToTop);
      observer.disconnect();
    };
  }, []);


  return (
    <div className="bg-gradient-to-br from-cyan-900 to-blue-900 min-h-screen pt-8 text-white">


      <main className="container mx-auto px-4  ">
        {/* HERO */}
        <section
          id="hero"
          className="relative w-full h-screen flex items-center justify-center overflow-hidden rounded-3xl shadow-lg mb-16"
        >
          {/* Full Width Background Image */}
          <img
            src={healthImage}
            alt="Health and Wellness"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Dark overlay (optional, for readability) */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Text Content Overlay */}
          <div className="relative z-10 text-center px-6">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-4 animate-fade-in">
              Your Partner in Health and Wellness
            </h2>
            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-8 animate-fade-in-delay">
              Manage your health from one place. Check symptoms, book appointments, find doctors, and get personalized diet plans.
            </p>
            <a
              href="#services"
              className="inline-block bg-cyan-600 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:bg-cyan-700 transition duration-300 transform hover:scale-105"
            >
              Explore Services
            </a>
          </div>
        </section>

        {/* SERVICES (cards: now gradients + bright text) */}
        <section
      id="services"
      className="py-12 rounded-3xl shadow-2xl fade-in-on-scroll p-8 mb-16 bg-white/10 backdrop-blur-xl border border-white/10"
    >
      <h3 className="text-4xl font-extrabold text-white text-center mb-12">
        Our Core Services
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Symptom Checker */}
        <Link
          to="/symptom-checker"
          className="card rounded-3xl p-8 shadow-md flex flex-col items-center text-center bg-gradient-to-br from-blue-600 to-indigo-700 text-white transition transform hover:scale-105 hover:shadow-xl"
        >
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 text-white text-3xl">
            <FaMicroscope />
          </div>
          <h4 className="text-2xl font-semibold mb-2">Symptom Checker</h4>
          <p className="text-gray-200">
            Identify potential diseases based on your symptoms using our smart algorithm.
          </p>
        </Link>

        {/* Book Appointment */}
        <Link
          to="/book-appointment"
          className="card rounded-3xl p-8 shadow-md flex flex-col items-center text-center bg-gradient-to-br from-emerald-600 to-green-700 text-white transition transform hover:scale-105 hover:shadow-xl"
        >
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 text-white text-3xl">
            <FaCalendarCheck />
          </div>
          <h4 className="text-2xl font-semibold mb-2">Book Appointment</h4>
          <p className="text-gray-200">
            Schedule a visit with qualified doctors in your vicinity with just a few clicks.
          </p>
        </Link>

        {/* Find Doctors */}
        <Link
          to="/find-doctors"
          className="card rounded-3xl p-8 shadow-md flex flex-col items-center text-center bg-gradient-to-br from-purple-600 to-indigo-700 text-white transition transform hover:scale-105 hover:shadow-xl"
        >
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 text-white text-3xl">
            <FaMapMarkerAlt />
          </div>
          <h4 className="text-2xl font-semibold mb-2">Find Doctors</h4>
          <p className="text-gray-200">
            See the live location and availability of nearby doctors and clinics on a map.
          </p>
        </Link>

        {/* Diet Planner */}
        <Link
          to="/diet-planner"
          className="card rounded-3xl p-8 shadow-md flex flex-col items-center text-center bg-gradient-to-br from-amber-500 to-orange-600 text-white transition transform hover:scale-105 hover:shadow-xl"
        >
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 text-white text-3xl">
            <FaAppleAlt />
          </div>
          <h4 className="text-2xl font-semibold mb-2">Diet Planner</h4>
          <p className="text-gray-100">
            Get personalized diet and nutrition plans to help you achieve your health goals.
          </p>
        </Link>

      </div>
    </section>

        {/* ASSISTANT (container and chat on dark surfaces) */}
        <section
          id="assistant"
          className="py-12 rounded-3xl shadow-lg mb-16 p-8 md:p-12 text-center fade-in-on-scroll bg-white/10 backdrop-blur-xl border border-white/10"
        >
          <h3 className="text-4xl font-extrabold text-white mb-6">Your Personal Health Assistant</h3>
          <p className="text-gray-200 max-w-2xl mx-auto mb-8">
            Chat with our AI-powered assistant for instant answers to your health-related questions.
          </p>

          <div className="rounded-3xl shadow-xl border border-white/10 overflow-hidden bg-slate-900/40">
            {/* Preview Chat Window */}
            <div className="h-96 p-6 overflow-y-auto space-y-4">
              <div className="flex justify-start">
                <div className="chat-message received max-w-md p-4 rounded-3xl bg-gray-200 text-black">
                  Hi there! How can I help you with your health today?
                </div>
              </div>
              <div className="flex justify-end">
                <div className="chat-message sent max-w-md p-4 rounded-3xl bg-blue-600 text-white">
                  What are the symptoms of the flu?
                </div>
              </div>
              <div className="flex justify-start">
                <div className="chat-message received max-w-md p-4 rounded-3xl bg-gray-200 text-black">
                  Common flu symptoms include fever, body aches, sore throat, and a cough.
                </div>
              </div>
            </div>

            {/* Redirect to Full Chat Page */}
            <div className="p-4 border-t border-white/10 flex space-x-2 bg-slate-900/30">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-grow p-3 rounded-full border border-white/10 bg-slate-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                onFocus={() => (window.location.href = "/chat")}
              />

              <a
                href="/chat"
                className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-blue-700 transition duration-300"
              >
                <i className="fas fa-paper-plane"><FaPaperPlane /></i>
              </a>

            </div>
          </div>
        </section>

        {/* DASHBOARD (cards: gradients + white text) */}
       <section id="dashboard" className="py-12 bg-gradient-to-br from-gray-800 to-gray-600 rounded-3xl shadow-lg mb-16 p-8 md:p-12 text-center text-white fade-in-on-scroll">
    <h3 className="text-4xl font-extrabold text-white mb-6">Your Personal Health Dashboard</h3>
    <p className="text-gray-300 max-w-2xl mx-auto mb-8">
        Track your health metrics, appointments, and progress all in one place.
    </p>
    {/* Flex container to organize the grid and the button vertically */}
    <div className="flex flex-col items-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            <div className="rounded-3xl p-6 shadow-md flex flex-col items-center text-center bg-gradient-to-br from-blue-600 to-blue-800">
                <FaHeartbeat className="text-white text-4xl mb-3" />
                <h4 className="text-xl font-bold mb-1 text-white">Heart Rate</h4>
                <p className="text-white text-2xl font-bold">72 bpm</p>
            </div>
            <div className="rounded-3xl p-6 shadow-md flex flex-col items-center text-center bg-gradient-to-br from-emerald-600 to-teal-700">
                <FaRunning className="text-white text-4xl mb-3" />
                <h4 className="text-xl font-bold mb-1 text-white">Steps Today</h4>
                <p className="text-white text-2xl font-bold">8,500</p>
            </div>
            <div className="rounded-3xl p-6 shadow-md flex flex-col items-center text-center bg-gradient-to-br from-purple-600 to-indigo-700">
                <FaBed className="text-white text-4xl mb-3" />
                <h4 className="text-xl font-bold mb-1 text-white">Sleep Score</h4>
                <p className="text-white text-2xl font-bold">92%</p>
            </div>
        </div>
        {/* The Link is now properly spaced below the grid with mt-8 */}
        <Link 
            to="/dashboard" 
            className="mt-8 bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
        >
            Go to Dashboard
        </Link>
    </div>
</section>

        {/* COMMUNITY (cards: dark surfaces) */}
        <section id="community" className="py-12 rounded-3xl shadow-lg p-8 md:p-12 mb-16 fade-in-on-scroll bg-white/10 backdrop-blur-xl border border-white/10">
      <h3 className="text-4xl font-extrabold text-white text-center mb-8">Join the Community</h3>
      <p className="text-gray-200 max-w-2xl mx-auto mb-8 text-center">
        Connect with others, ask questions, and share your health journey.
      </p>
      <div className="space-y-6">
        <div className="flex items-center space-x-4 bg-white/10 p-4 rounded-xl shadow-sm hover:shadow-md transition duration-300 border border-white/10">
          <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white text-2xl">
            <i className="fas fa-heart"></i>
          </div>
          <div className="flex-grow">
            <h4 className="text-xl font-bold text-white">Cardiology & Heart Health</h4>
            <p className="text-gray-200">Discussions about heart conditions, fitness, and diet.</p>
          </div>
          <span className="text-sm font-semibold text-gray-200">1.2k Posts</span>
        </div>

        <div className="flex items-center space-x-4 bg-white/10 p-4 rounded-xl shadow-sm hover:shadow-md transition duration-300 border border-white/10">
          <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white text-2xl">
            <i className="fas fa-apple-alt"></i>
          </div>
          <div className="flex-grow">
            <h4 className="text-xl font-bold text-white">Nutrition & Diet</h4>
            <p className="text-gray-200">Share recipes, meal plans, and tips for healthy eating.</p>
          </div>
          <span className="text-sm font-semibold text-gray-200">850 Posts</span>
        </div>

        <div className="flex items-center space-x-4 bg-white/10 p-4 rounded-xl shadow-sm hover:shadow-md transition duration-300 border border-white/10">
          <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white text-2xl">
            <i className="fas fa-running"></i>
          </div>
          <div className="flex-grow">
            <h4 className="text-xl font-bold text-white">Fitness & Exercise</h4>
            <p className="text-gray-200">Talk about workout routines, motivation, and fitness goals.</p>
          </div>
          <span className="text-sm font-semibold text-gray-200">2.1k Posts</span>
        </div>
      </div>
      {/* Changed button to Link for routing */}
      <Link 
        to="/community"
        className="mt-8 bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105 mx-auto block text-center"
      >
        Join the Discussion
      </Link>
    </section>

        {/* REPORTS (dropzone on dark surface) */}
        <section id="reports" className="py-12 rounded-3xl shadow-lg mb-16 p-8 md:p-12 text-center fade-in-on-scroll bg-white/10 backdrop-blur-xl border border-white/10">
          <h3 className="text-4xl font-extrabold text-white mb-6">Check Your Reports</h3>
          <p className="text-gray-200 max-w-xl mx-auto mb-8">
            Upload your medical report and our advanced AI will analyze it to provide a detailed summary and key insights.
          </p>
          <div className="rounded-2xl p-6 md:p-12 border-2 border-dashed border-white/20 cursor-pointer hover:border-blue-400/60 transition duration-300 bg-white/5">
            <i className="fas fa-file-upload text-white/70 text-6xl mb-4"></i>
            <p className="text-white font-bold text-lg">Drag &amp; Drop Your Report Here</p>
            <p className="text-gray-300 text-sm mt-2">or click to browse files (PDF, JPG, PNG)</p>
          </div>
          <button className="mt-8 bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105">
            Upload Report
          </button>
        </section>

        {/* DOCTORS (cards: gradients + white text) */}
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

        {/* BLOG (cards: dark surfaces) */}
        <section id="blog" className="py-12 rounded-3xl shadow-lg p-8 md:p-12 mb-16 fade-in-on-scroll bg-white/10 backdrop-blur-xl border border-white/10">
          <h3 className="text-4xl font-extrabold text-white text-center mb-12">Latest from Our Health Blog</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300 bg-slate-800/60 border border-white/10">
              <img src="https://placehold.co/600x400/D1D5DB/fff?text=Blog+Post+1" alt="Blog Post 1" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h4 className="text-xl font-bold text-white mb-2">5 Ways to Boost Your Immunity</h4>
                <p className="text-gray-200 text-sm">Learn about simple lifestyle changes to strengthen your body's natural defenses.</p>
                <a href="#" className="mt-4 text-blue-300 font-semibold inline-block hover:underline">Read More &rarr;</a>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300 bg-slate-800/60 border border-white/10">
              <img src="https://placehold.co/600x400/D1D5DB/fff?text=Blog+Post+2" alt="Blog Post 2" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h4 className="text-xl font-bold text-white mb-2">The Importance of Regular Check-ups</h4>
                <p className="text-gray-200 text-sm">A quick guide on why preventive healthcare is crucial for long-term well-being.</p>
                <a href="#" className="mt-4 text-blue-300 font-semibold inline-block hover:underline">Read More &rarr;</a>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300 bg-slate-800/60 border border-white/10">
              <img src="https://placehold.co/600x400/D1D5DB/fff?text=Blog+Post+3" alt="Blog Post 3" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h4 className="text-xl font-bold text-white mb-2">Healthy Eating on a Budget</h4>
                <p className="text-gray-200 text-sm">Tips and tricks to maintain a nutritious diet without breaking the bank.</p>
                <a href="#" className="mt-4 text-blue-300 font-semibold inline-block hover:underline">Read More &rarr;</a>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT (form fields adapted for dark) */}
        <section id="contact" className="py-12 rounded-3xl shadow-lg p-8 md:p-12 mb-16 fade-in-on-scroll bg-white/10 backdrop-blur-xl border border-white/10">
          <h3 className="text-4xl font-extrabold text-white text-center mb-8">Get in Touch with Us</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white font-semibold mb-2">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full p-3 rounded-xl border border-white/10 bg-slate-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-white font-semibold mb-2">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-3 rounded-xl border border-white/10 bg-slate-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-white font-semibold mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  className="w-full p-3 rounded-xl border border-white/10 bg-slate-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Type your message here..."
                ></textarea>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105">
                Send Message
              </button>
            </form>
            <div className="rounded-xl overflow-hidden shadow-md border border-white/10">
              <img src="https://placehold.co/600x400/E5E7EB/fff?text=Map+Location+Placeholder" alt="Map Location" className="w-full h-full object-cover" />
            </div>
          </div>
        </section>
      </main>




    </div>
  );
};

export default LandingPage;
