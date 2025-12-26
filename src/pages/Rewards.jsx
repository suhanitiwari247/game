import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Lock, CheckCircle, Calendar, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

const Rewards = () => {
    const { achievements, updateBalance } = useAppContext();
    const [dailyClaimed, setDailyClaimed] = useState(false);
    const [countdown, setCountdown] = useState('08:42:15');

    const claimDaily = () => {
        if (dailyClaimed) return;
        setDailyClaimed(true);
        updateBalance(50, 'Daily login reward');
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rewards-page"
        >
            {/* Daily Reward Section */}
            <div style={{
                background: 'var(--card-bg)',
                borderRadius: 'var(--radius-lg)',
                padding: '32px',
                border: '1px solid var(--border)',
                marginBottom: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '24px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{
                        width: '64px',
                        height: '64px',
                        background: 'var(--accent)',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                    }}>
                        <Gift size={32} />
                    </div>
                    <div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Daily Login Bonus</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>Claim your daily 50 coins!</p>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Next claim in</p>
                        <p style={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{dailyClaimed ? countdown : 'Ready now!'}</p>
                    </div>
                    <button
                        onClick={claimDaily}
                        disabled={dailyClaimed}
                        style={{
                            padding: '12px 32px',
                            borderRadius: 'var(--radius-md)',
                            background: dailyClaimed ? 'var(--bg-tertiary)' : 'var(--accent)',
                            color: dailyClaimed ? 'var(--text-secondary)' : 'white',
                            fontWeight: 600,
                            cursor: dailyClaimed ? 'not-allowed' : 'pointer',
                            boxShadow: dailyClaimed ? 'none' : '0 4px 12px var(--accent-soft)'
                        }}
                    >
                        {dailyClaimed ? 'Claimed' : 'Claim Now'}
                    </button>
                </div>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Star size={20} fill="var(--warning)" color="var(--warning)" />
                Achievements
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
                {achievements.map((ach) => (
                    <div key={ach.id} style={{
                        background: 'var(--card-bg)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '24px',
                        border: '1px solid var(--border)',
                        position: 'relative',
                        opacity: ach.unlocked ? 1 : 0.7
                    }}>
                        <div style={{
                            fontSize: '32px',
                            marginBottom: '16px',
                            filter: ach.unlocked ? 'none' : 'grayscale(1)'
                        }}>
                            {ach.icon}
                        </div>

                        <h4 style={{ fontWeight: 600, marginBottom: '8px' }}>{ach.title}</h4>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                            {ach.description}
                        </p>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '4px 8px', borderRadius: '4px', background: 'var(--bg-tertiary)' }}>
                                100 XP
                            </span>
                            {ach.unlocked ? (
                                <div style={{ color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: 600 }}>
                                    <CheckCircle size={14} /> Completed
                                </div>
                            ) : (
                                <div style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem' }}>
                                    <Lock size={14} /> Locked
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default Rewards;
