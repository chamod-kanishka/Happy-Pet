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
    const [randomStatus, setRandomStatus] = useState(0); // State to hold random status value

    // Handle pet's status based on energy level and random chance
    useEffect(() => {
        const interval = setInterval(() => {
            const newRandomStatus = Math.random();
            setRandomStatus(newRandomStatus); // Update random status value
            if (newRandomStatus < 0.4 && !isHungry && !isSleepy && currentAction !== 'eat') {
                setIsHungry(true);
                setCurrentAction('hungry');
            } else if (newRandomStatus >= 0.6 && !isHungry && !isSleepy && currentAction !== 'sleep') {
                setIsSleepy(true);
                setCurrentAction('sleepy');
            }
        }, 3000); // Check status every 3 seconds

        return () => clearInterval(interval);
    }, [isHungry, isSleepy, currentAction]);

    // Decrease energy level over time
    useEffect(() => {
        let interval;
        if (!['eat', 'sleep'].includes(currentAction)) {
            interval = setInterval(() => {
                setEnergyLevel(prev => Math.max(prev - (100 / 30), 0));
            }, 2000);
        }

        return () => clearInterval(interval);
    }, [currentAction]);

    // Check for game over condition
    useEffect(() => {
        if (energyLevel === 0) {
            setGameOver(true);
            setCurrentAction('gameover');
        }
    }, [energyLevel]);

    // Restart the game
    const restartGame = () => {
        setEnergyLevel(100);
        setScore(0);
        setGameOver(false);
        setCurrentAction('play');
    };

    // Handle eating action
    const handleEat = () => {
        setCurrentAction('eat');
        setEnergyLevel(energyLevel => Math.min(energyLevel + 30, 100));
        setIsHungry(false); // Reset isHungry immediately when Eat is clicked
        setScore(score => score + 10);

        setTimeout(() => {
            setCurrentAction('happy');
            setTimeout(() => setCurrentAction('play'), 1000);
        }, 3000);
    };

    // Handle sleeping action
    const handleSleep = () => {
        setCurrentAction('sleep');
        setEnergyLevel(energyLevel => Math.min(energyLevel + 30, 100));
        setIsSleepy(false); // Reset isSleepy immediately when Sleep is clicked

        setTimeout(() => {
            setCurrentAction('happy');
            setTimeout(() => setCurrentAction('play'), 1000);
        }, 3000);
    };

    // Handle playing action
    const handlePlay = () => {
        setCurrentAction('play');
    };

    // Handle singing action
    const handleSing = () => {
        setCurrentAction('sing');
        setTimeout(() => setCurrentAction('play'), 3000);
        setScore(score => score + 10);
    };

    // Handle dancing action
    const handleDance = () => {
        setCurrentAction('dance');
        setTimeout(() => setCurrentAction('play'), 3000);
        setScore(score => score + 10);
    };

    // Handle jumping action
    const handleJump = () => {
        setCurrentAction('jump');
        setTimeout(() => setCurrentAction('play'), 3000);
        setScore(score => score + 10);
    };

    return (
        <div className="app">
            <div className="title">
                <img
                    src={process.env.PUBLIC_URL + '/pet-icon.png'}
                    alt="Pet Icon"
                    style={{ width: '40px', height: '40px', marginRight: '10px' }}
                />
                <h1>Happy Pet</h1>
            </div>

            {/* Game Over or Pet Status display */}
            {gameOver ? (
                <div className="game-over">
                    <p>Game Over!</p>
                    <p>Final Score: {score}</p>
                    <button className="restart-button" onClick={restartGame}>Restart Game</button>
                </div>
            ) : (
                <div>
                    <PetStatus currentAction={currentAction} energyLevel={energyLevel} score={score} />
                    <p>Random Status: {randomStatus.toFixed(2)}</p>
                </div>
            )}

            {/* Interaction buttons */}
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

            {/* Footer section */}
            <footer className="footer">
                <p>&copy; 2024 Developed by Chamod Kanishka</p>
            </footer>
        </div>
    );
};

export default App;
