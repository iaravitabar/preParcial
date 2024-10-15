import React, {useState, useEffect} from "react";
import {useParams, Link} from 'react-router-dom';
import '../styles/GameDetails.css';

const getGameByID = async (id) => {
    const gameFetch = await fetch(`http://localhost:3000/api/games/${id}`);
    const game = await gameFetch.json()
    return game;
};

function GameDetails(){
    const {id} = useParams();
    const [game, setGame] = useState(null);

    useEffect(() => {
        getGameByID(id).then((game) => setGame(game[0])); 
    }, [id]);

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