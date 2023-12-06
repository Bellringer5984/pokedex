import React from 'react';
import StatItem from './StatItem';

const PokemonStats = ({ stats }) => {

    const getStatColor = (statName) => {
        const statColors = {
            hp: '#FF5959', // Red
            attack: '#F5AC78', // Orange
            defense: '#FAE078', // Yellow
            'special-attack': '#9DB7F5', // Light Blue
            'special-defense': '#A7DB8D', // Green
            speed: '#FA92B2' // Pink
        };

        return statColors[statName] || '#68A090'; // Default color if no match
    };

    return (
        <div className="pokemon-stats">
            <h4>Stats:</h4>
            {stats.map((stat, index) => (
                <StatItem 
                    key={index}
                    statName={stat.stat.name} 
                    statValue={stat.base_stat} 
                    statColor={getStatColor(stat.stat.name)}
                />
            ))}
        </div>
    );
};

export default PokemonStats;
