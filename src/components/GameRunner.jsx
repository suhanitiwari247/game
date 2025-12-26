import React, { useState, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, RotateCcw, Home } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import confetti from 'canvas-confetti';

const TicTacToe = lazy(() => import('../games/TicTacToe'));
const Snake = lazy(() => import('../games/Snake'));

const GameRunner = () => {
    const { activeGame, setActiveGame, updateBalance } = useAppContext();
    const [gameState, setGameState] = useState('playing'); // playing, ended
    const [result, setResult] = useState(null);

    const handleGameOver = (earnings) => {
        setResult(earnings);
        setGameState('ended');
        if (earnings > 0) {
            updateBalance(earnings, `Won in ${activeGame}`);
            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.6 }
            });
        }
    };

    const restart = () => {
        setGameState('playing');
        setResult(null);
    };

    const quit = () => {
        setActiveGame(null);
    };

    const renderGame = () => {
        switch (activeGame) {
            case 'tictactoe': return <TicTacToe onGameOver={handleGameOver} />;
            case 'snake': return <Snake onGameOver={handleGameOver} />;
            default: return (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                    <h3>Game Not Available Yet</h3>
                    <p>We're working hard to bring {activeGame} to you!</p>
                    <button onClick={quit} style={{ marginTop: '20px', padding: '10px 20px', background: 'var(--accent)', color: 'white', borderRadius: '8px' }}>Go Back</button>
                </div>
            );
        }
    };

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            background: 'var(--bg-primary)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            overflow: 'hidden'
        }}>
            {/* Header */}
            <div style={{
                padding: '16px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid var(--border)',
                background: 'var(--bg-secondary)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <h2 style={{ textTransform: 'capitalize', fontWeight: 700 }}>{activeGame.replace('-', ' ')}</h2>
                </div>
                <button
                    onClick={quit}
                    style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyCenter: 'center', borderRadius: '50%', background: 'var(--bg-tertiary)' }}
                >
                    <X size={20} />
                </button>
            </div>

            {/* Game Area */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', overflowY: 'auto' }}>
                <AnimatePresence mode="wait">
                    {gameState === 'playing' ? (
                        <motion.div
                            key="game"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            style={{ width: '100%', maxWidth: '800px' }}
                        >
                            <Suspense fallback={<div>Loading Game...</div>}>
                                {renderGame()}
                            </Suspense>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                background: 'var(--card-bg)',
                                padding: '48px',
                                borderRadius: 'var(--radius-lg)',
                                textAlign: 'center',
                                boxShadow: 'var(--shadow-lg)',
                                border: '1px solid var(--border)',
                                maxWidth: '400px',
                                width: '100%'
                            }}
                        >
                            <div style={{
                                width: '80px',
                                height: '80px',
                                background: 'var(--accent-soft)',
                                color: 'var(--accent)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 24px'
                            }}>
                                <Trophy size={40} />
                            </div>
                            <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>Game Over!</h2>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
                                You earned <span style={{ color: 'var(--accent)', fontWeight: 700 }}>{result} coins</span>
                            </p>

                            <div style={{ display: 'grid', gap: '12px' }}>
                                <button
                                    onClick={restart}
                                    style={{
                                        padding: '16px',
                                        background: 'var(--accent)',
                                        color: 'white',
                                        borderRadius: 'var(--radius-md)',
                                        fontWeight: 600,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px'
                                    }}
                                >
                                    <RotateCcw size={18} /> Play Again
                                </button>
                                <button
                                    onClick={quit}
                                    style={{
                                        padding: '16px',
                                        background: 'var(--bg-tertiary)',
                                        borderRadius: 'var(--radius-md)',
                                        fontWeight: 600,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px'
                                    }}
                                >
                                    <Home size={18} /> Back to Home
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default GameRunner;
