import React from "react";
import { Link } from 'react-router-dom';
import './Card.css';

function Card({ id, title, onGameDeleted }) {  // Recibe la prop `onGameDeleted` para notificar al componente Home

    const deleteGame = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/games/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Si la eliminación fue exitosa, llama a `onGameDeleted` para notificar a Home
                onGameDeleted(id);
            } else {
                console.error('Error al eliminar el juego', response.statusText);
            }
        } catch (error) {
            console.error('Error al eliminar el juego:', error);
        }
    };

    return (
        <div className="card">
            <h2>{title}</h2>
            <Link to={`/game/${id}`}>
                <button className="details-btn">Detalles</button>
            </Link>
            <button className="delete-btn" onClick={deleteGame}>Borrar</button> {/* Llama a deleteGame */}
        </div>
    );
}

export default Card;
