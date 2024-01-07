import React, { useContext, useState } from 'react';
import img11 from '../assets/akadimia_big.png';
import { UserContext } from './UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  async function handleLogin(ev) {
    ev.preventDefault();
    if (!username || !password) {
      alert('Please enter both username and password.');
      return;
    }
    try {
      const { data } = await axios.post('/login', {
        username,
        password,
      });

      setUser(data);

      // Assuming you have a 'role' field in the user data
      if (data.role === 'student') {
        navigate('/student'); // Redirect to the student page
      } else if (data.role === 'professor') {
        navigate('/professor'); // Redirect to the professor page
      }
    } catch (e) {
      console.log(e.response);
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
  }

  return (
    <div className="flex flex-col md:flex-row md:justify-between items-center md:mx-32 mx-5 mt-10">
      <div className="w-full md:w-2/3 lg:w-3/5 xl:w-2/3">
        <img src={img11} alt="img" className="rounded-lg overflow-hidden" />
      </div>

      <div className="w-full md:w-2/3 lg:w-2/5 xl:w-1/3 md:ml-4">
        <form
          onSubmit={handleLogin}
          className="bg-gray-100 p-8 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Σύνδεση Χρήστη
          </h2>
          <div className="mb-4">
            <label htmlFor="email" className="text-sm block font-medium">
              Χρήστης:
            </label>
            <input
              type="username"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="text-sm block font-medium">
              Κωδικός:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-900 text-white rounded-md p-2 hover:bg-blue-700"
          >
            Σύνδεση
          </button>
          <a href="/help" className="block text-center text-blue-600 mt-2">
            Ξέχασες τον κωδικό σου?
          </a>
          {/* TODO: Add the link that this goes to  */}
        </form>
      </div>
    </div>
  );
};

export default Login;
