import React from "react";
import "./Favoris.css";
const Favoris = ({ favoris }) => {
  return (
    <div>
      <h1>Mes Favoris</h1>
      {favoris.length > 0 ? (
        <div className="favoris-list">
          {favoris.map((film, index) => (
            <div key={index} className="favori-item">
              <div className="image-container">
                {film.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                    alt={film.title || film.titre}
                  />
                ) : (
                  <p>Aucune image disponible</p>
                )}
              </div>
              <div className="movie-details">
                <h3>{film.title || film.titre}</h3>
                <p>{film.overview || film.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Aucun film dans les favoris.</p>
      )}
    </div>
  );
};

export default Favoris;
