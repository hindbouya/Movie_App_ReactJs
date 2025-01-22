import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import DefaultList from "./components/DefaultList";
import AjouterFilm from "./pages/AjouterFilm";
import FilmDetails from "./pages/FilmDetails";
import Recherche from "./pages/Recherche";
import Favoris from "./pages/Favoris";

function App() {
  // État pour les films stockés localement
  const [localFilms, setLocalFilms] = useState(() => {
    const savedFilms = localStorage.getItem("films");
    return savedFilms ? JSON.parse(savedFilms) : [];
  });

  // État pour les films provenant de l'API
  const [apiMovies, setApiMovies] = useState([]);

  // Charger les films depuis l'API au montage du composant
  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/discover/movie?api_key=f43ec82a5f24fe6190891894b7436c7a",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setApiMovies(data.results);
        } else {
          console.error("Erreur lors du chargement des films depuis l'API.");
        }
      } catch (error) {
        console.error("Erreur réseau : ", error);
      }
    }

    fetchMovies();
  }, []);

  // Fonction pour ajouter un film à localStorage
  const ajouterFilm = (film) => {
    const updatedFilms = [...localFilms, film];
    setLocalFilms(updatedFilms);

    // Mettre à jour localStorage
    localStorage.setItem("films", JSON.stringify(updatedFilms));
  };

  // Combinez les deux sources
  const allMovies = [...apiMovies, ...localFilms];


  const [favoris, setFavoris] = useState(() => {
  const savedFavoris = localStorage.getItem("favoris");
  return savedFavoris ? JSON.parse(savedFavoris) : [];
});


  const toggleFavori = (movie) => {
    let updatedFavoris;
    if (favoris.some((favFilm) => favFilm.id === movie.id)) {
      updatedFavoris = favoris.filter((favFilm) => favFilm.id !== movie.id);
    } else {
      updatedFavoris = [...favoris, movie];
    }
    setFavoris(updatedFavoris);
    localStorage.setItem("favoris", JSON.stringify(updatedFavoris));
  };
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<DefaultList films={allMovies}  favoris={favoris} toggleFavori={toggleFavori} />} />
          <Route
  exact
  path="/ajouter"
  element={<AjouterFilm ajouterFilm={ajouterFilm} localFilms={localFilms} />}
/>

          <Route path="/film/:id" element={<FilmDetails films={allMovies} />} />

          <Route path="/recherche" element={<Recherche films={allMovies} />}/>

          <Route path="/favoris" element={<Favoris favoris={favoris}/>}/>
        </Routes>

      </div>
    </Router>
  );
}

export default App;
