import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import CreateBot from './Components/CreateBot.jsx';
import Header from './Components/Header.jsx';
import LoginRegister from './Authentication/LoginRegister.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/create-own-bot',
    element: <CreateBot/>
  },
  {
    path: '/login',
    element: <LoginRegister/>
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header/>
    <RouterProvider router={router} />
  </StrictMode>,
);
