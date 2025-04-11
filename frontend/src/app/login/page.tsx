"use client";
import { useState } from "react";
import Link from "next/link";
import { AiOutlineHome, AiOutlineInfoCircle } from "react-icons/ai";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { AiOutlineLogin, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false); // State for toggling password visibility

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the JWT token in localStorage or a state management tool
        localStorage.setItem("token", data.token);
        // Redirect the user or take some other action upon successful login
        window.location.href = "/Dashboard"; // Redirect to dashboard or home page
      } else {
        setError(data.error); // Set error message if login fails
      }
    } catch (err) {
      setError("Une erreur s'est produite. Veuillez réessayer.");
      console.error("Login error:", err);
    }
  };


  return (
    <div className="flex flex-col min-h-screen bg-white-100">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
        {/* Logo */}
        <div className="flex space-x-6">
          <div className="text-lg font-bold text-gray-900">ProCoach</div>

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

        {/* Login Button (Display "S'inscrire" in Navbar) */}
        <Link href="/inscrire">
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
            S'inscrire
          </button>
        </Link>
      </nav>

      {/* Login Form */}
      <div className="min-h-screen flex flex-col items-center bg-white-100 px-6">
      <div className="w-full max-w-5xl mt-8 mb-2"> {/* Max-width increased to 7xl */}
      <h1 className="text-3xl font-semibold text-gray-900 mb-8">Connexion Coach</h1>
      <p className="text-gray-400 text-2xl mb-8">
      Connectez-vous pour accéder à votre espace coach
          </p>

          {/* Error Message */}
          <div className="bg-red-100 text-black-600 p-4 rounded-lg mb-4">
            <AiOutlineLogin className="flex text-red-600 mr-2 " /><br />
            <span className="text-xl font-semibold text-gray-800">Connexion</span>
          </div>

          {/* Email Field */}
          <label className="block text-black text-lg">Email</label>
          <div className="flex items-center border border-gray-300 bg-gray-100 rounded-lg px-4 py-3 mt-1">
          <input
              type="email"
              className="w-full outline-none bg-gray-100 text-black"
              placeholder="exemple@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <AiOutlineMail className="text-black-500 mr-2" />

          </div>

          {/* Password Field */}
          <label className="block text-black text-lg">Mot de passe</label>
          <div className="flex items-center border border-gray-300 bg-gray-100 rounded-lg px-4 py-3 mt-1 mb-8">
          <input
              type={passwordVisible ? "text" : "password"} // Toggle password visibility
              className="w-full outline-none bg-gray-100 text-black"
              placeholder="Entrez votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* Eye Icon to Toggle Password Visibility */}
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="ml-2 text-gray-500"
            >
              {passwordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>

          {/* Forgot Password Link */}
          <div className="text-right mb-6">
            <a href="#" className="text-blue-500 text-sm hover:underline">
              Mot de passe oublié?
            </a>
          </div>

          {/* Remember Me Option */}
          <div className="flex items-center justify-between mb-6">
           <label className="flex items-center text-gray-700">
           <input
            type="checkbox"
            className="mr-2 peer accent-red-500"
             />
            Se souvenir de moi
           </label>
          </div>


          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
          >
            Se connecter
          </button>

          <p className="text-center text-sm text-blue-500 mt-4">
            Vous n'avez pas de compte?{" "}
            <a href="/inscrire" className="text-blue-500 hover:underline">
              S'inscrire
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
