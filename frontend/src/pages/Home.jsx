import React from 'react';
import { Link } from 'react-router-dom';
import lrnr from './lrnrlogo.png';

// Define Home functional component
export default function Home() {
    // JSX for Home component
    return (
        <>
            <div class='fullPage'>
                <div class="section no-pad-bot" id="index-banner">
                    <div class="container">
                        <br /><br />
                        {/* LRNR Logo */}
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: 200
                            }}
                        >
                            <img src={lrnr} alt="LRNR Logo" style={{ maxWidth: "100%", maxHeight: "100%" }} />
                        </div>
                        {/* Sub-header */}
                        <div class="row center">
                            <p class="header-5 col s12 light sub-header">Your guided path to programming enlightenment</p>
                        </div>
                        {/* Begin Journey button */}
                        <div class="row center">
                            <Link to="/categories" id="download-button" className="btn-large waves-effect waves-light teal">
                                Begin Journey
                            </Link>
                        </div>
                        <br /><br />
                    </div>
                </div>

                <div class="container">
                    <div class="section">
                        <div class="row">
                            {/* Personalized Quizzes */}
                            <div class="col s12 m4">
                                <div class="icon-block">
                                    <h2 class="center teal-text text-accent-3"><i class="material-icons">flash_on</i></h2>
                                    <p class="center header-5">Personalized Quizzes</p>
                                    <p class="light">Greetings, young padawan. Are you ready to embark on a journey of personalized enlightenment through the art of coding? Our app, can create custom quizzes that align with your coding skills and interests. Whether you are a novice or a master, our system can generate questions that will test your proficiency in programming languages, tools, and concepts</p>
                                </div>
                            </div>
                            {/* Rewarding */}
                            <div class="col s12 m4">
                                <div class="icon-block">
                                    <h2 class="center teal-text text-accent-3"><i class="material-icons">payments</i></h2>
                                    <p class="center header-5">Rewarding</p>
                                    <p class="light">Our app is designed to be both challenging and rewarding, so you can learn new concepts while enjoying the process. With our personalized quiz app, you can track your progress, compete with your peers, and discover new areas of expertise. The journey of a thousand lines of code begins with a single keystroke</p>
                                </div>
                            </div>
                            {/* Personal SME */}
                            <div class="col s12 m4">
                                <div class="icon-block">
                                    <h2 class="center teal-text text-accent-3"><i class="material-icons">person</i></h2>
                                    <p class="center header-5">Personal SME</p>
                                    <p class="light">Welcome to the path of knowledge. Our app is like having a personal subject matter expert at your side, guiding you on your journey towards wisdom</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br /><br />
                </div>
            </div>
        </>
    );
}
