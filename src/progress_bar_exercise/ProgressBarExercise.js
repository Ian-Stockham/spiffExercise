/* 
Ian Stockham
Most recent edit date: 06/29/21 
Most recent editor: Ian Stockham
*/

import React from "react";
import Exercise from "../exercise/Exercise";
import App from "../progress_bar_exercise/pbeSolution"

// predefined code given within the assignment
const ProgressBarExercise = () => {
  return (
    <div className="progress-bar-exercise">
      <Exercise
        solution={<Solution />}
        specsUrl="https://github.com/SpiffInc/spiff_react_exercises/issues/1"
        title="Progress Bar Exercise"
      />
    </div>
  );
};

export default ProgressBarExercise;

// ----------------------------------------------------------------------------------

// solution is pullled directly from the .js file by building an App item
const Solution = () => {
    return <div>
    <App/>
    </div>

};
