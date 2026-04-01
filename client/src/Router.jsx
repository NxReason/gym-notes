import { createBrowserRouter } from 'react-router';
import Home from './pages/Home';
import Layout from './Layout';
import Exercises from './pages/Exercises';

export const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      { index: true, Component: Home },
      {
        path: '/exercises',
        Component: Exercises,
      },
    ],
  },
]);
