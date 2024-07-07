import React from 'react';

const DailyMenu = ({ date, menuItems }) => {
    return (
        <div className="daily-menu">
            <h3>Menu for {date}</h3>
            <ul>
                {menuItems.map(item => (
                    <li key={item.id}>
                        <img src={item.image} alt={item.name} style={{width: '100px', height: '100px'}} />
                        <p>{item.name} - ${item.price}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DailyMenu;
