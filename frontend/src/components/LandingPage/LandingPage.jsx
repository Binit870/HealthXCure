import React, { useEffect } from "react";
import "./LandingPage.css";

import HeroSection from "./HeroSection";
import ServicesSection from "./ServicesSection";
import AssistantSection from "./AssistantSection";
import DashboardSection from "./DashboardSection";
import CommunitySection from "./CommunitySection";
import ReportsSection from "./ReportsSection";



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
    <div className="bg-gradient-to-br from-cyan-900 to-teal-900 min-h-screen pt-8 text-white">
      <main className="container mx-auto px-4">
        <HeroSection />
        <ServicesSection />
        <DashboardSection />
        <AssistantSection />
        <CommunitySection />
        <ReportsSection />
       
        
      </main>
    </div>
  );
};

export default LandingPage;
