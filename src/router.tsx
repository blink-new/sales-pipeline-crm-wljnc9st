
import { createBrowserRouter } from 'react-router-dom'
import { SaasLayout } from './components/SaasLayout'
import { Pipeline } from './pages/Pipeline'
import { PricingPage } from './pages/Pricing'
import { ProfilePage } from './pages/ProfilePage'
import { Settings } from './pages/Settings'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SaasLayout />,
    children: [
      {
        path: 'pipeline',
        element: <Pipeline />,
      },
      {
        path: 'pricing',
        element: <PricingPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
      {
        index: true,
        element: <Pipeline />,
      },
    ],
  },
])