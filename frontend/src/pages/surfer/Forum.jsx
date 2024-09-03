import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Forum.css';

const Forum = () => {
    const { surf_spot_id } = useParams();
    const [forum, setForum] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [lastMessageId, setLastMessageId] = useState(null);
    const token = localStorage.getItem('accessToken');
    const currentUserId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchForumDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/forums/${surf_spot_id}/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setForum(response.data.forum);
                setMessages(response.data.messages);
                if (response.data.messages.length > 0) {
                    setLastMessageId(response.data.messages[response.data.messages.length - 1].id);
                }
            } catch (error) {
                console.error('Failed to fetch forum details', error);
            }
        };

        fetchForumDetails();
    }, [surf_spot_id, token]);

    useEffect(() => {
        const interval = setInterval(() => {
            fetchNewMessages();
        }, 3000); // Interroger le serveur toutes les 3 secondes

        return () => clearInterval(interval);
    }, [lastMessageId]);

    const fetchNewMessages = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/forums/${surf_spot_id}/messages/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    last_message_id: lastMessageId,
                },
            });
            if (response.data.messages.length > 0) {
                setMessages(prevMessages => [...prevMessages, ...response.data.messages]);
                setLastMessageId(response.data.messages[response.data.messages.length - 1].id);
            }
        } catch (error) {
            console.error('Failed to fetch new messages', error);
        }
    };

    const handleMessageChange = (e) => {
        setNewMessage(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                `http://127.0.0.1:8000/api/forums/${forum.id}/messages/create/`,
                {
                    content: newMessage,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setNewMessage('');
            fetchNewMessages(); // Récupère immédiatement les nouveaux messages après l'envoi
        } catch (error) {
            console.error('Failed to send message', error);
        }
    };

    return (
        <div className="forum-page">
            <h1>{forum ? forum.surf_spot.name : 'Loading...'}</h1>
            <div className="messages">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`message ${
                            message.sender.id === currentUserId ? 'message-sent' : 'message-received'
                        }`}
                    >
                        <div className="message-avatar">
                            {message.sender && message.sender.firstname ? message.sender.firstname[0] : '?'}
                        </div>
                        <div className="message-content">
                            <p>{message.content}</p>
                            <span className="message-timestamp">
                                {message.timestamp ? new Date(message.timestamp).toLocaleTimeString() : ''}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="message-form">
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
