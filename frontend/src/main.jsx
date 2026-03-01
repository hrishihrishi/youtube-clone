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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <VideoGrid />},
      { path: "VideoPlaying", element: <VideoPlayingPage />},
      { path: "ChannelPage", element: <ChannelPage />},
      { path: "SearchPage", element: <SearchPage />}
    ]
  },
  // { path: "/VideoPlaying", element: <VideoPlayingPage />}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>,
)
