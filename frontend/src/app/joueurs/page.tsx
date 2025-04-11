'use client';

import { useForm } from 'react-hook-form';
import { useState, useEffect, useRef } from 'react';
import { Home, Users, UserPlus, Calendar, Trophy, BarChart2, Settings, Archive } from 'lucide-react';
import { FaGlobe, FaEnvelope, FaPhone, FaRunning, FaHashtag, FaRuler, FaWeight, FaFutbol, FaUserAlt, FaCapsules, FaPlusCircle, FaStar } from 'react-icons/fa'; // <-- Import the icons
import axios from "axios";
import Sidebar from '../Sidebar/page'; // Importez le composant Sidebar
import defaultImage from '../../../public/images/aucunP.png';

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
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
const [photo, setPhoto] = useState<File | null>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        // Assurez-vous que le fichier est correctement lu
        console.log(result); // Cela devrait afficher la base64 de l'image
        if (typeof result === 'string') {
          setPhotoPreview(result);  // Affichez un aperçu
          setPhoto(file);  // Stockez l'image dans l'état 'photo'
        }
      };
      reader.readAsDataURL(file);  // Convertir l'image en base64
    }
  };
  
  

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    // Vérification des champs obligatoires
    if (!nom || !prenom || !dateNaissance || !email || !telephone || !poste || !numero || !taille || !poids || !piedFort || !allergies || !antecedentes || !contactUrgence || !notes || !nationalite) {
      setError("Tous les champs sont requis");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("nom", nom);
      formData.append("prenom", prenom);
      formData.append("dateNaissance", dateNaissance);
      formData.append("email", email);
      formData.append("telephone", telephone);
      formData.append("poste", poste);
      formData.append("numero", numero);
      formData.append("taille", taille);
      formData.append("poids", poids);
      formData.append("piedFort", piedFort);
      formData.append("allergies", allergies);
      formData.append("antecedentes", antecedentes);
      formData.append("contactUrgence", contactUrgence);
      formData.append("notes", notes);
      formData.append("nationalite", nationalite);

      // Inclure la photo si elle existe
      if (photo) {
        formData.append("photo", photo);  // Assurez-vous que la photo est ajoutée
      }

      const response = await axios.post(
        "http://localhost:5000/addPlayer",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccess(response.data.message);
      setError("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
      }
    }
}

  

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
    setPhotoPreview(null);
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
        <Sidebar />
      </div>

      {/* Main content */}
      <main className="flex-1 p-6 bg-white flex justify-center">
        <div className="max-w-lg">
        <span style={{ fontSize: '0.9rem' }} className='ml-5 mt-8'>Joueurs  &nbsp; {' > '} &nbsp; Ajouter un joueur</span>

           <h1 className="text-2xl font-semibold mt-4 mb-2 text-left ml-5">Ajouter un nouveau joueur</h1>
          <form className="p-6 rounded-lg space-y-6" onSubmit={handleSubmit}>
            {/* Informations personnelles */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Informations personnelles</h2>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex gap-4">
                  <label className="block w-1/2 ">
                    <span className="block mb-2">Nom</span>
                    <input className="w-full px-3 py-2 rounded-lg bg-gray-100" placeholder="Nom du joueur" value={nom} onChange={(e) => setNom(e.target.value)} />
                  </label>
                  <label className="block w-1/2">
                    <span className="block mb-2">Prénom</span>
                    <input className="w-full px-3 py-2 rounded-lg bg-gray-100" placeholder="Prénom du joueur" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
                  </label>
                </div>
                <div className="flex gap-4">
                  <label className="block w-1/2">
                    <span className="block mb-2">Date de naissance</span>
                    <input type="date" className="w-full px-3 py-2 rounded-lg bg-gray-100" value={dateNaissance} onChange={(e) => setDateNaissance(e.target.value)} />
                  </label>
                  <label className="block w-1/2 relative">
                    <span className="block mb-2">Nationalité</span>
                    <div className="relative">
                      <input className="w-full flex-grow pr-10 pl-4 py-2 rounded-lg bg-gray-100 h-12 text-gray-600 placeholder-gray-400" placeholder="Nationalité du joueur" value={nationalite} onChange={(e) => setNationnalite(e.target.value)} />
                      <FaGlobe size={15} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-800" />
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <FaEnvelope size={15} className="absolute left-122 top-1/2 transform -translate-y-1/2 text-gray-800" />
                  </div>
                </label>

                <label className="block relative">
                  <span className="block mb-2">Téléphone</span>
                  <div className="relative">
                    <input
                      className="w-full min-w-130 pr-10 pl-4 py-2 rounded-lg bg-gray-100 h-12 text-gray-600 placeholder-gray-400 "
                      placeholder="+212 6 XX XX XX XX"
                      value={telephone}
                      onChange={(e) => setTelephone(e.target.value)}
                    />
                    <FaPhone size={15} className="absolute left-122 top-1/2 transform -translate-y-1/2 text-gray-800" />
                  </div>
                </label>
              </div>
            </div>
            <div className="mb-6">
  <label className="block mb-2">Photo</label>
  <div className="relative border border-gray-300 rounded-lg shadow-sm overflow-hidden hover:border-black transition duration-300">
    <input
      type="file"
      accept="image/*"
      onChange={handlePhotoChange}
      className="absolute inset-0 w-full min-w-170  opacity-0 cursor-pointer"
    />
    <div className="flex items-center justify-center p-4 bg-gray-50">
      <span className="text-gray-500">Sélectionnez une image</span>
    </div>
  </div>
  {photoPreview && (
    <div className="mt-6 flex justify-center">
      <img
        src={photoPreview}
        alt="Aperçu de la photo"
        className="w-40 h-40 object-cover rounded-xl border border-gray-300 shadow-md"
      />
    </div>
  )}
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
