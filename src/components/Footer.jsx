// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="w-full bg-black text-white py-4 text-center text-base">
      © {new Date().getFullYear()} Wijethunga Photography. All rights reserved.
    </footer>
  );
}