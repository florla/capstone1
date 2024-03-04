import React, { useState } from 'react';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [loginStatus, setLoginStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        fetch('http://localhost:3001/login', { // Replace with your server URL
            method: 'POST',
            credentials: 'include', // To include cookies with the request
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Login failed');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            setLoginStatus('Logged in Successfully!');
            // Redirect or perform any additional actions
        })
        .catch((error) => {
            console.error('Error:', error);
            setLoginStatus('Login failed. Please check your credentials.');
        });

        // Optionally clear form after submission for security
        setFormData({
            email: '',
            password: '',
        });
    };

    return (
        <div className="container">
            <h2>Login</h2>
            {loginStatus && <p>{loginStatus}</p>}
            <form onSubmit={handleSubmit}>
                <div className="input-field">
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <label htmlFor="email">Email</label>
                </div>
                <div className="input-field">
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <label htmlFor="password">Password</label>
                </div>
                <button className="btn waves-effect waves-light" type="submit">
                    Login
                    <i className="material-icons right">send</i>
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
