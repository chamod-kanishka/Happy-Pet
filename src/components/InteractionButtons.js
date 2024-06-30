import React from 'react';
import '../App.css'; // Import CSS for styling

const InteractionButtons = ({ currentAction, onEat, onSleep, onSing, onDance, onJump, isHungry, isSleepy }) => {
    const shouldHideEatOrSleep = ['eat', 'sleep', 'happy'].includes(currentAction);
    const shouldHideSingOrDanceOrJump = ['sing', 'dance', 'jump'].includes(currentAction);

    return (
        <div className="interaction-buttons">
            {!shouldHideEatOrSleep && isHungry && (
                <button onClick={onEat} className="button eat">Eat</button>
            )}
            {!shouldHideEatOrSleep && isSleepy && (
                <button onClick={onSleep} className="button sleep">Sleep</button>
            )}
            {!shouldHideEatOrSleep && !shouldHideSingOrDanceOrJump&& !isHungry && !isSleepy && (
                <>
                    <button onClick={onSing} className="button sing">Sing</button>
                    <button onClick={onDance} className="button dance">Dance</button>
                    <button onClick={onJump} className="button jump">Jump</button>
                </>
            )}
        </div>
    );
};

export default InteractionButtons;
