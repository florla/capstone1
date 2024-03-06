import React, { useState, useEffect } from 'react';

const AdminPage = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Update the endpoint as necessary based on your setup
        fetch('/api/users')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    return (
        <div className="container">
            <h4 className="center">Admin Dashboard</h4>
            <table className="striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Last Logged In</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.fullName}</td>
                            <td>{user.email}</td>
                            <td>{user.lastLoggedIn || 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPage;
