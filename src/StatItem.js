import React from 'react';

const StatItem = ({ statName, statValue, statColor }) => {
    return (
        <div className="stat-item">
            <div className='stat-label-container'>
                <span className="stat-label">{statName}</span>
            </div>
            <div className="stat-bar-container">
                <div className="stat-bar" style={{ width: `${statValue}%`, backgroundColor: statColor }}></div>
            </div>
            <span className="stat-value">{statValue}</span>
        </div>
    );
};

export default StatItem;
