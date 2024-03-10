import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

export default function Footer({ className }) {

    return (
        <footer className={`page-footer teal gradient-nav-foot ${className}`}>
            <div className="container">
                <div className="row">
                    <div className="col l4 s12 center-align">
                        <p className="white-text header-5">Stay in Touch</p>
                        <div className="col s12">
                            <a href="https://www.linkedin.com" className="white-text" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faLinkedin} className="white-text fa-lg" />
                                <span className="ml-1">LinkedIn</span>
                            </a>
                        </div>
                        <div className="col s12">
                            <a href="https://www.facebook.com" className="white-text" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faFacebook} className="white-text fa-lg" />
                                <span className="ml-1">Facebook</span>
                            </a>
                        </div>
                        <div className="col s12">
                            <a href="https://twitter.com" className="white-text" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faTwitter} className="white-text fa-lg" />
                                <span className="ml-1">Twitter</span>
                            </a>
                        </div>
                        <div className="col s12">
                            <Link to="/contact" className="white-text">
                                <i className="material-icons prefix white-text">email</i>
                                <span className="ml-1">Contact Us</span>
                            </Link>
                        </div>
                    </div>
                    <div className="col l4 s12 center-align">
                        <p className="white-text header-5">Links</p>
                        <ul>
                            <li><Link className="white-text" to="/">Home</Link></li>
                            <li><Link className="white-text" to="/budget">Budget</Link></li>
                            <li><Link className="white-text" to="/financialarticles">Articles</Link></li>
                            <li><Link className="white-text" to="/chatbot">Chatbot</Link></li>
                            
                        </ul>
                    </div>
                    <div className="col l4 s12 ">
                        <p className="grey-text text-lighten-4">Manage your finances like a pro with our budget app and Ride the Wave to Wealth! Stay on top of your expenses, track your income, and achieve your financial goals with ease.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
