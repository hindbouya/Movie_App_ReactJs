import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AjouterFilm.css";

const AjouterFilm = ({ ajouterFilm, localFilms }) => {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [dateSortie, setDateSortie] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // La chaîne Base64
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!titre || !description || !image) {
      setError("Le titre, la description et l'image sont obligatoires.");
      return;
    }

    // Utilise localFilms ici
    const newFilm = {
      id: localFilms.length + 1,  // Utilise localFilms pour l'ID
      titre,
      description,
      dateSortie,
      image, // Ajoute l'image convertie en Base64
    };

    ajouterFilm(newFilm);

    setTitre("");
    setDescription("");
    setDateSortie("");
    setImage(null);
    setError("");

    navigate("/"); // Redirige après l'ajout
  };

  return (
    <div className="ajouter-film">
      <h1>Ajouter un nouveau film</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="titre">Titre :</label>
          <input
            type="text"
            id="titre"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description :</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="dateSortie">Date de sortie :</label>
          <input
            type="date"
            id="dateSortie"
            value={dateSortie}
            onChange={(e) => setDateSortie(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image :</label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
          />
        </div>

        <button type="submit">Ajouter le film</button>
      </form>
    </div>
  );
};

export default AjouterFilm;



