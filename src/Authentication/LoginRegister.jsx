import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming React Router
import ParticlesComponent from '../Components/ParticlesComponent';
import Header from '../Components/Header';

const LoginRegister = () => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [login, setLogin] = useState(false); // Login state to manage the session
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const toggleForm = () => {
    setIsRegister(!isRegister);
    setFormData({
      name: '',
      email: '',
      password: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const url="https://imbot-backend.vercel.app"
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegister) {
      const { name, email, password } = formData;
      try {
        console.log(name, email, password);
        const response = await fetch(`${url}/api/auth/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, password })
        });
        
        const json = await response.json();
        if (json.success) {
          localStorage.setItem('token', json.authtoken);
          setLogin(true);
          setTimeout(() => {
            navigate('/');
          }, 2000);
        } else {
          alert("Invalid Credentials");
        }
      } catch (error) {
        console.error('Registration failed:', error);
      }
    }
    else{
      const { email, password } = formData;
      try {
        console.log(email, password);
        const response = await fetch(`${url}/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });
        
        const json = await response.json();
        if (json.success) {
          localStorage.setItem('token', json.authtoken);
          setLogin(true);
          setTimeout(() => {
            navigate('/');
            window.navigator.reload();
          }, 2000);
        } else {
          alert("Invalid Credentials");
        }
      } catch (error) {
        console.error('Login failed:', error);
      }
    }
  };

  return (
    <>
    <div className="flex justify-center items-center min-h-[80vh] ">
      <ParticlesComponent /> {/* Optional if using particle effects */}
      <div className="w-[90%] max-w-[500px] p-5 lg:p-8 bg-[#081233] flex flex-col justify-center rounded-xl shadow-lg ">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r p-8 from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          {isRegister ? 'Register' : 'Login'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {isRegister && (
            <div>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-2 py-2 border-0 border-b bg-transparent focus:outline-none"
                placeholder="Enter your name"
                required
              />
            </div>
          )}
          <div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-2 py-2 border-0 border-b bg-transparent focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-2 py-2 border-0 border-b bg-transparent focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-inherit border font-semibold rounded hover:rounded-xl logbtn"
            style={{ transition: 'all 0.8s ease' }}
          >
            {isRegister ? 'Register' : 'Login'}
          </button>
        </form>

        <div className="text-center w-full gap-3 mt-9 text-gray-600 flex justify-center items-center">
          <div>{isRegister ? 'Already have an account?' : "Don't have an account?"}</div>
          <div
            onClick={toggleForm}
            className="text-blue-500 font-bold cursor-pointer hover:underline"
          >
            {isRegister ? 'Login' : 'Register'}
          </div>
        </div>
      </div>
    </div>
    
    </>

  );
};

export default LoginRegister;
