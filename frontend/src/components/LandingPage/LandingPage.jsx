import React, { useEffect } from "react";
import "./LandingPage.css";

import HeroSection from "./HeroSection";
import ServicesSection from "./ServicesSection";
import DashboardSection from "./DashboardSection";
import HealthCure from "./HealthCure";
import ChatbotLauncher from "./ChatbotLauncher";
import TransformHealth from "./TransformHealth";

const LandingPage = () => {
  useEffect(() => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute("href"));
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      });
    });

    // Fade-in animation on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".fade-in-on-scroll").forEach((section) => {
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
    <div
      className="relative min-h-screen pt-8 text-gray-900 fade-bg"
      style={{
        background: "linear-gradient(180deg, #dbeafe 0%, #bfdbfe 100%)",
      }}
    >
      <main className="container mx-auto px-4">
        <HeroSection />
        <ServicesSection />
        <DashboardSection />
        <HealthCure/>
        <TransformHealth/>
        
      </main>

      {/* Floating Chatbot */}
      <ChatbotLauncher />

      {/* Scroll-to-Top Button */}
      <button
        id="scrollToTopBtn"
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-sky-500 text-white p-3 rounded-full shadow-lg opacity-0 transition-all duration-300 hover:scale-110 hover:shadow-xl"
      >
        ↑
      </button>
    </div>
  );
};

export default LandingPage;
