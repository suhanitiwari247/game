import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, User, Bot } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi there! I'm your Arcade Assistant. How can I help you today?", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const { wallet, user } = useAppContext();
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        // Simple AI Logic
        setTimeout(() => {
            let botResponse = "I'm not sure about that. Try asking about your balance or games!";
            const query = input.toLowerCase();

            if (query.includes('balance') || query.includes('wallet') || query.includes('money')) {
                botResponse = `You currently have ${wallet.balance} coins. Play more to earn more!`;
            } else if (query.includes('game') || query.includes('play')) {
                botResponse = "We have several fun games like Snake, Tic-Tac-Toe, and Ludo. Check the Games tab!";
            } else if (query.includes('help')) {
                botResponse = "I can tell you about your wallet, available games, or how to earn achievements!";
            } else if (query.includes('hello') || query.includes('hi')) {
                botResponse = `Hello ${user.name}! Ready to play?`;
            }

            setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, sender: 'bot' }]);
        }, 1000);
    };

    return (
        <>
            {/* Floating Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    position: 'fixed',
                    bottom: '24px',
                    right: '24px',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'var(--accent)',
                    color: 'white',
                    boxShadow: 'var(--shadow-lg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    border: 'none',
                    cursor: 'pointer'
                }}
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        style={{
                            position: 'fixed',
                            bottom: '100px',
                            right: '24px',
                            width: '350px',
                            maxHeight: '500px',
                            background: 'var(--card-bg)',
                            borderRadius: 'var(--radius-lg)',
                            boxShadow: 'var(--shadow-lg)',
                            border: '1px solid var(--border)',
                            display: 'flex',
                            flexDirection: 'column',
                            zIndex: 1000,
                            overflow: 'hidden'
                        }}
                    >
                        {/* Header */}
                        <div style={{ padding: '16px', background: 'var(--accent)', color: 'white', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Bot size={20} />
                            <span style={{ fontWeight: 600 }}>Arcade Assistant</span>
                        </div>

                        {/* Messages */}
                        <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', minHeight: '300px' }}>
                            {messages.map((msg) => (
                                <div key={msg.id} style={{
                                    display: 'flex',
                                    gap: '8px',
                                    flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row',
                                    alignItems: 'flex-end'
                                }}>
                                    <div style={{
                                        width: '28px',
                                        height: '28px',
                                        borderRadius: '50%',
                                        background: msg.sender === 'bot' ? 'var(--accent-soft)' : 'var(--bg-tertiary)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: msg.sender === 'bot' ? 'var(--accent)' : 'var(--text-secondary)'
                                    }}>
                                        {msg.sender === 'bot' ? <Bot size={14} /> : <User size={14} />}
                                    </div>
                                    <div style={{
                                        maxWidth: '80%',
                                        padding: '10px 14px',
                                        borderRadius: '16px',
                                        fontSize: '0.9rem',
                                        background: msg.sender === 'user' ? 'var(--accent)' : 'var(--bg-tertiary)',
                                        color: msg.sender === 'user' ? 'white' : 'var(--text-primary)',
                                        borderBottomRightRadius: msg.sender === 'user' ? '2px' : '16px',
                                        borderBottomLeftRadius: msg.sender === 'bot' ? '2px' : '16px'
                                    }}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            <div ref={chatEndRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSend} style={{ padding: '16px', borderTop: '1px solid var(--border)', display: 'flex', gap: '8px' }}>
                            <input
                                type="text"
                                placeholder="Type a message..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                style={{
                                    flex: 1,
                                    padding: '10px 14px',
                                    borderRadius: 'var(--radius-full)',
                                    border: '1px solid var(--border)',
                                    background: 'var(--bg-tertiary)',
                                    color: 'var(--text-primary)',
                                    outline: 'none',
                                    fontSize: '0.9rem'
                                }}
                            />
                            <button
                                type="submit"
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    background: 'var(--accent)',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Send size={18} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Chatbot;
