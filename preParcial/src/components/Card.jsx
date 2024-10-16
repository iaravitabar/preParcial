import React from "react";
import { Link } from 'react-router-dom';
import './Card.css';


// Componente funcional que recibe tres props: id, title y onGameDeleted
function Card({ id, title, onGameDeleted }) {  // Recibe la prop `onGameDeleted` para notificar al componente Home que se eliminó un juego
// Función asíncrona para eliminar un juego, se ejecuta al hacer clic en el botón "Borrar"

    const deleteGame = async () => {
        try {
            // Enviar una solicitud DELETE a la API para eliminar el juego por su ID
            const response = await fetch(`http://localhost:3000/api/games/${id}`, {
                method: 'DELETE',// Método HTTP DELETE para eliminar
            });

            // Verifica si la respuesta es exitosa
            // Llama a la función `onGameDeleted` para notificar al componente padre que el juego fue eliminado
            if (response.ok) {
                // Si la eliminación fue exitosa, llama a `onGameDeleted` para notificar a Home
                onGameDeleted(id);
            } else {
                // Si la respuesta no es exitosa, muestra el mensaje de error en la consola
                console.error('Error al eliminar el juego', response.statusText);
            }
        } catch (error) {
            // Captura y muestra cualquier error ocurrido durante la solicitud
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
