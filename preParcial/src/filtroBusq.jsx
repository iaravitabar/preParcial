import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import '../styles/Home.css';

// Función para obtener los juegos desde la API
const getGames = async () => {
    const gamesFetch = await fetch("http://localhost:3000/api/games");
    const games = await gamesFetch.json();
    return games;
};

// Componente funcional Home con funcionalidad de búsqueda
function Home() {
    const [games, setGames] = useState([]); // Estado para la lista de juegos
    const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda

    useEffect(() => {
        fetchGames();
    }, []);

    // Función para obtener los juegos y actualizar el estado
    const fetchGames = async () => {
        const gamesData = await getGames();
        setGames(gamesData);
    };

    // Función para manejar el cambio en el término de búsqueda
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value); // Actualiza el estado del término de búsqueda cuando el usuario escribe en el input
    };

    // Filtra los juegos según el término de búsqueda (por título)
    const filteredGames = games.filter(game => {
        return game.title.toLowerCase().includes(searchTerm.toLowerCase()); // Filtra si el título del juego incluye el término de búsqueda
    });

    return (
        <div className="home-container">
            <h1>Juegos Olímpicos París 2024</h1>

            {/* Campo de búsqueda */}
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

            {/* Botón para agregar un nuevo juego */}
            <Link to="/add">
                <button className="add-game-btn">Agregar Juego</button>
            </Link>
        </div>
    );
}

export default Home;



// // Filtra los juegos según el número de jugadores, si se ha seleccionado un filtro
// const filteredGames = games.filter(game => {
//     if (filterPlayers === '') {
//         return true; // Si no se ha seleccionado un filtro, muestra todos los juegos
//     }
//     return game.players === filterPlayers; // Si se selecciona un filtro, solo muestra los juegos que coincidan
// });

// return (
//     <div className="home-container">
//         <h1>Juegos Olímpicos París 2024</h1>

//         {/* Sección para seleccionar el filtro */}
//         <div className="filter-container">
//             <label htmlFor="filterPlayers">Filtrar por cantidad de jugadores:</label>
//             <select id="filterPlayers" value={filterPlayers} onChange={handleFilterChange}>
//                 <option value="">Todos</option> {/* Opción sin filtro */}
//                 <option value="1">1 jugador</option>
//                 <option value="2">2 jugadores</option>
//                 <option value="4">4 jugadores</option>
//                 <option value="8">8 jugadores</option>
//             </select>
//         </div>

//         {/* Lista de juegos filtrados */}
//         <div className="game-list">
//             {filteredGames.map((game) => (
//                 <Card
//                     key={game.id}
//                     id={game.id}
//                     title={game.title}
//                     onGameDeleted={handleGameDeleted}  // Pasa la función de manejo de eliminación a Card
//                 />
//             ))}
//         </div>

//         {/* Botón para agregar un nuevo juego */}
//         <Link to="/add">
//             <button className="add-game-btn">Agregar Juego</button>
//         </Link>
//     </div>
// );
// }

// export default Home;