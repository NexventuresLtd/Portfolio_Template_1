import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";

const images = [
  "https://www.moneyweb.co.za/wp-content/uploads/2015/02/Construction-Melrose-Arch-builders-workers-employment-mixing-cement-Large-1024x683.jpg", // Construction site at sunset
  "https://images.pexels.com/photos/1643389/pexels-photo-1643389.jpeg", // Excavator close-up
  "https://images.pexels.com/photos/534172/pexels-photo-534172.jpeg", // Cranes and skyline
];

const ContactHero: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[80vh] w-full overflow-hidden">
      {/* Sliding Images */}
      <div className="absolute inset-0">
        {images.map((src, index) => (
          <motion.img
            key={src}
            src={src}
            alt="Construction Slide"
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: currentImage === index ? 1 : 0 }}
            transition={{ duration: 1 }}
          />
        ))}
        <div className="absolute inset-0 bg-black/70 bg-opacity-50" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center h-full text-white px-6">
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          Get in Touch with Robert Construction
        </motion.h1>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-lg md:text-xl max-w-3xl mb-6"
        >
          Let’s discuss your project ideas and turn them into reality with our
          innovative and sustainable construction solutions.
        </motion.p>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <a
            href="tel:+250788123456"
            className="flex items-center gap-2 bg-primary hover:bg-accent px-6 py-3 rounded-lg text-white transition-colors"
          >
            <Phone className="w-5 h-5" /> Call Us
          </a>
          <a
            href="mailto:contact@robertconstruction.com"
            className="flex items-center gap-2 bg-glass-light hover:bg-accent px-6 py-3 rounded-lg text-white transition-colors"
          >
            <Mail className="w-5 h-5" /> Email Us
          </a>
          <a
            href="#map"
            className="flex items-center gap-2 bg-glass-light hover:bg-accent px-6 py-3 rounded-lg text-white transition-colors"
          >
            <MapPin className="w-5 h-5" /> Find Us
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactHero;
