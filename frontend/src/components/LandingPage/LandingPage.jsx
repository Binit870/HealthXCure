import React, { useEffect } from "react";
import "./LandingPage.css";

import HeroSection from "./HeroSection";
import ServicesSection from "./ServicesSection";
import HealthCure from "./HealthCure";
import TransformHealth from "./TransformHealth";

const LandingPage = () => {
  useEffect(() => {
    // Smooth scroll for anchor links
    const anchors = document.querySelectorAll('a[href^="#"]');
    const handleAnchorClick = (e) => {
      e.preventDefault();
      const target = document.querySelector(e.currentTarget.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    };

    anchors.forEach((anchor) => anchor.addEventListener("click", handleAnchorClick));

    // Fade-in animation on scroll
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const fadeElements = document.querySelectorAll(".fade-in-on-scroll");
    fadeElements.forEach((el) => observer.observe(el));

    // Cleanup
    return () => {
      anchors.forEach((anchor) => anchor.removeEventListener("click", handleAnchorClick));
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className="relative min-h-screen pt-8 text-gray-900 fade-bg"
      style={{
        background: "linear-gradient(180deg, #99f6e4 0%, #2dd4bf 100%)",
      }}
    >
      <main className="container mx-auto px-4">
        <HeroSection />
        <ServicesSection />
        <HealthCure />
        <TransformHealth />
      </main>
    </div>
  );
};

export default LandingPage;
