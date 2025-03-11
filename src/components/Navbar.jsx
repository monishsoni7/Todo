import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white py-4 shadow-lg border-b border-gray-700">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="logo">
          <span className="font-bold text-2xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            DoFlow
          </span>
        </div>
        <ul className="flex gap-6">
          <li className="cursor-pointer hover:text-cyan-400 transition-all">Home</li>
          <li className="cursor-pointer hover:text-cyan-400 transition-all">About</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;