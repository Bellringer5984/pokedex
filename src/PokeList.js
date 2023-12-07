import React, { useState, useEffect, useRef, useCallback } from "react";
import Header from "./Header";
import PokemonCard from "./PokemonCard";

function PokeList() {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);

  const initialLoadComplete = useRef(false);
  const limit = 20;

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
    // Separate function to fetch Pokémon details
    const fetchPokemonDetails = async (url) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    };
  
    // Function to fetch Pokémon list and details
    const fetchPokemons = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const detailedPokemons = await Promise.all(data.results.map(pokemon => fetchPokemonDetails(pokemon.url)));
        
        setPokemons(prevPokemons => [...prevPokemons, ...detailedPokemons]);
        setFilteredPokemons(prevFiltered => [...prevFiltered, ...detailedPokemons]);
      } catch (error) {
        console.error("Error fetching Pokémons:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if(!initialLoadComplete.current || offset > 0) {
      fetchPokemons()
      initialLoadComplete.current = true;
    }  
  }, [offset, limit]);

 
  
  

  useEffect(() => {
    let debounceTimer;
  
    const handleScroll = () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        const nearBottom = window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100;
        if (nearBottom) {
          setOffset(prevOffset => prevOffset + limit);
        }
      }, 100);
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(debounceTimer);
    };
  }, [limit]); // Dependencies for scroll event

  

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
          <li key={pokemon.name}>
            <PokemonCard pokemon={pokemon} />
          </li>
        ))}
      {loading && <li><p>Loading more Pokemon...</p></li>}
      </ul>
    </div>
  );
}

export default PokeList;
