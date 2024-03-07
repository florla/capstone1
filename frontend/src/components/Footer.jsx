import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

// Define Footer component
export default function Footer({ className }) {
    // Return JSX for the footer
    return (
        <footer className={`page-footer teal gradient-nav-foot ${className}`}>
            <div className="">
                <div className="row">
                    <div className="col l4 s12">
                        {/* Paragraph describing the app */}
                        <p className="grey-text text-lighten-4">Manage your finances like a pro with our budget app and Ride the Wave to Wealth! Stay on top of your expenses, track your income, and achieve your financial goals with ease.</p>
                        <p className="white-text header-5">Follow Us On</p>
                        <div className="col s4">
                            <a href="https://www.linkedin.com" target="_blank" title="LinkedIn">
                                <FontAwesomeIcon icon={faLinkedin} className="white-text fa-3x" />
                            </a>
                        </div>
                        <div className="col s4">
                            <a href="https://www.facebook.com" target="_blank" title="Facebook">
                                <FontAwesomeIcon icon={faFacebook} className="white-text fa-3x" />
                            </a>
                        </div>
                        <div className="col s4">
                            <a href="https://twitter.com" target="_blank" title="Twitter">
                                <FontAwesomeIcon icon={faTwitter} className="white-text fa-3x" />
                            </a>
                        </div>
                    </div>
                    <div className="col l4 s12">
                        <p className="white-text header-5">Links</p>
                        <ul>
                            {/* Links to different pages */}
                            <li><Link className="white-text" to="/">Home</Link></li>
                            <li><Link className="white-text" to="/account">Account</Link></li>
                            <li><Link className="white-text" to="/budget">Budget</Link></li>
                            <li><Link className="white-text" to="/financialarticles">Articles</Link></li>
                            <li><Link className="white-text" to="/contact">Contact Us</Link></li>
                            <li><Link className="white-text" to="/chatbot">Chatbot</Link></li>
                        </ul>
                    </div>
                    <div className="col l4 s12">
                        <p className="white-text header-5">Newsletter</p>
                        <div className="input-field white" style={{borderRadius: '5px'}}>
                            <input id="email" type="email" className="validate white-text" />
                            <label htmlFor="email">Email</label>
                        </div>
                        <button className="btn waves-effect waves-light teal darken-3" type="submit" name="action">Signup</button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
