import React from 'react';
import '../App.css'; // Import CSS for styling

const PetStatus = ({ currentAction, energyLevel, score }) => {
    const getActionGif = () => {
        switch (currentAction) {
            case 'eat':
                return { gif: '/assets/dog-eat.gif', text: 'Nom nom... Delicious!' };
            case 'play':
                return { gif: '/assets/dog-play.gif', text: 'Let\'s play together!' };
            case 'sleep':
                return { gif: '/assets/dog-sleep.gif', text: 'Zzz... Sleeping peacefully.' };
            case 'sing':
                return { gif: '/assets/dog-sing.gif', text: 'La la la... Singing a tune!' };
            case 'dance':
                return { gif: '/assets/dog-party.gif', text: 'Dance party time!' };
            case 'jump':
                return { gif: '/assets/dog-jump.gif', text: 'Jumping around energetically!' };
            case 'happy':
                return { gif: '/assets/dog-happy.gif', text: 'Yay! Happy and excited!' };
            case 'hungry':
                return { gif: '/assets/dog-hungry.gif', text: 'I\'m hungry, feed me!' };
            case 'sleepy':
                return { gif: '/assets/dog-sleepy.gif', text: 'Feeling sleepy... Time for a nap.' };
            case 'gameover':
                return { gif: '/assets/game-over.gif', text: 'Game Over! Try again?' }; // Example for game over image
            default:
                return { gif: '/assets/dog-play.gif', text: 'Let\'s have fun!' };
        }
    };

    const actionInfo = getActionGif();

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
                    <img src={actionInfo.gif} alt={currentAction} />
                )}
                {currentAction === 'gameover' && (
                    <img src={actionInfo.gif} alt="Game Over" />
                )}
                <p className="action-text">{actionInfo.text}</p>
            </div>
        </div>
    );
};

export default PetStatus;
