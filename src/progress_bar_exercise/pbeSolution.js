/* 
Ian Stockham
Most recent edit date: 07/15/21 
Most recent editor: Ian Stockham
*/

import React, { useState, useRef } from 'react';
import "./progressBarStyle.css" 

/*  The majority of the code below was pulled from two main sources and combined for the sake of functionality.
    The outlying structure of the code was provided by Florin Pop on youtube
	Link to youtube: https://www.youtube.com/watch?v=AbRgaY0khPM&ab_channel=FlorinPop
	Link to codepen: https://codepen.io/FlorinPop17/pen/jOEpvGb

    While the timing functionality was pulled primarily from Abdul Basit's article on Dev Community about the 
    construction of a stopwatch using react.
    Link to dev.to:  https://dev.to/abdulbasit313/how-to-develop-a-stopwatch-in-react-js-with-custom-hook-561b
*/

// the following funciton defines the progress bar itself and how it is displayed
const Progress = ({done}) => {
	const [style, setStyle] = React.useState({});
	
    // here we return said progress bar and associated values
	return (
		<div className="progress">
			<div className="progress-done" style={{
                opacity: 1,
                width: `${done}%`}}>
				{done}%
			</div>
		</div>
	)
}

/* within the App funciton we define a numeber of items using states to determine their ability to funciton alongside
one another */
const App = () => {
    // defining a timer as well as whether or not the counter in quesiton is actively counting or not
    const [timer, setTimer] = useState(0)
    const [isActive, setIsActive] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const countRef = useRef(null)
    const [finish, setFinish] = useState(false)

    const handleStart = () => {
        // start button logic here
        setIsActive(true)
        setIsPaused(true)
        countRef.current = setInterval(() => {
            setTimer((timer) => timer + 1)
        }, 1000)
    }

    const handlePause = () => {
        // Pause button logic here
        clearInterval(countRef.current)
        setIsPaused(false)

    }

    const handleResume = () => {
        // Resume button logic here
        setIsPaused(true)
        countRef.current = setInterval(() => {
            setTimer((timer) => timer + 1)
        }, 1000)
    }

    const handleFinish = () => {
        //Finish button logic here
        setFinish(true)
    }

    const handleReset = () => {
        // Reset button logic here
        clearInterval(countRef.current)
        setIsActive(false)
        setIsPaused(false)
        setTimer(0)
        setFinish(false)
    }

    /*  this function returns the percentage value desired within the progress bar displayed such that
        the Progress item need not be redrawn over and over which would look messy */
    const percentVal = () => {
        // for the first 15 seconds the bar will increase as a percentage of the first 90% completion
        if (timer <= 15 && finish === false) {
            return (timer/15)*90
        }
        // if the finish button is pressed the function will return 100 percent completion
        else if (finish === true) {
            return (100)
        }
        // if it has been loading for over 15 seconds and finish has yet to be selected 90% completion is displayed
        else {
            return (90)
        }
    }

    return(
	<>
        {/* initial header is returned here */}
        <h1>React Progress Bar</h1>
        {/* progress bar is created with the percentage value function defined above */}
        <Progress done = {percentVal()}/>
        {/* buttons are defined - i would've loved to keep working on the aesthetics of these */}
        <div className='buttons'>
            {/* below is the logic defining the display of buttons which are available to the user at 
            any given point during the programs execution */}
            {
                // if not yet started then display the start button
                !isActive && !isPaused ?
                <button onClick={handleStart}>Start</button>
                : (
                // otherwise if paused show the resume button and if resumed show the pause button
                    isPaused ? <button onClick={handlePause}>Pause</button> :
                    <button onClick={handleResume}>Resume</button>
                )
            }
            {/* finally always display the finish and reset buttons */}
            <button onClick={handleFinish}>Finish</button>
            <button onClick={handleReset} disabled={!isActive}>Reset</button>
        </div>
	</>

    );

}

// exporting for further use within ProgressBarExercise.js

export default App