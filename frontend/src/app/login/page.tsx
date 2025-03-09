"use client";
import { AiOutlineLogin } from "react-icons/ai";
import { useState } from "react";
import Link from "next/link";
import { AiOutlineHome, AiOutlineInfoCircle } from "react-icons/ai";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col min-h-screen bg-white-100">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
        {/* Logo */}
        <div className="flex space-x-6">

        <div className="text-lg font-bold text-gray-900">My Coach Football</div>

        {/* Navigation Links (Accueil, À propos, Contact) */}
          <Link href="/" className="flex items-center text-gray-700 hover:text-red-500">
            <AiOutlineHome className="mr-1" />
            Accueil
          </Link>
          <Link href="/about" className="flex items-center text-gray-700 hover:text-red-500">
            <AiOutlineInfoCircle className="mr-1" />
            À propos
          </Link>
          <Link href="/contact" className="flex items-center text-gray-700 hover:text-red-500">
            <AiOutlineMail className="mr-1" />
            Contact
          </Link>
        </div>

        {/* Registration Button */}
        <Link href="/register">
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
            S'inscrire
          </button>
        </Link>
      </nav>

      {/* Login Form */}
      <div className="flex justify-center items-center flex-grow">
        <div className="w-full max-w-lg  p-8 rounded-lg ">
          <h2 className="text-2xl font-bold  mb-4">Connexion Coach</h2>
          <p className="text-gray-600  mb-6">
            Connectez-vous pour accéder à votre espace coach
          </p>

          {/* Error Message */}
          <div className=" bg-red-100 text-black-600 p-4 rounded-lg mb-4">
            <AiOutlineLogin className=" flex text-red-600 mr-2 " /><br/>
          <span>Connexion</span>
           </div>

          {/* Email Field */}
          <label className="block text-black">Email</label>
<div className="flex items-center border border-gray-300 bg-gray-100 text-black rounded-lg px-3 py-2 mt-1 mb-4">
  <AiOutlineMail className="text-black-500 mr-2" />
  <input
    type="email"
    className="w-full outline-none bg-gray-100 text-black"
    placeholder="exemple@email.com"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
</div>

{/* Password Field */}
<label className="block text-black">Mot de passe</label>
<div className="flex items-center border border-gray-300 bg-gray-100 rounded-lg px-3 py-2 mt-1 mb-2">
  <AiOutlineLock className="text-black-500 mr-2" />
  <input
    type="password"
    className="w-full outline-none bg-gray-100 text-black"
    placeholder="Entrez votre mot de passe"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
</div>
          <div className="text-right mb-4">
            <a href="#" className="text-blue-500 text-sm hover:underline">
              Mot de passe oublié?
            </a>
          </div>

          {/* Remember Me Option */}
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center text-gray-700">
              <input type="checkbox" className="mr-2" />
              Se souvenir de moi
            </label>
          </div>

          {/* Login Button */}
          <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">
            Se connecter
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Vous n'avez pas de compte?{" "}
            <a href="#" className="text-blue-500 hover:underline">
              S'inscrire
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
