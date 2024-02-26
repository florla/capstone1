import React from 'react';
import QuizComponent from '../components/QuizComponent';
import { useLocation } from 'react-router-dom';

// Define Questionaire functional component
export default function Questionaire() {
    // Get the location object
    const location = useLocation();
    // Extract results from location state
    const results = location.state && location.state.results;

    return (
        <div className='quizPage'>
            {/* Render QuizComponent with results */}
            <QuizComponent results={results} />
        </div>
    );
}
