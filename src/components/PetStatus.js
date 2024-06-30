import React from 'react';
import '../App.css'; // Import CSS for styling

const PetStatus = ({ currentAction, energyLevel, score }) => {
    const getActionGif = () => {
        switch (currentAction) {
            case 'eat':
                return '/assets/dog-eat.gif';
            case 'play':
                return '/assets/dog-play.gif';
            case 'sleep':
                return '/assets/dog-sleep.gif';
            case 'sing':
                return '/assets/dog-sing.gif';
            case 'dance':
                return '/assets/dog-party.gif';
            case 'jump':
                return '/assets/dog-jump.gif';
            case 'happy':
                return '/assets/dog-happy.gif';
            case 'hungry':
                return '/assets/dog-hungry.gif';
            case 'sleepy':
                return '/assets/dog-sleepy.gif';
            case 'gameover':
                return '/assets/game-over.gif'; // Example for game over image
            default:
                return '/assets/dog-play.gif';
        }
    };

    return (
        <div className="pet-status">
            <div className="energy-bar">
                <div className="energy-level" style={{ width: `${energyLevel}%` }}></div>
            </div>
            <div className="score">
                <p>Score: {score}</p>
            </div>
            <div className="action-gif">
                {currentAction !== 'gameover' && (
                    <img src={getActionGif()} alt={currentAction} />
                )}
                {currentAction === 'gameover' && (
                    <img src={getActionGif()} alt="Game Over" />
                )}
            </div>
        </div>
    );
};

export default PetStatus;
