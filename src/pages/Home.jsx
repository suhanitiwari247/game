import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Play, TrendingUp, Award, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = ({ setActiveTab }) => {
    const { user, wallet, setActiveGame } = useAppContext();

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            className="home-page"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>

                {/* Welcome Card */}
                <motion.div
                    variants={itemVariants}
                    style={{
                        background: 'linear-gradient(135deg, var(--accent), #9333ea)',
                        padding: '32px',
                        borderRadius: 'var(--radius-lg)',
                        color: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        minHeight: '240px',
                        boxShadow: 'var(--shadow-lg)'
                    }}
                >
                    <div>
                        <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>Welcome back, {user.name}!</h2>
                        <p style={{ opacity: 0.9 }}>Ready to set a new high score today?</p>
                    </div>
                    <div style={{ display: 'flex', gap: '16px' }}>
                        <button
                            onClick={() => setActiveTab('games')}
                            style={{
                                background: 'white',
                                color: 'var(--accent)',
                                padding: '12px 24px',
                                borderRadius: 'var(--radius-md)',
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            <Play size={18} fill="currentColor" />
                            Start Playing
                        </button>
                    </div>
                </motion.div>

                {/* Stats Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <motion.div
                        variants={itemVariants}
                        style={{
                            background: 'var(--card-bg)',
                            padding: '24px',
                            borderRadius: 'var(--radius-lg)',
                            border: '1px solid var(--border)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}
                    >
                        <div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Level {user.level}</p>
                            <div style={{ width: '150px', height: '8px', background: 'var(--bg-tertiary)', borderRadius: '4px', marginTop: '8px', overflow: 'hidden' }}>
                                <div style={{ width: '65%', height: '100%', background: 'var(--accent)' }} />
                            </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <p style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{user.xp} XP</p>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>Next level: 3000 XP</p>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        style={{
                            background: 'var(--card-bg)',
                            padding: '24px',
                            borderRadius: 'var(--radius-lg)',
                            border: '1px solid var(--border)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px'
                        }}
                    >
                        <div style={{ background: 'var(--accent-soft)', padding: '12px', borderRadius: '12px', color: 'var(--accent)' }}>
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Recent Earnings</p>
                            <p style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>+150 Coins today</p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Continue Playing */}
            <div style={{ marginTop: '40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Continue Playing</h3>
                    <button onClick={() => setActiveTab('games')} style={{ color: 'var(--accent)', fontSize: '0.9rem', fontWeight: 500 }}>View All</button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                    {[
                        { id: 'tictactoe', title: 'Tic-Tac-Toe', icon: '❌', color: '#3b82f6', lastPlayed: '2h ago' },
                        { id: 'snake', title: 'Classic Snake', icon: '🐍', color: '#22c55e', lastPlayed: '1d ago' }
                    ].map(game => (
                        <motion.div
                            key={game.id}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => setActiveGame(game.id)}
                            style={{
                                background: 'var(--card-bg)',
                                borderRadius: 'var(--radius-lg)',
                                padding: '20px',
                                border: '1px solid var(--border)',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px'
                            }}
                        >
                            <div style={{
                                width: '56px',
                                height: '56px',
                                background: `${game.color}20`,
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '24px'
                            }}>
                                {game.icon}
                            </div>
                            <div style={{ flex: 1 }}>
                                <h4 style={{ fontWeight: 600 }}>{game.title}</h4>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <Clock size={12} /> {game.lastPlayed}
                                </p>
                            </div>
                            <button style={{ color: 'var(--accent)' }}>
                                <Play size={20} fill="currentColor" />
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Daily Challenges */}
            <div style={{ marginTop: '40px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '20px' }}>Daily Challenges</h3>
                <div style={{ background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-lg)', padding: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                        <div style={{ background: 'var(--warning)', padding: '10px', borderRadius: '10px', color: 'white' }}>
                            <Award size={20} />
                        </div>
                        <div>
                            <p style={{ fontWeight: 600 }}>Win 3 Snake Games</p>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Reward: 50 Coins</p>
                        </div>
                        <div style={{ marginLeft: 'auto' }}>
                            <span style={{ fontWeight: 600 }}>1/3</span>
                        </div>
                    </div>
                    <div style={{ width: '100%', height: '6px', background: 'var(--border)', borderRadius: '3px' }}>
                        <div style={{ width: '33%', height: '100%', background: 'var(--warning)', borderRadius: '3px' }} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Home;
