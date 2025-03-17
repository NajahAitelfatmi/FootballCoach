'use client';

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const AddPlayer = () => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [equipe, setEquipe] = useState("");
  const [categorie, setCategorie] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!nom || !prenom || !dateNaissance || !equipe || !categorie) {
      setError("Tous les champs sont requis");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/addPlayer",
        { nom, prenom, dateNaissance, equipe, categorie },
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

  return (
    <div>
      <h1>Ajouter un joueur</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nom">Nom</label>
          <input
            type="text"
            id="nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            style={{ display: "block", marginBottom: "10px" }}  // Ajout d'un style pour la mise en forme
          />
        </div>

        <div>
          <label htmlFor="prenom">Prénom</label>
          <input
            type="text"
            id="prenom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            style={{ display: "block", marginBottom: "10px" }}  // Ajout d'un style pour la mise en forme
          />
        </div>

        <div>
          <label htmlFor="dateNaissance">Date de naissance</label>
          <input
            type="date"
            id="dateNaissance"
            value={dateNaissance}
            onChange={(e) => setDateNaissance(e.target.value)}
            style={{ display: "block", marginBottom: "10px" }}  // Ajout d'un style pour la mise en forme
          />
        </div>

        <div>
          <label htmlFor="equipe">Équipe</label>
          <input
            type="text"
            id="equipe"
            value={equipe}
            onChange={(e) => setEquipe(e.target.value)}
            style={{ display: "block", marginBottom: "10px" }}  // Ajout d'un style pour la mise en forme
          />
        </div>

        <div>
          <label htmlFor="categorie">Catégorie</label>
          <input
            type="text"
            id="categorie"
            value={categorie}
            onChange={(e) => setCategorie(e.target.value)}
            style={{ display: "block", marginBottom: "10px" }}  // Ajout d'un style pour la mise en forme
          />
        </div>

        <button type="submit">Ajouter le joueur</button>
      </form>
    </div>
  );
};

export default AddPlayer;
