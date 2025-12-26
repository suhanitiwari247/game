import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Search, Trophy, Star, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ALL_GAMES = [
    { id: 'tictactoe', title: 'Tic-Tac-Toe', category: 'Logic', icon: '❌', color: '#ef4444', players: '7.2k', rating: 4.8 },
    { id: 'snake', title: 'Classic Snake', category: 'Arcade', icon: '🐍', color: '#22c55e', players: '12k', rating: 4.9 },
    { id: 'ludo', title: 'Quick Ludo', category: 'Board', icon: '🎲', color: '#f59e0b', players: '4.5k', rating: 4.7 },
    { id: 'chess', title: 'Arcade Chess', category: 'Board', icon: '♟️', color: '#6366f1', players: '5.1k', rating: 4.8 },
    { id: 'flappy', title: 'Flappy Bird', category: 'Arcade', icon: '🐦', color: '#3b82f6', players: '15k', rating: 4.5 },
    { id: 'memory', title: 'Memory Match', category: 'Logic', icon: '🧠', color: '#ec4899', players: '3.2k', rating: 4.6 },
];

const Games = () => {
    const { setActiveGame } = useAppContext();
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');

    const categories = ['All', 'Arcade', 'Board', 'Logic'];

    const filteredGames = ALL_GAMES.filter(game => {
        const matchesFilter = filter === 'All' || game.category === filter;
        const matchesSearch = game.title.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="games-page">
            <div className="page-header" style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '24px' }}>Discover Games</h2>

                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <div style={{
                        flex: 1,
                        minWidth: '280px',
                        position: 'relative',
                        background: 'var(--bg-secondary)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border)',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0 16px'
                    }}>
                        <Search size={18} color="var(--text-secondary)" />
                        <input
                            type="text"
                            placeholder="Search games..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                background: 'none',
                                border: 'none',
                                color: 'var(--text-primary)',
                                outline: 'none'
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '8px', overflowX: 'auto' }} className="scroll-hide">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                style={{
                                    padding: '8px 20px',
                                    borderRadius: 'var(--radius-full)',
                                    background: filter === cat ? 'var(--accent)' : 'var(--bg-secondary)',
                                    color: filter === cat ? 'white' : 'var(--text-secondary)',
                                    border: filter === cat ? 'none' : '1px solid var(--border)',
                                    fontWeight: 500,
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <motion.div
                layout
                className="game-grid"
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                    gap: '24px'
                }}
            >
                <AnimatePresence mode='popLayout'>
                    {filteredGames.map((game) => (
                        <motion.div
                            layout
                            key={game.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            whileHover={{ y: -8 }}
                            style={{
                                background: 'var(--card-bg)',
                                borderRadius: 'var(--radius-lg)',
                                overflow: 'hidden',
                                border: '1px solid var(--border)',
                                boxShadow: 'var(--shadow-sm)',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <div style={{
                                height: '160px',
                                background: `linear-gradient(45deg, ${game.color}, ${game.color}dd)`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '64px',
                                position: 'relative'
                            }}>
                                {game.icon}
                                <div style={{
                                    position: 'absolute',
                                    top: '12px',
                                    right: '12px',
                                    background: 'rgba(0,0,0,0.2)',
                                    backdropFilter: 'blur(4px)',
                                    padding: '4px 8px',
                                    borderRadius: 'var(--radius-sm)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    color: 'white',
                                    fontSize: '0.75rem',
                                    fontWeight: 600
                                }}>
                                    <Star size={12} fill="white" />
                                    {game.rating}
                                </div>
                            </div>

                            <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ marginBottom: '16px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{game.title}</h3>
                                        <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', background: 'var(--bg-tertiary)', padding: '2px 8px', borderRadius: '4px' }}>
                                            {game.category}
                                        </span>
                                    </div>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                                        {game.players} active players
                                    </p>
                                </div>

                                <button
                                    onClick={() => setActiveGame(game.id)}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        borderRadius: 'var(--radius-md)',
                                        background: 'var(--accent)',
                                        color: 'white',
                                        fontWeight: 600,
                                        marginTop: 'auto',
                                        transition: 'opacity 0.2s',
                                    }}
                                    onMouseEnter={(e) => e.target.style.opacity = '0.9'}
                                    onMouseLeave={(e) => e.target.style.opacity = '1'}
                                >
                                    Play Now
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default Games;
