"use client";
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Phone, Shield, CheckCircle } from "lucide-react";
import { useState } from "react";
import { FaListAlt, FaTrophy, FaUniversity } from "react-icons/fa";
import { AiOutlineHome, AiOutlineInfoCircle, AiOutlineMail } from "react-icons/ai";
import Link from "next/link";
import axios from "axios";  // Importing axios for API calls

export default function Register() {
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [subscribe, setSubscribe] = useState(false);
  
  // States for form inputs
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [equipe, setEquipe] = useState("");
  const [categorie, setCategorie] = useState("");
  const [club, setClub] = useState("");
  const [niveau, setNiveau] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();  // Initialize router

  // Form submit handler
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/register", {
        nom,
        prenom,
        email,
        telephone,
        equipe,
        categorie,
        club,
        niveau,
        password,
      });
      alert(response.data.message);
      router.push('/login');

    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.error || "Erreur lors de l'inscription");
      } else {
        alert("Une erreur inattendue est survenue");
      }
    }
  }
    

  return (
    <div className="flex flex-col min-h-screen bg-white-100">
      <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
        <div className="flex space-x-6">
          <div className="text-lg font-bold text-gray-900">ProCoach</div>
          <Link href="/" className="flex items-center text-gray-700 hover:text-red-500">
            <AiOutlineHome className="mr-1" /> Accueil
          </Link>
          <Link href="/about" className="flex items-center text-gray-700 hover:text-red-500">
            <AiOutlineInfoCircle className="mr-1" /> À propos
          </Link>
          <Link href="/contact" className="flex items-center text-gray-700 hover:text-red-500">
            <AiOutlineMail className="mr-1" /> Contact
          </Link>
        </div>
        <Link href="/login">
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
            Se connecter
          </button>
        </Link>
      </nav>

      <div className="min-h-screen flex flex-col items-center bg-white-100 px-6">
      <div className="w-full max-w-5xl mt-8"> {/* Max-width increased to 7xl */}
      <h1 className="text-3xl font-semibold text-gray-900 mb-2">Créer un compte coach</h1>
          <p className="text-gray-400 text-2xl">
            Remplissez ce formulaire pour rejoindre la plateforme en tant que coach.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-xl w-full max-w-5xl mt-6"> {/* Max-width increased to 7xl */}
          {/* Personal Information Section */}
          <div className="bg-red-100 p-4 rounded-md flex flex-col gap-2">
            <User className="text-red-500" />
            <h2 className="text-xl font-semibold text-gray-800">Informations personnelles</h2>
          </div>

          <div className="mt-6 space-y-4">
            {[ 
              { label: "Nom", value: nom, setValue: setNom, type: "text" },
              { label: "Prénom", value: prenom, setValue: setPrenom, type: "text" },
              { label: "Email", value: email, setValue: setEmail, type: "email", icon: <Mail className="text-black-500 mr-2" /> },
              { label: "Téléphone", value: telephone, setValue: setTelephone, type: "tel", icon: <Phone className="text-black-500 mr-2" /> }
            ].map(({ label, value, setValue, type, icon }) => (
              <div key={label}>
                <span className="block text-black text-lg">{label}</span>
                <div className="flex items-center border border-gray-300 bg-gray-100 rounded-lg px-4 py-3 mt-1">
                  <input
                    type={type}
                    placeholder={`Entrez votre ${label.toLowerCase()}`}
                    className="w-full outline-none bg-gray-100 text-black text-lg"
                    required
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                  {icon}
                </div>
              </div>
            ))}
          </div>

          {/* Team Information Section */}
          <div className="bg-red-100 p-4 rounded-md flex flex-col gap-2 mt-6">
            <Shield className="text-red-500" />
            <h2 className="text-xl font-semibold text-gray-800">Informations d'équipe</h2>
          </div>

          {[ 
            { label: "Nom de l'équipe", value: equipe, setValue: setEquipe },
            { label: "Catégorie", value: categorie, setValue: setCategorie, icon: <FaListAlt className="text-gray-500 ml-2" /> },
            { label: "Club", value: club, setValue: setClub, icon: <FaUniversity className="text-gray-500 ml-2" /> },
            { label: "Niveau", value: niveau, setValue: setNiveau, icon: <FaTrophy className="text-gray-500 ml-2" /> }
          ].map(({ label, value, setValue, icon }) => (
            <div key={label} className="mt-4">
              <label className="block text-black text-lg">{label}</label>
              <div className="flex items-center border border-gray-300 bg-gray-100 rounded-lg px-4 py-3 mt-1">
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={`Entrez ${label.toLowerCase()}`}
                  className="w-full outline-none bg-gray-100 text-black text-lg"
                  required
                />
                {icon}
              </div>
            </div>
          ))}

          {/* Password Section */}
          <div className="bg-red-100 p-4 rounded-md flex flex-col gap-2 mt-6">
            <Lock className="text-red-500" />
            <h2 className="text-xl font-semibold text-gray-800">Sécurité</h2>
          </div>

          {[ 
            { label: "Mot de passe", value: password, setValue: setPassword, type: "password" },
            { label: "Confirmer le mot de passe", value: confirmPassword, setValue: setConfirmPassword, type: "password" }
          ].map(({ label, value, setValue, type }) => (
            <div key={label} className="mt-4">
              <label className="block text-black text-lg">{label}</label>
              <div className="flex items-center border border-gray-300 bg-gray-100 rounded-lg px-4 py-3 mt-1">
                <input
                  type={type}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={`Entrez ${label.toLowerCase()}`}
                  className="w-full outline-none bg-gray-100 text-black text-lg"
                  required
                />
              </div>
            </div>
          ))}

          {/* Terms & Conditions Section */}
          <div className="flex items-center mt-6">
            <input
              type="checkbox"
              id="acceptTerms"
              checked={acceptTerms}
              onChange={() => setAcceptTerms(!acceptTerms)}
            />
            <label htmlFor="acceptTerms" className="ml-2">J'accepte les termes et conditions</label>
          </div>
          
          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              id="subscribe"
              checked={subscribe}
              onChange={() => setSubscribe(!subscribe)}
            />
            <label htmlFor="subscribe" className="ml-2">S'abonner à la newsletter</label>
          </div>

          <button type="submit" className="mt-6 w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600">
            Inscrire
          </button>
        </form>
      </div>
    </div>
  );
}
