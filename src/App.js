import React, { useState, useEffect } from 'react';
import './App.css'; // Import CSS for styling
import PetStatus from './components/PetStatus';
import InteractionButtons from './components/InteractionButtons';

const App = () => {
    const [currentAction, setCurrentAction] = useState('play');
    const [isHungry, setIsHungry] = useState(false);
    const [isSleepy, setIsSleepy] = useState(false);
    const [energyLevel, setEnergyLevel] = useState(100);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            const randomStatus = Math.random();
            if (randomStatus < 0.2 && !isHungry && !isSleepy) {
                setIsHungry(true);
                setCurrentAction('hungry');
            } else if (randomStatus >= 0.2 && randomStatus < 0.4 && !isHungry && !isSleepy) {
                setIsSleepy(true);
                setCurrentAction('sleepy');
            }
        }, 3000); // Check status every 3 seconds

        return () => clearInterval(interval);
    }, [isHungry, isSleepy]);

    useEffect(() => {
        let interval;
        if (!['eat', 'sleep'].includes(currentAction)) {
            interval = setInterval(() => {
                setEnergyLevel(prev => Math.max(prev - (100 / 20), 0));
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [currentAction]);

    useEffect(() => {
        if (energyLevel === 0) {
            setGameOver(true);
            setCurrentAction('gameover');
        }
    }, [energyLevel]);

    const restartGame = () => {
        setEnergyLevel(100);
        setScore(0);
        setGameOver(false);
        setCurrentAction('play');
    };

    const handleEat = () => {
        setCurrentAction('eat');
        setEnergyLevel(energyLevel => Math.min(energyLevel + 20, 100));
        setIsHungry(false); // Reset isHungry immediately when Eat is clicked

        setTimeout(() => {
            setCurrentAction('happy');
            setTimeout(() => setCurrentAction('play'), 1000);
            setScore(score => score + 10);
        }, 3000);
    };

    const handleSleep = () => {
        setCurrentAction('sleep');
        setEnergyLevel(energyLevel => Math.min(energyLevel + 20, 100));
        setIsSleepy(false); // Reset isSleepy immediately when Sleep is clicked

        setTimeout(() => {
            setCurrentAction('happy');
            setTimeout(() => setCurrentAction('play'), 1000);
        }, 3000);
    };

    const handlePlay = () => {
        setCurrentAction('play');
    };

    const handleSing = () => {
        setCurrentAction('sing');
        setTimeout(() => setCurrentAction('play'), 3000);
        setScore(score => score + 10);
    };

    const handleDance = () => {
        setCurrentAction('dance');
        setTimeout(() => setCurrentAction('play'), 3000);
        setScore(score => score + 10);
    };

    const handleJump = () => {
        setCurrentAction('jump');
        setTimeout(() => setCurrentAction('play'), 3000);
        setScore(score => score + 10);
    };

    return (
        <div className="app">
            <h1>Happy Pet - Virtual Pet Simulator</h1>
            {gameOver ? (
                <div className="game-over">
                    <p>Game Over!</p>
                    <p>Final Score: {score}</p>
                    <button className="restart-button" onClick={restartGame}>Restart Game</button>
                </div>
            ) : (
                <PetStatus currentAction={currentAction} energyLevel={energyLevel} score={score} />
            )}
            {!gameOver && (
                <InteractionButtons
                    currentAction={currentAction}
                    onEat={handleEat}
                    onPlay={handlePlay}
                    onSleep={handleSleep}
                    onSing={handleSing}
                    onDance={handleDance}
                    onJump={handleJump}
                    isHungry={isHungry}
                    isSleepy={isSleepy}
                />
            )}
        </div>
    );
};

export default App;
