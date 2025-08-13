import React from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  FileText,
  Download,
  Clock,
  Building2,
  Wrench,
} from "lucide-react";

const ContactPage: React.FC = () => {
  return (
    <div className="bg-background text-secondary dark:text-white min-h-screen px-6 py-12 md:px-16 lg:px-24">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-primary mb-2">Contact Us</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Get in touch with Robert Construction for innovative, sustainable, and
          high-quality engineering and construction solutions.
        </p>
      </motion.div>

      {/* Grid Layout */}
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-10"
        >
          {/* Contact Info - Grid Style */}
          <div className="bg-surface rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-6 text-primary">
              Our Office
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <MapPin className="text-accent w-6 h-6" />
                <span>Robert Construction HQ, Kigali, Rwanda</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="text-accent w-6 h-6" />
                <span>+250 788 123 456</span>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="text-accent w-6 h-6" />
                <span>contact@robertconstruction.com</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="text-accent w-6 h-6" />
                <span>Mon - Sat: 8:00 AM - 6:00 PM</span>
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div className="bg-surface rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-6 text-primary">
              What We Do
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Building2 className="text-accent w-5 h-5" />
                <span>
                  Residential, Commercial & Industrial Construction
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Wrench className="text-accent w-5 h-5" />
                <span>Structural Engineering, Civil Works & Renovations</span>
              </div>
            </div>
          </div>

          {/* Downloads Grid */}
          <div className="bg-surface rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-6 text-primary">
              Downloads
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <a
                href="/downloads/company-profile.pdf"
                className="flex items-center gap-3 hover:text-accent"
              >
                <FileText className="w-5 h-5" /> Company Profile (PDF)
              </a>
              <a
                href="/downloads/brochure.pdf"
                className="flex items-center gap-3 hover:text-accent"
              >
                <Download className="w-5 h-5" /> Brochure
              </a>
              <a
                href="/downloads/eng-robert-cv.pdf"
                className="flex items-center gap-3 hover:text-accent"
              >
                <FileText className="w-5 h-5" /> Eng. Robert CV
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Column */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Contact Form */}
          <div className="bg-surface rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-6 text-primary">
              Send a Message
            </h2>
            <form className="grid gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 rounded-lg bg-surface text-secondary dark:text-white border border-color focus:outline-none"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 rounded-lg bg-surface text-secondary dark:text-white border border-color focus:outline-none"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full p-3 rounded-lg bg-surface text-secondary dark:text-white border border-color focus:outline-none"
              ></textarea>
              <button
                type="submit"
                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-accent transition-colors"
              >
                Send
              </button>
            </form>
          </div>

          {/* Map */}
          <div className="overflow-hidden rounded-xl bg-surface border border-color" id="map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15951.673062292162!2d30.0585859!3d-1.9440726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca5f79b4b1e19%3A0xb47f9b4bcf8b7eaf!2sKigali!5e0!3m2!1sen!2srw!4v1692870432145!5m2!1sen!2srw"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
