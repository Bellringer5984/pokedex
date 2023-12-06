import React, { useState } from 'react'
import PokemonDetails from './PokemonDetails'

function PokemonCard({ pokemon }) {
  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(prevShowDetails => !prevShowDetails)
  }

  return (
    <div className='pokemon-card' onClick={toggleDetails}>
      <h2>{pokemon.name}</h2>
      <img src={pokemon.sprites?.front_default} alt={pokemon.name} />
      {showDetails && <PokemonDetails pokemon={ pokemon }/>}
    </div>
  )
}

export default PokemonCard