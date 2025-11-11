// src/pages/About.jsx
import { Link } from "react-router-dom";
import { FaEnvelope, FaYoutube, FaFacebook, FaTiktok, FaInstagram, FaWhatsapp } from 'react-icons/fa';

export default function About() {
  const iconSize = 24; 
  
  const socialLinks = [
    { 
      name: "WhatsApp", 
      icon: <FaWhatsapp size={iconSize} />, 
      href: "https://wa.me/0775005886",
      bgColor: "bg-green-500",
      hoverBgColor: "hover:bg-green-600"
    },
    { 
      name: "Gmail", 
      icon: <FaEnvelope size={iconSize} />, 
      href: "mailto:roshanwijethunga555@gmail.com",
      bgColor: "bg-red-500",
      hoverBgColor: "hover:bg-red-600"
    },
    { 
      name: "YouTube", 
      icon: <FaYoutube size={iconSize} />, 
      href: "https://www.youtube.com/c/YourChannelName",
      bgColor: "bg-red-700",
      hoverBgColor: "hover:bg-red-800"
    },
    { 
      name: "Facebook", 
      icon: <FaFacebook size={iconSize} />, 
      href: "https://www.facebook.com/share/12MPAAb3H7o/?mibextid=wwXIfr",
      bgColor: "bg-blue-600",
      hoverBgColor: "hover:bg-blue-700"
    },
    { 
      name: "TikTok", 
      icon: <FaTiktok size={iconSize} />, 
      href: "https://www.tiktok.com/@yourtiktokhandle",
      bgColor: "bg-black",
      hoverBgColor: "hover:bg-gray-800"
    },
    { 
      name: "Instagram", 
      icon: <FaInstagram size={iconSize} />, 
      href: "https://www.instagram.com/yourinstagramhandle",
      bgColor: "bg-pink-500", 
      hoverBgColor: "hover:bg-pink-600"
    },
  ];

  return (
  <div className="w-full px-4 md:px-8 py-5 md:py-16 bg-white text-gray-800 mx-auto">
    <h1 className="text-4xl font-bold text-center mb-12 border-b pb-4">About Me</h1>
    
    <section className="flex flex-col md:flex-row items-center gap-12 mb-20 md:justify-center">
      <img
        src="/assets/profile.jpg"
        alt="Photographer portrait"
        className="w-full max-w-md h-auto object-cover rounded-xl shadow-2xl transition duration-300 hover:shadow-accent/50"
      />
      <div className="max-w-2xl">
        <h2 className="text-4xl font-extrabold text-accent mb-4">Hello, I'm Roshan</h2>
        <p className="text-2xl text-gray-700 leading-relaxed mb-6 border-l-4 border-accent pl-4">
          I’m a passionate photographer who believes in capturing the soul of every moment. Whether it’s a quiet portrait, a vibrant wedding, or a spontaneous travel scene - I strive to tell stories that linger.
        </p>
        <p className="mt-4 text-xl text-gray-600 mb-6">
          My style blends natural light, cinematic tones, and emotional depth. I love working with people who value authenticity, elegance, and timeless beauty. Let's create something meaningful together.
        </p>

        <div className="flex gap-4 mt-6">
          {socialLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`flex items-center justify-center w-12 h-12 text-white rounded-full shadow-lg transition duration-300 transform hover:scale-110 ${link.bgColor} ${link.hoverBgColor}`}
              title={`Follow me on ${link.name}`} 
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </section>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 w-full">
      
      <section className="w-full max-w-full p-6 bg-gray-50 rounded-lg shadow-inner">
        <h3 className="text-2xl font-bold mb-4 border-b pb-2 text-black">My Essential Gear</h3>
        <ul className="list-disc pl-5 text-gray-700 space-y-3 text-lg">
          <li><span className="font-semibold">Primary Camera:</span> Canon EOS R6 with RF 24-70mm f/2.8</li>
          <li><span className="font-semibold">Travel/Street:</span> Fujifilm X-T5 for mobility</li>
          <li><span className="font-semibold">Lighting:</span> Godox AD200 Pro and natural reflectors</li>
          <li><span className="font-semibold">Post-Processing:</span> Adobe Lightroom & Capture One</li>
        </ul>
      </section>

      <section className="w-full max-w-full p-6 bg-gray-50 rounded-lg shadow-inner">
        <h3 className="text-2xl font-bold mb-4 border-b pb-2 text-black">Achievements & Features</h3>
        <ul className="list-disc pl-5 text-gray-700 space-y-3 text-lg">
          <li>Featured in Vogue Sri Lanka (2024)</li>
          <li>Wedding shoots for 50+ couples across Asia</li>
          <li>Collaborations with local fashion brands</li>
          <li>Exhibited at Colombo Art Week</li>
        </ul>
      </section>
    </div>

    <div className="text-center p-8 bg-accent/10 rounded-xl">
      <h3 className="text-2xl font-semibold text-gray-700 mb-4">Ready to tell your story?</h3>
      <p className="text-lg text-gray-600 mb-6">Let's discuss how we can bring your vision to life.</p>
      <Link
        to="/contact"
        className="inline-block bg-accent text-white px-8 py-3 rounded-full font-semibold shadow-md hover:bg-accent-dark transition transform hover:scale-105"
      >
        Inquire Now
      </Link>
    </div>
  </div>
);
}