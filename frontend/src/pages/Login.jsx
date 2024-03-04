import React, { useState } from 'react';

function LoginPage() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loginStatus, setLoginStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        fetch('http://localhost:5000/login', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
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
        })
        .catch((error) => {
            console.error('Error:', error);
            setLoginStatus('Login failed. Please check your credentials.');
        });
    };

    return (
        <div className="container" style={{ marginTop: '20px' }}>
            <div className="row">
                <div className="col s12 m6 offset-m3">
                    <div className="card-panel z-depth-5">
                        <h4 className="center">Sign In</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="input-field">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                />
                            </div>
                            <div className="input-field">
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                />
                            </div>
                            <button className="btn waves-effect waves-light" type="submit" name="action">
                                Sign In
                                <i className="material-icons right">send</i>
                            </button>
                        </form>
                        {loginStatus && <p className="center" style={{ marginTop: '20px' }}>{loginStatus}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
