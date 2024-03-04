import React from 'react';

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
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
                        </p>
                        <ul className="share-buttons">
                            <li><a href="https://www.facebook.com/sharer/sharer.php?u=&t=" target="_blank" title="Share on Facebook"><i className="fab fa-facebook purple-text text-lighten-1"></i></a></li>
                            <li><a href="https://twitter.com/intent/tweet?source=&text=:%20" target="_blank" title="Tweet"><i className="fab fa-twitter blue-text text-lighten-1"></i></a></li>
                            <li><a href="https://plus.google.com/share?url=" target="_blank" title="Share on Google+"><i className="fab fa-google-plus red-text text-lighten-1"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactForm;
