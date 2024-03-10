import React, { useState } from 'react';

function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Perform validation
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            setErrorMessage('Please fill in all fields.');
            return;
        }

        // Clear error message
        setErrorMessage('');

        // Simulate sending message (you can replace this with your actual form submission logic)
        setTimeout(() => {
            // Reset form data
            setFormData({ name: '', email: '', subject: '', message: '' });
            // Set success message
            setSuccessMessage('Message sent successfully!');
            // Clear success message after 5 seconds
            setTimeout(() => {
                setSuccessMessage('');
            }, 5000);
        }, 1000);
    };

    return (
        <div className="container section scrollspy" id="contactus">
            <div className="section">
                <h2>Contact Us</h2>
                <div className="row custom-row-background">
                    <form className="col s8" onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="input-field col s6">
                                <input
                                    id="name"
                                    type="text"
                                    className="validate"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                                <label htmlFor="name" className={formData.name ? 'active' : ''}>Your Name</label>
                            </div>
                            <div className="input-field col s6">
                                <input
                                    id="email"
                                    type="email"
                                    className="validate"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                <label htmlFor="email" className={formData.email ? 'active' : ''}>Your Email</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input
                                    id="message-sub"
                                    type="text"
                                    className="validate"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                />
                                <label htmlFor="message-sub" className={formData.subject ? 'active' : ''}>Message Subject</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <textarea
                                    id="text_area"
                                    className="materialize-textarea"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                ></textarea>
                                <label htmlFor="text_area" className={formData.message ? 'active' : ''}>Your Message</label>
                            </div>
                        </div>
                        {errorMessage && <div className="red-text">{errorMessage}</div>}
                        {successMessage && <div className="green-text">{successMessage}</div>}
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
                        <p>
                            <strong>Address:</strong><br />
                            1234 Main St<br />
                            Charlotte, NC 12345 
                        </p>    
                        <p>
                            <strong>Email: support@wealthwave.com</strong><br />
                        </p>
                        <p>
                            <strong>Phone:</strong><br />
                            (123) 456-7890
                        </p>
                        
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default ContactForm;
