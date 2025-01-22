import React from "react";
import { useParams } from "react-router-dom";
import "../App.css";

const FilmDetails = ({ films }) => {
  const { id } = useParams(); // Récupérer l'ID depuis l'URL

  // Rechercher dans les films locaux
  const filmLocal = films.find((movie) => `manual-${films.indexOf(movie)}` === id);

  // Rechercher dans les films de l'API
  const filmApi = films.find((movie) => movie.id?.toString() === id);

  // Choisir le film trouvé
  const film = filmLocal || filmApi;

  if (!film) {
    return <h2>Film non trouvé</h2>;
  }

  return (
    <div className="FilmDetails">
      <div className="image-container">
        {film.image ? (
          <img src={film.image} alt={film.titre || film.title} />
        ) : film.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
            alt={film.title || film.titre}
          />
        ) : (
          <p>Aucune image disponible</p>
        )}
      </div>

      <div className="details-container">
        <h1>{film.title || film.titre}</h1>
        <p><strong>Description:</strong> {film.overview || film.description}</p>
        <p><strong>Date de sortie:</strong> {film.release_date || film.dateSortie}</p>
        <p><strong>Note:</strong> {film.vote_average || "Non disponible"}</p>
      </div>
    </div>
  );
};

export default FilmDetails;
