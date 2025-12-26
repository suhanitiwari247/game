import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TicTacToe = ({ onGameOver }) => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);

    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
            [0, 4, 8], [2, 4, 6]             // diags
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return squares.includes(null) ? null : 'Draw';
    };

    const handleClick = (i) => {
        if (board[i] || calculateWinner(board)) return;
        const newBoard = board.slice();
        newBoard[i] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsXNext(!isXNext);

        const result = calculateWinner(newBoard);
        if (result) {
            setTimeout(() => {
                onGameOver(result === 'X' ? 100 : (result === 'Draw' ? 20 : 0));
            }, 500);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>
                {calculateWinner(board) ?
                    (calculateWinner(board) === 'Draw' ? 'Game Draw!' : `Winner: ${calculateWinner(board)}`) :
                    `Next Player: ${isXNext ? 'X' : 'O'}`
                }
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 100px)',
                gridTemplateRows: 'repeat(3, 100px)',
                gap: '12px'
            }}>
                {board.map((val, i) => (
                    <motion.button
                        key={i}
                        whileHover={{ scale: 0.95 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleClick(i)}
                        style={{
                            width: '100px',
                            height: '100px',
                            background: 'var(--bg-secondary)',
                            border: '2px solid var(--border)',
                            borderRadius: 'var(--radius-md)',
                            fontSize: '2.5rem',
                            fontWeight: 800,
                            color: val === 'X' ? 'var(--accent)' : 'var(--danger)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {val}
                    </motion.button>
                ))}
            </div>

            <button
                onClick={() => {
                    setBoard(Array(9).fill(null));
                    setIsXNext(true);
                }}
                style={{
                    padding: '12px 24px',
                    background: 'var(--bg-tertiary)',
                    borderRadius: 'var(--radius-md)',
                    fontWeight: 600
                }}
            >
                Restart Game
            </button>
        </div>
    );
};

export default TicTacToe;
