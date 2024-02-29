import React from 'react';

function ContactForm() {
    return (
            <div className="container" style={{ marginTop: '90px' }}>
                <div className="card-panel z-depth-5">
                    <div className="row">
                        <div className="col s12 m6">
                            <h4 className="center">Contact Us!</h4>
                            <div className="row">
                                <form className="col s12 m12">
                                    <div className="row">
                                        <div className="input-field col s12 m12">
                                            <i className="mdi-action-account-circle prefix"></i>
                                            <input id="icon_prefix" type="text" className="validate" />
                                            <label htmlFor="icon_prefix">Username</label>
                                        </div>

                                        <div className="input-field col s12 m12">
                                            <i className="mdi-communication-email prefix"></i>
                                            <input id="icon_email" type="email" className="validate" />
                                            <label htmlFor="icon_email">Your Email</label>
                                        </div>

                                        <div className="input-field col s12 m12">
                                            <i className="mdi-editor-mode-edit prefix"></i>
                                            <textarea id="icon_prefix2" className="materialize-textarea"></textarea>
                                            <label htmlFor="icon_prefix2">Message</label>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <button className="btn waves-effect waves-light center" type="submit" name="action">
                                Send your message&nbsp;
                                <i className="mdi-content-send"></i>
                            </button>
                        </div>

                        <div className="col s12 m5 offset-m1">
                            <div className="card-panel teal lighten-4">
                                <h5 className="center">Contact Information</h5>
                                <ul>
                                    <li>Email: info@example.com</li>
                                    <li>Phone: +1 (123) 456-7890</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default ContactForm;
