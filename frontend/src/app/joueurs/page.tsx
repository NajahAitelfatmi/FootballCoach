'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Home, Users, UserPlus, Calendar, Trophy, BarChart2, Settings, Archive } from 'lucide-react';
import { FaGlobe, FaEnvelope, FaPhone, FaRunning, FaHashtag,FaRuler ,FaWeight,FaFutbol,FaUserAlt, FaCapsules,FaPlusCircle, FaStar} from 'react-icons/fa'; // <-- Import the icons
import { useEffect } from 'react';
import axios from "axios";
import { useRef } from "react";
import Sidebar from '../Sidebar/page'; // Importez le composant Sidebar

export default function AjouterJoueur() {
  const [loading, setLoading] = useState(false);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [poste, setPoste] = useState("");
  const [numero, setNumero] = useState("");
  const [taille, setTaille] = useState("");
  const [poids, setPoids] = useState("");
  const [piedFort, setPiedFort] = useState("");
  const [allergies, setAllergies] = useState("");
  const [antecedentes, setAntecedentes] = useState("");
  const [contactUrgence, setContactUrgence] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [nationalite, setNationnalite] = useState("");
  const [coachName, setCoachName] = useState("");


  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!nom || !prenom || !dateNaissance || !email || !telephone || !poste || !numero || !taille || !poids || !piedFort || !allergies || !antecedentes || !contactUrgence || !notes || !nationalite) {
      setError("Tous les champs sont requis");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/addPlayer",
        { nom, prenom, dateNaissance, email, telephone, poste, numero, taille, poids, piedFort,  allergies,  antecedentes, contactUrgence, notes, nationalite },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(response.data.message);
      setError("");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erreur inconnue");
      }
      setSuccess("");
    }
  };
  
  const resetForm = () => {
    setNom("");
    setPrenom("");
    setDateNaissance("");
    setEmail("");
    setTelephone("");
    setPoste("");
    setNumero("");
    setTaille("");
    setPoids("");
    setPiedFort("");
    setAllergies("");
    setAntecedentes("");
    setContactUrgence("");
    setNotes("");
    setNationnalite("");
    setError("");
    setSuccess("");
  };
  

  useEffect(() => {
    const storedCoachName = localStorage.getItem("coachName");
    if (storedCoachName) {
      setCoachName(storedCoachName);
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <Sidebar coachName="Coach Martin" />
      </div>

      {/* Main content */}
      <main className="flex-1 p-6 bg-white flex justify-center">
  <div className="max-w-lg ">
    <h1 className="text-2xl font-semibold mb-6 text-left">Ajouter un nouveau joueur</h1>
    <form    className="p-6 rounded-lg space-y-6" onSubmit={handleSubmit} >
      {/* Informations personnelles */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Informations personnelles</h2>
        <div className="grid grid-cols-1 gap-4">
        <div className="flex gap-4"> {/* Add flex here for same-line display */}
          <label className="block w-1/2 ">
          <span className="block mb-2 ">Nom</span>
            <input 
             className="w-full px-3 py-2  rounded-lg bg-gray-100" placeholder='Nom du joueur' value={nom}  onChange={(e) => setNom(e.target.value)}
             />
          </label>
          <label className="block w-1/2">
          <span className="block mb-2">Prénom</span>
            <input className="w-full px-3 py-2  rounded-lg bg-gray-100" placeholder='Prénom du joueur' value={prenom}  onChange={(e) => setPrenom(e.target.value)} />
          </label>
          </div>
          <div className="flex gap-4"> {/* Add flex here for same-line display */}
          <label className="block w-1/2">
          <span className="block mb-2">Date de naissance</span>
            <input  type="date" className="w-full px-3 py-2 rounded-lg bg-gray-100" value={dateNaissance}  onChange={(e) => setDateNaissance(e.target.value)}  />
          </label>
          <label className="block w-1/2 relative">
          <span className="block mb-2">Nationalité</span>
  <div className="relative">
    <input 
      className="w-full  flex-grow pr-10 pl-4 py-2 rounded-lg bg-gray-100 h-12 text-gray-600 placeholder-gray-400"
      placeholder="Nationalité du joueur" 
      value={nationalite}  onChange={(e) => setNationnalite(e.target.value)}
    />
    <FaGlobe 
      size={15} 
      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-800" 
    />
  </div>
</label>




          </div>
          <label className="block relative">
          <span className="block mb-2">Email</span>
  <div className="relative">
    <input
      type="email"
      className="w-full min-w-130 pr-12 pl-4 py-2 rounded-lg bg-gray-100 h-12 text-gray-600 placeholder-gray-400"
      placeholder="email@example.com"
      value={email}  onChange={(e) => setEmail(e.target.value)}
    />
    <FaEnvelope
      size={15}
      className="absolute left-122 top-1/2 transform -translate-y-1/2 text-gray-800"
    />
  </div>
</label>

          <label className="block relative">
    <span className='block mb-2'>Téléphone</span>
    <div className="relative">
    <input
    className="w-full min-w-130 pr-10 pl-4 py-2 rounded-lg bg-gray-100 h-12 text-gray-600 placeholder-gray-400 "
    placeholder="+212 6 XX XX XX XX"
    value={telephone}  onChange={(e) => setTelephone(e.target.value)}
  />
    <FaPhone
      size={15}
      className="absolute left-122 top-1/2 transform -translate-y-1/2 text-gray-800"
    />
                </div>
  </label>

        </div>
      </div>

      {/* Informations sportives */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Informations sportives</h2>
        <div className="grid grid-cols-1 gap-4">
        <div className="flex gap-4"> {/* Add flex here for same-line display */}
        <label className="block w-1/2">
        <span className="block mb-2">Poste</span>
  <div className="relative">
    <input
      className="w-full px-3 py-2 rounded-lg bg-gray-100 pr-10"
      placeholder="Attaquant, Défenseur..."
      value={poste}  onChange={(e) => setPoste(e.target.value)}
    />
    <FaFutbol
      size={15}
      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-800"
    />
  </div>
</label>



          <label className="block w-1/2">
          <span className="block mb-2">Numéro</span>
  <div className="relative">
    <input
      type="number"
      className="w-full px-3 py-2 rounded-lg bg-gray-100 pr-10"
      placeholder="Numéro de maillot"
      value={numero}  onChange={(e) => setNumero(e.target.value)}
    />
    <FaHashtag
      size={15}
      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-800"
    />
  </div>
</label>

          </div>
          <div className="flex gap-4"> {/* Add flex here for same-line display */}
          <label className="block w-1/2">
          <span className="block mb-2">Taille (cm)</span>
  <div className="relative">
    <input
      
      type="number"
      className="w-full px-3 py-2 rounded-lg bg-gray-100 pr-10"
      placeholder="Ex: 180"
      value={taille}  onChange={(e) => setTaille(e.target.value)}
    />
    <FaRuler
      size={15}
      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-800"
    />
  </div>
</label>

<label className="block w-1/2">
<span className="block mb-2">Poids (kg)</span>
  <div className="relative">
    <input
      
      type="number"
      className="w-full px-3 py-2 rounded-lg bg-gray-100 pr-10"
      placeholder="Ex: 75"
      value={poids}  onChange={(e) => setPoids(e.target.value)}
    />
    <FaWeight
      size={15}
      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-800"
    />
  </div>
</label>

          </div>
          <label className="block">
          <span className="block mb-2">Pied fort</span>
  <div className="relative">
    <input
      
      className="w-full min-w-130 pr-10 pl-4 py-2 rounded-lg bg-gray-100 h-12 text-gray-600 placeholder-gray-400 "
      placeholder="Gauche, Droit, Les deux"
      value={piedFort}  onChange={(e) => setPiedFort(e.target.value)}
      
    />
    <FaRunning
      size={15}
      className="absolute left-122 top-1/2 transform -translate-y-1/2 text-gray-800"
    />
  </div>
</label>

        </div>
      </div>

      {/* Informations médicales */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Informations médicales</h2>
        <label className="block mb-4">
        <span className="block mb-2">Allergies</span> {/* Ajout de la marge pour l'espace */}
        <div className="relative">
    <input
      className="w-full min-w-130 px-3 py-2 rounded-lg bg-gray-100 pr-10"
      placeholder="Allergie connues"
      value={allergies}  onChange={(e) => setAllergies(e.target.value)}
      
    />
    <FaPlusCircle
      size={15}
      className="absolute left-122 top-1/2 transform -translate-y-1/2 text-gray-800"
    />
  </div>
</label>
        <label className="block mb-4">
        <span className="block mb-2">Antécédents médicaux</span>
          <textarea  className="w-full min-w-130 px-3 py-2  rounded-lg bg-gray-100 min-h-40 resize-y" placeholder='Blessures précédentes,condition médicales...' 
          value={antecedentes}  onChange={(e) => setAntecedentes(e.target.value)}
/>
        </label>
        <label className="block">
        <span className="block mb-2">Contact d'urgence</span>
  <div className="relative">
    <input
      className="w-full min-w-130 px-3 py-2 rounded-lg bg-gray-100 pr-10"
      placeholder="Nom et numéro de téléphone"
      value={contactUrgence}  onChange={(e) => setContactUrgence(e.target.value)}
      
    />
    <FaStar
      size={15}
      className="absolute left-122 top-1/2 transform -translate-y-1/2 text-gray-800"
    />
  </div>
</label>
      </div>

      {/* Notes additionnelles */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Notes additionnelles</h2>
        <label className="block">
        <span className="block mb-2">Notes</span>
          <textarea  className="w-full min-w-130 px-3 py-2  rounded-lg bg-gray-100 min-h-40 resize-y" placeholder='Informations supplémentaires sur le joueur...' 
          value={notes}  onChange={(e) => setNotes(e.target.value)}
            />
        </label>
      </div>

      {/* Boutons */}
      <div className="flex space-x-4">
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition" disabled={loading}>
          {loading ? 'Enregistrement...' : 'Enregistrer'}
        </button>
        <button type="reset" className="bg-gray-100 text- px-6 py-2 rounded-lg shadow-md hover:bg-gray-100 transition" onClick={resetForm} >Annuler</button>
      </div>
    </form>
    {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
  </div>
</main>

    </div>
  );
}
