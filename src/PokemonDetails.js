import React from 'react'
import PokemonStats from './PokemonStats'

const PokemonDetails = ({ pokemon }) => {
  return (
    <div className='pokemon-details'>
        <h3>{pokemon.types.map(t => <span key={t.slot}>{t.type.name}</span>)}</h3>
        <PokemonStats stats={pokemon.stats} />
    </div>
  )
}

export default PokemonDetails