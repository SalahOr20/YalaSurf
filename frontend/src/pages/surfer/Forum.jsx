import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Forum = () => {
    const { surf_spot_id } = useParams();
    const [forum, setForum] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [socket, setSocket] = useState(null);

    // Récupérer le token depuis le stockage local
    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        // Fonction pour récupérer les détails du forum
        const fetchForumDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/forums/${surf_spot_id}/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setForum(response.data.forum);
                setMessages(response.data.messages);
            } catch (error) {
                console.error("Failed to fetch forum details", error);
            }
        };

        fetchForumDetails();
    }, [surf_spot_id, token]);

    useEffect(() => {
        if (!surf_spot_id) return;

        // Configurer la connexion WebSocket
        const ws = new WebSocket(`ws://127.0.0.1:8000/ws/forum/${surf_spot_id}/`);

        ws.onopen = () => {
            // Envoyer le token après l'ouverture de la connexion WebSocket si le serveur le supporte
            ws.send(JSON.stringify({ type: 'authenticate', token }));
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, data]);
        };

        ws.onclose = () => {
            console.log('WebSocket closed');
        };

        setSocket(ws);

        return () => {
            ws.close();
        };
    }, [surf_spot_id, token]);

    const handleMessageChange = (e) => {
        setNewMessage(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://127.0.0.1:8000/api/forums/${forum.id}/messages/create/`, {
                content: newMessage
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setNewMessage('');
            // Re-fetch messages after sending a new one
            const response = await axios.get(`http://127.0.0.1:8000/api/forums/${surf_spot_id}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setMessages(response.data.messages);
        } catch (error) {
            console.error("Failed to send message", error);
        }
    };

    return (
        <div className="forum-page">
            <h1>Forum: {forum ? forum.surf_spot.name : 'Loading...'}</h1>
            <div className="messages">
                {messages.map((message) => (
                    <div key={message.id} className="message">
                        <p><strong>{message.sender.firstname}:</strong> {message.content}</p>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={newMessage}
                    onChange={handleMessageChange}
                    placeholder="Écrivez un message..."
                    required
                />
                <button type="submit">Envoyer</button>
            </form>
        </div>
    );
};

export default Forum;
