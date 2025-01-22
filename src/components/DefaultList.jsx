import React from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart, FaInfoCircle } from "react-icons/fa";
import "../App.css";

const DefaultList = ({ films, favoris, toggleFavori }) => {
  // Ajouter un identifiant unique pour les films locaux
  const filmsWithIds = films.map((film, index) => ({
    ...film,
    source: "local",
    id: `manual-${index}`,
  }));

  // Ajouter un marqueur source pour les films de l'API
  const moviesWithSource = films.map((movie) => ({
    ...movie,
    source: "api",
  }));

  // Combinez les films de l'API et les films locaux
  const allMovies = [...moviesWithSource, ...filmsWithIds];

  return (
    <div className="MovieList">
      {allMovies.map((movie) => (
        <div className="movie" key={movie.id}>
          <div className="image-container">
            {movie.image ? (
              <img src={movie.image} alt={movie.titre || movie.title} />
            ) : movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title || movie.titre}
              />
            ) : (
              <p>Aucune image disponible</p>
            )}
          </div>

          <div className="movie-details">
            <h1 className="movie-title">{movie.title || movie.titre}</h1>
            <p className="movie-overview">{movie.overview || movie.description}</p>
            <p className="movie-release-date">
              Release Date: {movie.release_date || movie.dateSortie}
            </p>
            <p className="movie-rating">Rating: {movie.vote_average || "Non disponible"}</p>

            {/* Lien vers les détails du film avec ID */}
            <Link to={`/film/${movie.id}`} className="movie-link">
              Détails
            </Link>

            {/* Bouton favori */}
            <button
  onClick={() => toggleFavori(movie)}
  className={`favori-btn ${favoris.some((favFilm) => favFilm.id === movie.id) ? "favori-active" : ""}`}
>
  {favoris.some((favFilm) => favFilm.id === movie.id) ? <FaHeart /> : <FaRegHeart />}
</button>

          </div>
        </div>
      ))}
    </div>
  );
};

export default DefaultList;
