import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import '../styles/Home.css';

const getGames = async () => {
    const gamesFetch = await fetch("http://localhost:3000/api/games");
    const games = await gamesFetch.json();
    return games;
};

function Home() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        fetchGames();
    }, []);

    const fetchGames = async () => {
        const gamesData = await getGames();
        setGames(gamesData);
    };

    // Función que será pasada a Card para que cuando se elimine un juego, se actualice la lista
    const handleGameDeleted = (id) => {
        setGames(games.filter(game => game.id !== id));  // Filtra el juego eliminado
    };

    return (
        <div className="home-container">
            <h1>Juegos Olímpicos París 2024</h1>
            <div className="game-list">
                {games.map((game) => (
                    <Card
                        key={game.id}
                        id={game.id}
                        title={game.title}
                        onGameDeleted={handleGameDeleted}  // Pasa la función de manejo de eliminación a Card
                    />
                ))}
            </div>
            <Link to="/add">
                <button className="add-game-btn">Agregar Juego</button>
            </Link>
        </div>
    );
}

export default Home;
