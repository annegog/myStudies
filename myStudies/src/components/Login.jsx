import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./UserContext";
import { HiEye, HiEyeOff } from "react-icons/hi";

import Academia from "../assets/Academia.png";

const Login = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (ev) => {
        ev.preventDefault();
        
        if (!username || !password) {
            alert('Please enter both username and password.');
            return;
        }

        try {
            const { data } = await axios.post('/login', {username,password,});
            setUser(data);

            if (data.role === 'student') {
                navigate('/student/' + data._id); 
            } else if (data.role === 'professor') {
                navigate('/professor/'+ data._id);
            }
        } catch (e) {
            if (e.response) {
                if (e.response.status === 422) {
                    alert('Your password is WRONG! Try again.');
                } else if (e.response.status === 404) {
                    alert('Your username is WRONG! Try again.');
                } else {
                    alert('Login FAILED! Try again.');
                }
            } else {
                alert('Login FAILED: ' + e.message);
            }
        }
    };

    const togglePasswordsVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex flex-col md:flex-row md:justify-between items-center md:mx-32 mx-5 m-10">
        <div className="w-full md:w-2/3 lg:w-3/5 xl:w-2/3">
            <img
            src={Academia}
            alt="Academia"
            className="rounded-lg overflow-hidden shadow-xl hover:shadow-2xl"
            />
        </div>

        <div className="w-full md:w-2/3 lg:w-2/5 xl:w-1/3 md:ml-4">
            <form
                onSubmit={handleLogin}
                className="bg-gray-50 p-8 rounded-xl shadow-xl hover:shadow-2xl"
            >
                <h2 className="text-2xl font-semibold mb-4 text-center">
                    Σύνδεση Χρήστη
                </h2>

                <div className="my-4">
                    <label
                        htmlFor="email"
                        className="text-left text-medium font-medium block"
                    >
                    Χρήστης
                    </label>
                    <input
                        id="username"
                        type="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2"
                    />
                </div>

                <div className="my-4">
                    <label
                        htmlFor="password"
                        className="text-left text-medium font-medium block"
                    >
                    Κωδικός
                    </label>

                    <div className="relative flex items-center">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2 pr-10"
                        />
                        <button
                            type="button"
                            className="absolute right-2 text-gray-600"
                            onClick={togglePasswordsVisibility}
                        >
                        {showPassword ? <HiEyeOff /> : <HiEye />}
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full text-white bg-teal-700 rounded-md p-2 hover:bg-teal-600 hover:shadow-xl"
                >
                    Σύνδεση
                </button>
                <a
                    href="/recovery"
                    className="block text-center text-teal-500 mt-2"
                >
                    Ξέχασες τον κωδικό σου;
                </a>
            </form>
        </div>
    </div>
  );
};

export default Login;