import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';

function ContactForm() {
    return (
        <div className="container section scrollspy" id="contactus">
            <div className="section">
                <h2>Contact Us</h2>
                <div className="row">
                    <form className="col s8">
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="name" type="text" className="validate" />
                                <label htmlFor="name" className="active">Your Name</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="email" type="email" className="validate" />
                                <label htmlFor="email" className="active">Your Email</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="message-sub" type="text" className="validate" />
                                <label htmlFor="message-sub" className="active">Message Subject</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <textarea id="text_area" className="materialize-textarea"></textarea>
                                <label htmlFor="text_area" className="active">Your Message</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12">
                                <button className="btn waves-effect waves-light center-align" type="submit" name="action">
                                    Send Message<i className="material-icons right">send</i>
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className="col s12 m4">
                        <p>
                        Feel free to reach out to us with any questions, comments, or inquiries you may have. We're here to help!
                        </p>
                        <div className="row">
                            <div className="col s4">
                                <a href="https://www.linkedin.com" target="_blank" title="LinkedIn">
                                    <FontAwesomeIcon icon={faLinkedin} className="blue-text text-lighten-1 fa-3x" />
                                </a>
                            </div>
                            <div className="col s4">
                                <a href="https://www.facebook.com" target="_blank" title="Facebook">
                                    <FontAwesomeIcon icon={faFacebook} className="blue-text text-lighten-1 fa-3x" />
                                </a>
                            </div>
                            <div className="col s4">
                                <a href="https://twitter.com" target="_blank" title="Twitter">
                                    <FontAwesomeIcon icon={faTwitter} className="blue-text text-lighten-1 fa-3x" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactForm;
