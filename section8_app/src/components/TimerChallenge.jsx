import { useState, useRef } from 'react';
import ResultModal from './ResultModal';


export default function TimerChallenge({ title, targetTime }) {
    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

    // useRef will give all components their own timer when starting timer on multiple components at the same time
    const timer = useRef();
    const dialog = useRef();

    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

    if(timeRemaining <= 0) {
        clearInterval(timer.current);
        dialog.current.open();
    }

    // resets after clicking "close" on modal
    function handleReset() {
        setTimeRemaining(targetTime * 1000); // find out the time remaining in milliseconds by multiplying by 1000
    }

    function handleStart() {
        // sets timer / gets current time on timer
        timer.current = setInterval(() => {
            setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10);
        }, 10) 
    }

    function handleStop() {
        clearInterval(timer.current); // clears timer based on current time of that specific timer being stopped
        dialog.current.open()
    }

  return (
    <>
    {/* show modal depending on if you won/lost and target time of challenge */}
    <ResultModal ref={dialog} targetTime={targetTime} remainingTime={timeRemaining} onReset={handleReset} />
    <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
            {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
    <button onClick={timerIsActive ? handleStop : handleStart}>{timerIsActive ? 'Stop' : 'Start'}</button>
        </p>
        <p className={timerIsActive ? 'active' : undefined}>
    {timerIsActive ? 'Time is running...' : `Timer Inactive`}
        </p>
        </section>
    </>
  );
}
