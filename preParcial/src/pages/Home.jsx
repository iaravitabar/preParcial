import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import '../styles/Home.css';


// Función asíncrona para obtener la lista de juegos desde la API
const getGames = async () => {
    const gamesFetch = await fetch("http://localhost:3000/api/games"); // Hace una solicitud GET para obtener los juegos
    const games = await gamesFetch.json();// Convierte la respuesta a formato JSON
    return games;// Devuelve los datos de los juegos
};

function Home() {
    const [games, setGames] = useState([]); // useState para manejar la lista de juegos, inicialmente vacía
    const [searchTerm, setSearchTerm] = useState('');

    // useEffect para obtener los juegos cuando el componente se monta
    useEffect(() => {
        fetchGames();// Llama a la función fetchGames para obtener los juegos
    }, []);// El array vacío significa que el efecto se ejecuta solo una vez, al montarse el componente

    // Función asíncrona que utiliza getGames para obtener los juegos y actualizar el estado
    const fetchGames = async () => {
        const gamesData = await getGames();// Llama a la función getGames
        setGames(gamesData);// Actualiza el estado con los datos de los juegos
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value); // Actualiza el estado del término de búsqueda cuando el usuario escribe en el input
    };
    const filteredGames = games.filter(game => {
        return game.title.toLowerCase().includes(searchTerm.toLowerCase()); // Filtra si el título del juego incluye el término de búsqueda
    });

    // // Función que será pasada a Card para que cuando se elimine un juego, se actualice la lista
    // const handleGameDeleted = (id) => {
    //     setGames(games.filter(game => game.id !== id));  // Filtra el juego eliminado
    // }; al pedo, ya que se pasa la función de eliminación a Card

    return (
        <div className="home-container">
            <h1>Juegos Olímpicos París 2024</h1>
            <div className="search-container">
                <label htmlFor="search">Buscar por título:</label>
                <input
                    type="text"
                    id="search"
                    placeholder="Buscar juego..."
                    value={searchTerm} // El valor del input es el estado searchTerm
                    onChange={handleSearchChange} // Actualiza el estado al escribir
                />
            </div>

            {/* Lista de juegos filtrados */}
            <div className="game-list">
                {filteredGames.length > 0 ? (
                    filteredGames.map((game) => (
                        <Card
                            key={game.id}
                            id={game.id}
                            title={game.title}
                            onGameDeleted={() => setGames(games.filter(g => g.id !== game.id))} // Pasa la función de manejo de eliminación a Card
                        />
                    ))
                ) : (
                    <p>No se encontraron juegos con ese título</p> // Muestra un mensaje si no hay resultados
                )}
            </div>
            {/* <div className="game-list">
                {games.map((game) => (
                    <Card
                        key={game.id}
                        id={game.id}
                        title={game.title}
                        onGameDeleted={handleGameDeleted}  // Pasa la función de manejo de eliminación a Card
                    />
                ))}
            </div> */}
            <Link to="/add">
                <button className="add-game-btn">Agregar Juego</button>
            </Link>
        </div>
    );
}

export default Home;
