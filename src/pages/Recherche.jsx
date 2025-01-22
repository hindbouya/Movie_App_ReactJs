import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Recherche.css";

const Recherche = ({ films }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFilms, setFilteredFilms] = useState(films);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filtered = films.filter((film) => {
      const title = film.title || film.titre || "";
      const description = film.description || film.overview || "";
      return (
        title.toLowerCase().includes(query.toLowerCase()) ||
        description.toLowerCase().includes(query.toLowerCase())
      );
    });
    setFilteredFilms(filtered);
  };

  return (
    <div className="Recherche">
      <h1>Trouvez Votre Film Préféré</h1>

      <input
        type="text"
        placeholder="Rechercher un film..."
        value={searchQuery}
        onChange={handleSearch}
      />

      {filteredFilms.length === 0 ? (
        <p>Aucun film trouvé.</p>
      ) : (
        <div className="MovieList">
          {filteredFilms.map((film, index) => (
            <div className="movie" key={film.id || index}>
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

              <div className="movie-details">
                <h2 className="movie-title">{film.title || film.titre}</h2>
                <p className="movie-overview">
                  {film.overview || film.description}
                </p>
                <p className="movie-release-date">
                  Release Date: {film.release_date || film.dateSortie}
                </p>
                <p className="movie-rating">
                  Rating: {film.vote_average || "Non disponible"}
                </p>

                <Link to={`/film/${film.id || index}`} className="movie-link">
                  Détails
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recherche;