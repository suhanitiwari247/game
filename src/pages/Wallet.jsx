import React from 'react';
import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft, Clock, Zap } from 'lucide-react';

const Wallet = () => {
    const { wallet } = useAppContext();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="wallet-page"
        >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>

                {/* Balance Card */}
                <div style={{
                    background: 'linear-gradient(135deg, #1e293b, #0f172a)',
                    padding: '32px',
                    borderRadius: 'var(--radius-lg)',
                    color: 'white',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-lg)'
                }}>
                    <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: 0.1 }}>
                        <WalletIcon size={160} />
                    </div>

                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <p style={{ opacity: 0.7, fontSize: '0.9rem', marginBottom: '8px' }}>Total Balance</p>
                        <h2 style={{ fontSize: '3rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '12px' }}>
                            {wallet.balance}
                            <span style={{ fontSize: '1rem', background: 'rgba(255,255,255,0.2)', padding: '4px 8px', borderRadius: '4px', fontWeight: 500 }}>COINS</span>
                        </h2>

                        <div style={{ display: 'flex', gap: '24px', marginTop: '32px' }}>
                            <div>
                                <p style={{ opacity: 0.7, fontSize: '0.75rem' }}>Earning Rate</p>
                                <p style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <ArrowUpRight size={14} color="#4ade80" /> 120/hr
                                </p>
                            </div>
                            <div>
                                <p style={{ opacity: 0.7, fontSize: '0.75rem' }}>Win Rate</p>
                                <p style={{ fontWeight: 600 }}>68%</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Quick Actions</h3>
                    <button style={{
                        background: 'var(--accent)',
                        color: 'white',
                        padding: '16px',
                        borderRadius: 'var(--radius-md)',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                    }}>
                        <Zap size={18} fill="currentColor" />
                        Buy Premium Pass
                    </button>
                    <button style={{
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border)',
                        color: 'var(--text-primary)',
                        padding: '16px',
                        borderRadius: 'var(--radius-md)',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                    }}>
                        Redeem Gift Card
                    </button>
                </div>
            </div>

            {/* Transaction History */}
            <div style={{ marginTop: '48px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '24px' }}>Transaction History</h3>
                <div style={{
                    background: 'var(--card-bg)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border)',
                    overflow: 'hidden'
                }}>
                    {wallet.history.length > 0 ? (
                        wallet.history.map((tx, idx) => (
                            <div key={tx.id} style={{
                                padding: '20px',
                                borderBottom: idx === wallet.history.length - 1 ? 'none' : '1px solid var(--border)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        background: tx.amount >= 0 ? 'var(--success)15' : 'var(--danger)15',
                                        borderRadius: '10px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: tx.amount >= 0 ? 'var(--success)' : 'var(--danger)'
                                    }}>
                                        {tx.amount >= 0 ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                                    </div>
                                    <div>
                                        <p style={{ fontWeight: 600 }}>{tx.description}</p>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <Clock size={12} /> {new Date(tx.timestamp).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <p style={{
                                        fontWeight: 700,
                                        color: tx.amount >= 0 ? 'var(--success)' : 'var(--danger)'
                                    }}>
                                        {tx.amount >= 0 ? '+' : ''}{tx.amount}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                            No transactions yet. Play games to earn coins!
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default Wallet;
