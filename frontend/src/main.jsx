import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store.js';
import { PersistGate } from 'redux-persist/integration/react';
import VideoPlayingPage from './components/VideoPlayingPage.jsx'
import VideoGrid from './VideoGrid.jsx'
import ChannelPage from './components/ChannelPage.jsx'
import SearchPage from './SearchPage.jsx'

/**
 * Define the application routes using React Router's data API.
 * The <App /> component serves as the layout wrapper with a <Outlet /> for child routes.
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // Homepage: Displays the grid of recommended videos
      { index: true, element: <VideoGrid /> },
      // Video Playback Page: Handles individual video streaming and details
      { path: "VideoPlaying", element: <VideoPlayingPage /> },
      // Channel Dashboard: Shows videos belonging to a specific user
      { path: "ChannelPage", element: <ChannelPage /> },
      // Search Results Page: Displays filtered results based on queries
      { path: "SearchPage", element: <SearchPage /> }
    ]
  },
  // { path: "/VideoPlaying", element: <VideoPlayingPage />}
])

// Mount the React application to the DOM
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Provides the Redux global state to all components */}
    <Provider store={store}>
      {/* Ensures the app doesn't render until the persisted state is loaded back into Redux */}
      <PersistGate loading={null} persistor={persistor}>
        {/* Handles client-side navigation */}
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>,
)
