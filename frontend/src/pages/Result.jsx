import React from 'react';
import { useLocation } from 'react-router-dom';

// Define Result functional component
export default function Result() {
    // Get the location object
    const location = useLocation();
    // Extract data from location state
    const counter = location.state && location.state.counter;
    const total = location.state && location.state.total;
    const points = location.state && location.state.points;
    const pTotal = location.state && location.state.pTotal;

    // JSX for Result component
    return (
        <div class="results">
            <div class="section no-pad-bot" id="index-banner">
                <div class="container">
                    <br /><br />
                    {/* LRNR header */}
                    <h1 class="header center teal-text main-header">lrnr</h1>
                    <div class="row center">
                        {/* Display correct answers */}
                        <p class="center header-5" id="correctAnswersBlock">Questions Right: {counter} / {total}</p>
                        {/* Display points */}
                        <p class="center header-5" id="correctAnswersBlock">Points: {points} / {pTotal}</p>
                    </div>
                    <div class="row center">
                        {/* Try another quiz button */}
                        <a id="download-button" class="btn-large waves-effect waves-light teal" href="/categories">Try Another Quiz</a>
                    </div>
                    <br /><br />
                </div>
            </div>
        </div>
    );
}
