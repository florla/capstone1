import React from 'react';
import { Link } from 'react-router-dom';
import wavelogo from '../assets/wave-wealthlogo.png';

function NotFound() {
    return (
        <div>
            {/* wave animation */}
            <div className="landing-animation">
                <div className="sine-wave">
                    <svg className="svg-waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                        <defs>
                            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"></path>
                        </defs>
                        <g className="svg-waves__parallax">
                            <use xlinkHref="#gentle-wave" x="48" y="0"></use>
                            <use xlinkHref="#gentle-wave" x="48" y="3"></use>
                            <use xlinkHref="#gentle-wave" x="48" y="5"></use>
                            <use xlinkHref="#gentle-wave" x="48" y="7"></use>
                        </g>
                    </svg>
                </div>
                {/* Content inside WaveAnimation */}
                <div className="container valign-wrapper section scrollspy not-found-container" id="aboutus">
                    <div className="section no-pad-bot">
                        <h1 className="center">Oops!</h1>
                        <h3 className="center">404 - Page Not Found</h3>
                        <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
                        <div className="center">
                            <Link to="/" className="btn waves-effect waves-light center-align">Go to Homepage</Link>
                        </div>
                    </div>
                </div>
                {/* end of wave animation */}

            </div>
        </div>
    );
}

export default NotFound;
