import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming React Router
import ParticlesComponent from '../Components/ParticlesComponent';
import { FcGoogle } from 'react-icons/fc';
import { IoArrowBack } from 'react-icons/io5';
import { AlertContext } from '../AlertContext';
const LoginRegister = () => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [login, setLogin] = useState(false); // Login state to manage the session
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const { alrtMsg, setAlrtMsg } = useContext(AlertContext);
  

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

  const url = "https://imbot-backend.vercel.app"
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
    else {
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
    <div className={``} >
      <div className="flex justify-center items-center min-h-screen ">

        <div className="w-[90%] max-w-[500px] p-5 md:p-10 bg-[#372993] flex flex-col justify-center rounded-lg shadow-lg ">
          <IoArrowBack
            className="text-2xl text-indigo-300 cursor-pointer"
            onClick={() => window.history.back()}
          />

          <h2 className="text-2xl  font-bold text-center p-8  text-white">
            {isRegister ? 'Register' : 'Login'} to Imbot
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
                  className="w-full px-2 py-2 border-0 border-b bg-transparent outline-none focus:border-red-600"
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
                className="w-full px-2 py-2 border-0 border-b bg-transparent outline-none focus:border-red-600"
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
                className="w-full px-2 py-2 border-0 border-b bg-transparent outline-none focus:border-red-600"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 text-sm text-white bg-inherit border  rounded hover:rounded-xl logbtn"
              style={{ transition: 'all 0.8s ease' }}
            >
              {isRegister ? 'Register' : 'Login'}
            </button>
          </form>
          <p className='text-center my-3'>or</p>

          <div className='bg-white h-[40px] w-full my-2 flex text-black justify-center items-center rounded gap-3 font-semibold hover:rounded-2xl cursor-pointer' style={{ transition: 'all 0.8s ease' }} onClick={()=>{
            setAlrtMsg('Google Authentication will be available soon');
          }}>
            <div><FcGoogle className='text-2xl' /></div>
            <div className='text-sm'>{isRegister ? 'Register' : 'Login'} with Google</div>
          </div>

          <div className="text-center w-full gap-3 my-3 text-sm text-white flex justify-center items-center">
            <div>{isRegister ? 'Already have an account?' : "Don't have an account?"}</div>
            <div
              onClick={toggleForm}
              className="text-red-500 font-semibold cursor-pointer hover:underline"
            >
              {isRegister ? 'Login' : 'Register'}
            </div>

          </div>
        </div>
      </div>

    </div>

  );
};

export default LoginRegister;
