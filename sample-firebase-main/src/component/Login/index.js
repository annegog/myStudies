import './index.css';
import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = getAuth();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            // Use Firebase Authentication to sign in the user
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Assuming you store the user's role in their profile, you can access it like this
            // You may need to adjust this depending on how you've set up user roles
            const user_role = user.role || 'user'; // Default to 'user' role if not specified

            // Store the email and role in localStorage
            localStorage.setItem('role', user_role);
            localStorage.setItem('email', email);

            // Redirect to the courses page
            window.location.href = './courses';
            console.log("User signed in:", user);
        } catch (error) {
            console.error("Error signing in:", error);
            // Handle errors here, such as displaying a notification to the user
        }
    }

    return (
        <div className='login'>
            <div className="login-header">
                <img src="path_to_your_logo_image" alt="Logo" />
                <img src="path_to_your_header_image" alt="Header" />
            </div>
            <form onSubmit={handleLogin} className='login-container'>
                <h2>Login</h2>
                <div className='login-row'>
                    <label>Email:</label>
                    &nbsp;&nbsp;&nbsp;
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='login-row'>
                    <label>Password:</label>
                    &nbsp;&nbsp;&nbsp;
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type='submit'>Login</button>
                <a href='/register'>Create new user</a>
            </form >
        </div >
    );
}
