import React from "react";

import { useState } from "react";

import Academia from "../assets/Academia.png";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        if(email === "test@example.com" && password === "password123"){
            console.log("Login successful!");
        }else{
            console.log("Login failed. Invalid credentials.");
        }

        // console.log("Logging in with:", email, password); // Add your login logic here using email and password (You can replace the console.log statement with your actual login logic)        
    };

    return (
        <div className="flex flex-col md:flex-row md:justify-between items-center md:mx-32 mx-5 mt-10">
            <div className="w-full md:w-2/3 lg:w-3/5 xl:w-2/3">
                <img src={Academia} alt="Academia" className="rounded-lg overflow-hidden" />
            </div>

            <div className="w-full md:w-2/3 lg:w-2/5 xl:w-1/3 md:ml-4">
                <form onSubmit={handleLogin} className="bg-gray-100 p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4 text-center"> Σύνδεση Χρήστη </h2>
                    <div className="mb-4">
                        <label htmlFor="email" className="text-sm block font-medium"> Όνομα Χρήστη: </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border rounded-md p-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="text-sm block font-medium"> Κωδικός: </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border rounded-md p-2"
                        />
                    </div>

                    <button type="submit" className="w-full bg-blue-900 text-white rounded-md p-2 hover:bg-blue-700"> Σύνδεση </button>
                    <a href="/help" className="block text-center text-blue-600 mt-2"> Ξέχασες τον κωδικό σου? </a>
                </form>
            </div>
        </div>
    );
};

export default Login;