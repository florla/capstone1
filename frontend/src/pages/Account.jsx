import React from 'react';

// Define Account functional component
export default function Account() {
    // JSX for Account component
    return (
        <>
            <div class="page">
                <div class="section no-pad-bot" id="index-banner">
                    <div class="container">
                        <h1 class="header teal-text main-header center-align">Account</h1>
                    </div>
                </div>
                <div class="container">
                    <div class="section">
                        <div class="row">
                            {/* Streak */}
                            <div class="col s12 m4">
                                <div class="icon-block">
                                    <h2 class="center teal-text text-accent-3"><i class="material-icons">whatshot</i></h2>
                                    <p class="header-5 center">Streak</p>
                                    <p class="light">You have a streak of 5 days!</p>
                                </div>
                            </div>
                            {/* Platinum Quizzes */}
                            <div class="col s12 m4">
                                <div class="icon-block">
                                    <h2 class="center teal-text text-accent-3"><i class="material-icons">view_list</i></h2>
                                    <p class="header-5 center">Platinum Quizzes</p>
                                    <ul>
                                        <li class="light">golang - intermediate</li>
                                        <li class="light">Javascript - beginner </li>
                                        <li class="light">AWS - beginner</li>
                                    </ul>
                                </div>
                            </div>
                            {/* lrnr Level */}
                            <div class="col s12 m4">
                                <div class="icon-block">
                                    <h2 class="center teal-text text-accent-3"><i class="material-icons">person</i></h2>
                                    <p class="header-5 center">lrnr Level: 2</p>
                                    <p class="light center">150/200 xp</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
