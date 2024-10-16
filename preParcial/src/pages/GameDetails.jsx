import React, {useState, useEffect} from "react";
import {useParams, Link} from 'react-router-dom';
import '../styles/GameDetails.css';


// Función para obtener un juego por su ID desde la API
const getGameByID = async (id) => {
    const gameFetch = await fetch(`http://localhost:3000/api/games/${id}`); // Realiza una solicitud a la API para obtener los detalles del juego por ID
    const game = await gameFetch.json()// Convierte la respuesta a JSON
    return game;// Devuelve los datos del juego
};


// Componente funcional para mostrar los detalles del juego
function GameDetails(){
    const {id} = useParams(); // Obtiene el parámetro "id" de la URL utilizando el hook useParams
    const [game, setGame] = useState(null); // Hook useState para almacenar el juego, inicialmente es null hasta que se cargue

    // useEffect para obtener los detalles del juego cuando el componente se monta o cuando cambia el id
    useEffect(() => {
        getGameByID(id).then((game) => setGame(game[0]));// Llama a la función getGameByID y guarda el primer elemento de la respuesta en el estado
    }, [id]);// La dependencia es el id, por lo que el efecto se ejecutará cuando el id cambie

    // Si no hay un juego, muestra un mensaje de carga
    if (!game) {
        return <p>Cargando...</p>;
    }


    return (
        <div className="details-container">
            <Link to="/">
            <button className="btn-atras">Atrás</button>
            </Link>
            <h2>{game.title}</h2>
            <p>{game.description}</p>
            <p>Cantidad de Jugadores: {game.players}</p>
            <p>Categorias: {game.categories}</p>
        </div>
    );
}

export default GameDetails;