import React from 'react';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
    ],
  },
])

const App: React.FC = () => {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
}

export default App
