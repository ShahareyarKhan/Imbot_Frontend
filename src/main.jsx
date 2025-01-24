import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import CreateBot from './Components/CreateBot.jsx';
import Header from './Components/Header.jsx';
import LoginRegister from './Authentication/LoginRegister.jsx';
import Alert from './Components/Alert.jsx';
import { AlertProvider } from './AlertContext.jsx';
import ParticlesComponent from './Components/ParticlesComponent.jsx';
import Profile from './Components/Profile.jsx';
import MyBot from './Components/MyBot.jsx';
import { UserProvider } from './UserContext.jsx';
import BotDetail from './Components/BotDetail.jsx';
// const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
// console.log(apiKey); // This will log your API key if correctly configured

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/create-own-bot',
    element: <CreateBot />
  },
  {
    path: '/login',
    element: <LoginRegister />
  },
  {
    path: '/profile/:userId',
    element: <Profile />
  },
  {
    path: '/your-bots',
    element: <MyBot />
  },
  {
    path: '/bot/:userId/:botId',
    element: <BotDetail />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <AlertProvider>
        <Alert />
        <RouterProvider router={router} />
        {/* <Footer/> */}
        {/* <ParticlesComponent /> */}
      </AlertProvider>
    </UserProvider>

  </StrictMode>,
);
