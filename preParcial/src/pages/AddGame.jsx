import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/AddGame.css';

function AddGame() {

    // Hook useState para manejar el estado del nuevo juego. Inicializa con campos vacíos
    const [game, setGame] = useState({
        title: '',
        description: '',
        players: '',
        categories: '',
    });

    // Hook useNavigate para navegar a otra ruta después de que se haya agregado el juego
    const navigate = useNavigate();

    // Manejar los cambios en los campos del formulario
    // Función para manejar los cambios en los inputs del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;// Extrae el nombre y el valor del input
        setGame({
            ...game,// Copia el estado actual del juego
            [name]: value // Actualiza el campo correspondiente con el nuevo valor
        });
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();  // Previene el comportamiento predeterminado del formulario (evita el refresh de la página)
        try {
            // Envía una solicitud POST para agregar un nuevo juego
            const response = await fetch('http://localhost:3000/api/games', {
                method: 'POST', // Método POST para enviar los datos 
                headers: {
                    'Content-Type': 'application/json', // Especifica que se enviarán datos JSON
                },
                body: JSON.stringify(game),  // Envía los datos del nuevo juego en formato JSON
            });

            if (response.ok) {
                // Si la respuesta es exitosa, redirige a la página principal
                navigate('/');
            } else {
                // Muestra un mensaje de error si algo sale mal
                console.error('Error al agregar el juego', response.statusText);
            }
        } catch (error) {
            // Captura cualquier error en la solicitud y lo muestra en la consola
            console.error('Error al agregar el juego:', error);
        }
    };

    return (
        <div className="add-game-container">
            <h2>Agregar Nuevo Deporte</h2>
            <form onSubmit={handleSubmit}>
                <input
                    name="title"
                    placeholder="Nombre"
                    value={game.title}
                    onChange={handleChange}
                />
                <input
                    name="description"
                    placeholder="Descripción"
                    value={game.description}
                    onChange={handleChange}
                />
                <input
                    name="players"
                    placeholder="Cantidad de Jugadores"
                    value={game.players}
                    onChange={handleChange}
                />
                <input
                    name="categories"
                    placeholder="Categorías"
                    value={game.categories}
                    onChange={handleChange}
                />
                <button className="btn-add" type="submit">Agregar</button>
            </form>
        </div>
    );
}

export default AddGame;
