import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/AddGame.css';

function AddGame() {
    const [game, setGame] = useState({
        title: '',
        description: '',
        players: '',
        categories: '',
    });

    const navigate = useNavigate();

    // Manejar los cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setGame({
            ...game,
            [name]: value
        });
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();  // Previene el comportamiento predeterminado del formulario
        try {
            const response = await fetch('http://localhost:3000/api/games', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(game),  // Envía los datos del nuevo juego en formato JSON
            });

            if (response.ok) {
                // Si la respuesta es correcta, redirigir a la página principal
                navigate('/');
            } else {
                console.error('Error al agregar el juego', response.statusText);
            }
        } catch (error) {
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
