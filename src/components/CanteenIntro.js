import React from 'react';

const CanteenIntro = () => {
    return (
        <div className="canteen-intro">
            <h2>DineCampus</h2>
            <p>Discover our canteens and enjoy a variety of dishes daily!</p>
            <img src={`${process.env.PUBLIC_URL}/.png`} alt="logo" />
            <p>Location: Main Campus Center</p>
            <p>Main Dishes: Pasta, Burgers, Vegan Salads</p>
            <p>Operating Hours: 6:30 AM - 8:00 PM</p>
        </div>
    );
};

export default CanteenIntro;
