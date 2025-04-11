'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { FaFutbol, FaRuler, FaCogs } from 'react-icons/fa';
import Sidebar from '../Sidebar/page';
import defaultImage from '../../../public/images/aucunP.png';
import { useRouter } from "next/navigation";

export default function CreeExercice() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const router = useRouter();
  
    const handleRedirect = () => {
      router.push('/ShemaEn');
    };

  function handleFileChange(event: ChangeEvent<HTMLInputElement>): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <Sidebar />
      </div>

      {/* Main content */}
      <main className="flex-1 p-6 bg-white flex justify-center">
        <div className="max-w-lg">
          

          <h1 className="text-2xl font-semibold mt-4 mb-2 text-left ml-5">Ajouter un exercice</h1>

          <form className="p-6 rounded-lg space-y-6">
            {/* Informations de l'exercice */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Informations de l'exercice</h2>

              {/* Nom de l'exercice */}
              <label className="block relative">
                <span className="block mb-2">Nom de l'exercice</span>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full min-w-130 pr-12 pl-4 py-2 rounded-lg bg-gray-100 h-12 text-gray-600 placeholder-gray-400"
                    placeholder="Ex: Passe en triangle, Tirs au but..."
                  />
                  <FaFutbol size={15} className="absolute left-122 top-1/2 transform -translate-y-1/2 text-gray-800" />
                </div>
              </label>

              {/* Catégorie et Durée */}
              <div className="flex gap-4">
                                <label className="block w-1/2">
                                  <span className="block mb-2">Durée (minutes)</span>
                                  <input type="number" className="w-full px-3 py-2 rounded-lg bg-gray-100" placeholder='Ex:90' />
                                </label>
                                <label className="block w-1/2 relative">
                                  <span className="block mb-2">Catégorie</span>
                                  <div className="relative">
                                    <input className="w-full flex-grow pr-10 pl-4 py-2 rounded-lg bg-gray-100 h-12 text-gray-600 placeholder-gray-400" placeholder="Technique, Tactique, Physique..." />
                                  </div>
                                </label>
                              </div>

              {/* Objectifs */}
              <label className="block mb-4 mt-4">
                <span className="block mb-2">Objectifs</span>
                <textarea
                  className="w-full min-w-130 px-3 py-2 rounded-lg bg-gray-100 min-h-40 resize-y"
                  placeholder="Décrivez les objectifs principaux de cet exercice..."
                />
              </label>
            </div>

            {/* Configuration */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Configuration</h2>

              {/* Nombre de joueurs */}
              <label className="block mb-4">
                <span className="block mb-2">Nombre de joueurs</span>
                <input
                    className="w-full px-3 py-2 rounded-lg bg-gray-100"
                    placeholder="Ex: 15"
                    type="number"
                  />
              </label>

              {/* Matériel nécessaire */}
              <label className="block mb-4">
                <span className="block mb-2">Matériel nécessaire</span>
                <input
                    className="w-full px-3 py-2 rounded-lg bg-gray-100"
                    placeholder="Ex: 15"
                    type="number"
                  />
              </label>

              {/* Espace requis */}
              <label className="block mb-4">
                <span className="block mb-2">Espace requis</span>
                <input
                    className="w-full px-3 py-2 rounded-lg bg-gray-100"
                    placeholder="Ex: 15"
                    type="number"
                  />
              </label>
            </div>

            {/* Instructions */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Instructions</h2>
              <label className="block mb-4">
                <span className="block mb-2">Description détaillée</span>
                <textarea
                  className="w-full px-3 py-2 rounded-lg bg-gray-100 min-h-40 resize-y"
                  placeholder="Expliquez le deroulement de l'exercice, les consignes , les varaintes..."
                />
              </label>
            </div>

           {/* Schéma tactique */}
<div className="flex items-center space-x-4">
  <div>
    <h2 className="text-lg font-semibold mb-4">Schéma tactique (optionnel)</h2>
    <button
      type="button"
      className="bg-gray-100 px-6 py-2 rounded-lg shadow-md hover:bg-gray-200 transition"
      disabled={loading}
      onClick={handleRedirect}
    >
      {loading ? 'Enregistrement...' : 'Ajouter un schéma'}
    </button>

    <input
      type="file"
      id="file-upload"
      className="hidden" // Masquer le bouton par défaut
      onChange={handleFileChange} // La fonction de gestion de fichier
    />
    <label
      htmlFor="file-upload"
      className="bg-gray-100 px-6 py-2 rounded-lg shadow-md hover:bg-gray-200 transition "
    >
      Télécharger un fichier
    </label>
  </div>
</div>

            {/* Boutons */}
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
                disabled={loading}
              >
                {loading ? 'Enregistrement...' : 'Enregistrer'}
              </button>
              <button
                type="reset"
                className="bg-gray-100 px-6 py-2 rounded-lg shadow-md hover:bg-gray-200 transition"
              >
                Annuler
              </button>
            </div>
          </form>

          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
      </main>
    </div>
  );
}
