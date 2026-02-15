import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import VideoPlayingPage from './components/VideoPlayingPage.jsx'
import VideoGrid from './VideoGrid.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <VideoGrid />},
      { path: "VideoPlaying", element: <VideoPlayingPage />}
    ]
  },
  // { path: "/VideoPlaying", element: <VideoPlayingPage />}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
