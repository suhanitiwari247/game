import React, { useState } from 'react';
import { Home, Gamepad2, Wallet, Trophy, Menu, X, Sun, Moon, Sparkles, MessageSquare } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './Layout.css';

const Layout = ({ children, activeTab, setActiveTab }) => {
    const { theme, setTheme, wallet, user } = useAppContext();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const navItems = [
        { id: 'home', icon: Home, label: 'Home' },
        { id: 'games', icon: Gamepad2, label: 'Games' },
        { id: 'wallet', icon: Wallet, label: 'Wallet' },
        { id: 'rewards', icon: Trophy, label: 'Rewards' },
    ];

    return (
        <div className="layout">
            {/* Sidebar */}
            <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', background: 'var(--accent)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyCenter: 'center', color: 'white' }}>
                        <Gamepad2 size={24} />
                    </div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Arcade</h2>
                </div>

                <nav style={{ flex: 1, marginTop: '20px' }}>
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            className={`nav-link ${activeTab === item.id ? 'active' : ''}`}
                            onClick={() => {
                                setActiveTab(item.id);
                                setIsSidebarOpen(false);
                            }}
                        >
                            <item.icon size={20} />
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="sidebar-footer" style={{ padding: '24px', borderTop: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img src={user.avatar} alt="Avatar" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-tertiary)' }} />
                        <div>
                            <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>{user.name}</p>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Level {user.level}</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                <header className="navbar">
                    <button className="mobile-menu-btn" onClick={() => setIsSidebarOpen(true)} style={{ display: 'none' }}>
                        <Menu size={24} />
                    </button>

                    <div className="nav-left">
                        <h1 style={{ fontSize: '1.1rem', fontWeight: 600 }}>
                            {navItems.find(i => i.id === activeTab)?.label}
                        </h1>
                    </div>

                    <div className="nav-right">
                        <div className="wallet-badge">
                            <Wallet size={16} />
                            <span>{wallet.balance}</span>
                        </div>

                        <div className="theme-toggle">
                            <button
                                className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
                                onClick={() => setTheme('light')}
                                title="Light Mode"
                            >
                                <Sun size={18} />
                            </button>
                            <button
                                className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
                                onClick={() => setTheme('dark')}
                                title="Dark Mode"
                            >
                                <Moon size={18} />
                            </button>
                            <button
                                className={`theme-btn ${theme === 'vibrant' ? 'active' : ''}`}
                                onClick={() => setTheme('vibrant')}
                                title="Vibrant Mode"
                            >
                                <Sparkles size={18} />
                            </button>
                        </div>
                    </div>
                </header>

                <div className="page-container">
                    {children}
                </div>
            </main>

            {/* Overlay for mobile sidebar */}
            {isSidebarOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={() => setIsSidebarOpen(false)}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(0,0,0,0.5)',
                        zIndex: 95
                    }}
                />
            )}
        </div>
    );
};

export default Layout;
