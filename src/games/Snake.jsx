import React, { useState, useEffect, useCallback, useRef } from 'react';

const Snake = ({ onGameOver }) => {
    const canvasRef = useRef(null);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    const GRID_SIZE = 20;
    const CANVAS_SIZE = 400;

    const [snake, setSnake] = useState([[5, 5], [4, 5], [3, 5]]);
    const [apple, setApple] = useState([10, 10]);
    const [dir, setDir] = useState([1, 0]);

    const moveSnake = useCallback(() => {
        if (gameOver) return;

        const newSnake = [...snake];
        const head = [newSnake[0][0] + dir[0], newSnake[0][1] + dir[1]];

        // Wall collision
        if (head[0] < 0 || head[0] >= CANVAS_SIZE / GRID_SIZE || head[1] < 0 || head[1] >= CANVAS_SIZE / GRID_SIZE) {
            setGameOver(true);
            onGameOver(score);
            return;
        }

        // Self collision
        if (newSnake.some(s => s[0] === head[0] && s[1] === head[1])) {
            setGameOver(true);
            onGameOver(score);
            return;
        }

        newSnake.unshift(head);

        // Apple collision
        if (head[0] === apple[0] && head[1] === apple[1]) {
            setScore(s => s + 10);
            setApple([
                Math.floor(Math.random() * (CANVAS_SIZE / GRID_SIZE)),
                Math.floor(Math.random() * (CANVAS_SIZE / GRID_SIZE))
            ]);
        } else {
            newSnake.pop();
        }

        setSnake(newSnake);
    }, [snake, dir, apple, gameOver, score, onGameOver]);

    useEffect(() => {
        const context = canvasRef.current.getContext('2d');
        context.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

        // Draw Apple
        context.fillStyle = '#ef4444';
        context.fillRect(apple[0] * GRID_SIZE, apple[1] * GRID_SIZE, GRID_SIZE - 2, GRID_SIZE - 2);

        // Draw Snake
        context.fillStyle = '#22c55e';
        snake.forEach(([x, y]) => {
            context.fillRect(x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE - 2, GRID_SIZE - 2);
        });
    }, [snake, apple]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            switch (e.key) {
                case 'ArrowUp': if (dir[1] !== 1) setDir([0, -1]); break;
                case 'ArrowDown': if (dir[1] !== -1) setDir([0, 1]); break;
                case 'ArrowLeft': if (dir[0] !== 1) setDir([-1, 0]); break;
                case 'ArrowRight': if (dir[0] !== -1) setDir([1, 0]); break;
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [dir]);

    useEffect(() => {
        const gameInterval = setInterval(moveSnake, 150);
        return () => clearInterval(gameInterval);
    }, [moveSnake]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>Score: {score}</div>
            <canvas
                ref={canvasRef}
                width={CANVAS_SIZE}
                height={CANVAS_SIZE}
                style={{
                    background: 'var(--bg-tertiary)',
                    borderRadius: 'var(--radius-md)',
                    border: '2px solid var(--border)',
                    maxWidth: '100%',
                    boxShadow: 'inset var(--shadow-sm)'
                }}
            />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '10px' }}>
                <div />
                <button onClick={() => dir[1] !== 1 && setDir([0, -1])} style={{ padding: '15px', background: 'var(--bg-secondary)', borderRadius: '10px' }}>↑</button>
                <div />
                <button onClick={() => dir[0] !== 1 && setDir([-1, 0])} style={{ padding: '15px', background: 'var(--bg-secondary)', borderRadius: '10px' }}>←</button>
                <button onClick={() => dir[1] !== -1 && setDir([0, 1])} style={{ padding: '15px', background: 'var(--bg-secondary)', borderRadius: '10px' }}>↓</button>
                <button onClick={() => dir[0] !== -1 && setDir([1, 0])} style={{ padding: '15px', background: 'var(--bg-secondary)', borderRadius: '10px' }}>→</button>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Use arrow keys or buttons to move</p>
        </div>
    );
};

export default Snake;
