"use client"; 
import { Mail, Lock, User, Phone, Shield, CheckCircle, ToggleLeft, ToggleRight } from "lucide-react";
import { useState } from "react";
import { FaListAlt, FaStar } from 'react-icons/fa'; 
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';  // Password and eye icons

export default function Register() {
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center bg-white-100 px-4">
      {/* Header */}
      <div className="w-full max-w-3xl mt-6">
        <h1 className="text-2xl font-semibold text-gray-900">Créer un compte coach</h1>
        <p className="text-gray-600">Complétez le formulaire ci-dessous pour rejoindre la plateforme en tant que coach</p>
      </div>

      {/* Form */}
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-3xl mt-4">
        
        {/* Informations personnelles */}
        <div className="bg-red-100 p-3 rounded-md flex flex-col items-left  gap-2">
          <User className="text-red-500" />
          <h2 className="text-lg font-semibold text-gray-800">Informations personnelles</h2>
        </div>


  <div className="mt-8 space-y-3">
  <div>
    <span className="block text-black">Nom</span>
    <div className="flex items-center border border-gray-300 bg-gray-100 rounded-lg px-3 py-2 mt-1 mb-2">

    <input type="text" placeholder="Entrez votre nom" className="w-full outline-none bg-gray-100 text-black" />
    </div>
  </div>
  
  <div>
   <span className="block text-black">Prénom</span>
   <div className="flex items-center border border-gray-300 bg-gray-100 rounded-lg px-3 py-2 mt-1 mb-2">
    <input type="text" placeholder="Entrez votre prénom" className="w-full outline-none bg-gray-100 text-black" />
    </div>
  </div>

  
<label className="block text-black">Email</label>
<div className="flex items-center border border-gray-300 bg-gray-100 rounded-lg px-3 py-2 mt-1 mb-2">
  <input
    type="email"
    className="w-full outline-none bg-gray-100 text-black"
    placeholder="exemple@email.com"
  />
    <Mail className="text-black-500 mr-2"/>

</div>
</div>
<label className="block text-black">Téléphone</label>
<div className="flex items-center border border-gray-300 bg-gray-100 rounded-lg px-3 py-2 mt-1 mb-2">
<input type="tel" placeholder="+33 X XX XX XX XX" className="w-full outline-none bg-gray-100 text-black" />

  <Phone className="text-black-500 mr-2"/>

</div>
        {/* Informations d'équipe */}
        <div className="bg-red-100 p-3 rounded-md flex flex-col items-left gap-2 mt-6">
          <Shield className="text-red-500" />
          <h2 className="text-lg font-semibold text-gray-800">Informations d'équipe</h2>
        </div>

        <div className="mt-4 space-y-3">
        <label className="block text-black">Nom de l'equipe</label>
        <div className="flex items-center border border-gray-300 bg-gray-100 rounded-lg px-3 py-2 mt-1 mb-2">
          <input type="text" placeholder="Ex: Senior, U19, U17..." className="w-full outline-none bg-gray-100 text-black" />
          </div>
          <label className="block text-black">Catégorie</label>
        <div className="flex items-center border border-gray-300 bg-gray-100 rounded-lg px-3 py-2 mt-1 mb-2">
          <input type="text" placeholder="Ex: FC Marseille Senior" className="w-full outline-none bg-gray-100 text-black" />
          <FaListAlt className="input-icon absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />

          </div>
          <label className="block text-black">Club</label>
        <div className="flex items-center border border-gray-300 bg-gray-100 rounded-lg px-3 py-2 mt-1 mb-2">
          <input type="text" placeholder="Nom du club" className="w-full outline-none bg-gray-100 text-black" />
          </div>
          <label className="block text-black">Niveau</label>
        <div className="flex items-center border border-gray-300 bg-gray-100 rounded-lg px-3 py-2 mt-1 mb-2">
          <input type="text"placeholder="Ex: Régional, Départemental..." className="w-full outline-none bg-gray-100 text-black" />
          <FaStar className="text-black-500 mr-2" />

          </div>
        </div>

        {/* Sécurité */}
        <div className="bg-red-100 p-3 rounded-md flex  flex-col items-left gap-2 mt-6">
          <Lock className="text-red-500" />
          <h2 className="text-lg font-semibold text-gray-800">Sécurité</h2>
        </div>

        <div className="mt-4 space-y-3">
          <label className="block text-black">Mot de passe</label>
        <div className="flex items-center border border-gray-300 bg-gray-100 rounded-lg px-3 py-2 mt-1 mb-2">
          <input type="password" placeholder="Créez un mot de passe sécurisé" className="w-full outline-none bg-gray-100 text-black" />
          < FaEyeSlash className="text-black-500 mr-2" />
          </div>
          <label className="block text-black">Comfirmer le mot de passe </label>
        <div className="flex items-center border border-gray-300 bg-gray-100 rounded-lg px-3 py-2 mt-1 mb-2">
          <input type="password" placeholder="Confirmez votre mot de passe" className="w-full outline-none bg-gray-100 text-black" />
          </div>
          
        </div>

        {/* Conditions */}
        <div className="mt-6 space-y-4">
          <label className="flex items-center gap-2 text-gray-700">
            <button
              type="button"
              onClick={() => setAcceptTerms(!acceptTerms)}
              className="p-1 rounded-full border-2 border-gray-300"
            >
              {acceptTerms && <CheckCircle className="text-red-500" />}
            </button>
            J'accepte les conditions d'utilisation
          </label>
          <label className="flex items-center gap-2 text-gray-700">
            <button
              type="button"
              onClick={() => setSubscribeNewsletter(!subscribeNewsletter)}
              className="p-1 rounded-full border-2 border-gray-300"
            >
              {subscribeNewsletter && <CheckCircle className="text-red-500" />}
            </button>
            Je souhaite recevoir les actualités par email
          </label>
        </div>

        <p className="text-gray-500 text-sm mt-3">
          Votre compte devra être validé par un administrateur avant de pouvoir accéder à la plateforme.
        </p>

        {/* Bouton S'inscrire */}
        <button className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold mt-4 hover:bg-red-600">
          S'inscrire
        </button>

        <p className="text-center text-gray-600 text-sm mt-4">
          Vous avez déjà un compte ? <a href="#" className="text-blue-500">Se connecter</a>
        </p>
      </div>
    </div>
  );
}
