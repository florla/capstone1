import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Define QuizComponent functional component
const QuizComponent = ({ results }) => {
    // State variables
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [evaluationResult, setEvaluationResult] = useState(null);
    const [showSubmitButton, setShowSubmitButton] = useState(true);
    const [showNextButton, setShowNextButton] = useState(false);
    const [message, setMessage] = useState('');
    const [counter, setCounter] = useState(0);
    const [total, setTotal] = useState(0);
    const [points, setPoints] = useState(0);
    // React Router hook for navigation
    const navigate = useNavigate();

    // Function to handle moving to the next question
    const handleNextQuestion = () => {
        if (currentQuestionIndex < results.Questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setUserAnswer('');
            setEvaluationResult(null);
            setShowSubmitButton(true); // Show submit button when moving to the next question
            setShowNextButton(false);
        } else {
            // Navigate to the result page when all questions are answered
            navigate('/result', { state: { counter: counter, total: results.Questions.length, points: points, pTotal: total } });
        }
    };

    // Function to submit the user's answer
    const answerQuestion = async () => {
        if (!userAnswer) {
            setMessage('Please enter an answer before submitting.');
            return;
        } else {
            try {
                setMessage('Grading submission...');
                // Call the server to evaluate the answer
                const response = await axios.get('http://localhost:5000/evaluation', {
                    params: { question: results.Questions[currentQuestionIndex], submission: userAnswer }
                });
                const data = response.data;
                setMessage('');
                setEvaluationResult(data);
                setShowSubmitButton(false); // Hide submit button after submitting the answer
                setShowNextButton(true);
                setPoints(points + parseInt(data.grade.split('/')[0]));
                setTotal(total + parseInt(data.grade.split('/')[1]));
                // Increment counter if the answer is correct
                if (data.evaluation === "correct") {
                    setCounter(counter + 1);
                }
            } catch (error) {
                console.error('Error submitting answer:', error);
            }
        }
    };

    // Current question
    const currentQuestion = results.Questions[currentQuestionIndex];

    // JSX for QuizComponent
    return (
        <>
            <div className="container">
                <div className="section">
                    <div className="row">
                        <h2 className="black-text">Question</h2>
                        <div className="col s12 header-5 quiz-transition" id="questionBlock">
                            <p>{currentQuestion}</p>
                        </div>
                        <div className="col s12 header-5">
                            {message && <div style={{ color: message.includes('Please') ? 'red' : '#2196F3' }}>{message}</div>}
                            <div className="input-field">
                                <textarea
                                    id="selfAnswer"
                                    className="materialize-textarea"
                                    value={userAnswer}
                                    onChange={(e) => setUserAnswer(e.target.value)}
                                    placeholder='Answer'
                                ></textarea>
                                <label htmlFor="selfAnswer"></label>
                            </div>
                        </div>
                        <div className="col s12">
                            {showSubmitButton && (
                                <button
                                    className="btn-large waves-effect waves-light teal center-align"
                                    onClick={answerQuestion}
                                >
                                    Submit Answer
                                </button>
                            )}
                        </div>
                        {showNextButton && (
                            <div className="col s12">
                                <button
                                    onClick={handleNextQuestion}
                                    className="btn-large waves-effect waves-light teal"
                                >
                                    {currentQuestionIndex === results.Questions.length - 1 ? 'View Results' : 'Next Question'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <br /><br />
            </div>
            {/* Evaluation result */}
            {evaluationResult && (
                <div className="container">
                    <div className="section">
                        <div className="row">
                            <h2 className="teal-text">Evaluation Result</h2>
                            <div className="col s12 header-5">
                                <p>Evaluation: {evaluationResult.evaluation}</p>
                                <p>Explanation: {evaluationResult.explanation}</p>
                                <p>Grade: {evaluationResult.grade}</p>
                            </div>
                        </div>
                    </div>
                    <br /><br />
                </div>
            )}
        </>
    );
};

export default QuizComponent;
