import React, { useState, useEffect } from "react";
import Header from "./Header";
import PokemonCard from "./PokemonCard";

function PokeList() {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPokemonDetails = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching details:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was no ok");
        }
        return response.json();
      })
      .then(async (data) => {
        const detailedPokemons = await Promise.all(
          data.results.map(async (pokemon) => {
            const details = await fetchPokemonDetails(pokemon.url);
            return details;
          })
        );
        setPokemons(detailedPokemons);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredPokemons(pokemons);
      return;
    }
    const filtered = pokemons.filter(
      (pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pokemon.types.some((type) =>
          type.type.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
    setFilteredPokemons(filtered);
  };

  return (
    <div className="main">
      <Header onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul className="pokemon-list">
        {filteredPokemons.map((pokemon, index) => (
          <li key={index}>
            <PokemonCard pokemon={pokemon} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PokeList;
