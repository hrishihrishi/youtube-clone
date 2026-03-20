import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import userPrefrencesReducer from './userPrefrences';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

/**
 * Global Redux Store Configuration.
 * Integrates 'redux-persist' to ensure user sessions survive page refreshes.
 */

// 1. Centralize all feature-specific reducers
const rootReducer = combineReducers({
  user: userReducer, // Handles auth and current user profile
  userPrefrences: userPrefrencesReducer, // Handles theme and other user preferences
});

/* 
   2. Persistence Config:
   Defines how and where the state should be cached in the browser's Local Storage.
*/
const persistConfig = {
  key: 'root',      // The key name for the object in LocalStorage
  storage,          // Defaults to browser LocalStorage
  version: 1,
};

// 3. Create a wrapper around the root reducer to manage persistence logic
const persistedReducer = persistReducer(persistConfig, rootReducer);

/* 
   4. Configure Main Store:
   Includes custom middleware configuration to disable serializable checks,
   which is necessary for redux-persist to handle complex objects like dates or functions correctly.
*/
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Prevents errors related to storing non-serializable data from persist
    }),
});

// 5. Create a peristor object used by the PersistGate in main.jsx to delay rendering until state is loaded
export const persistor = persistStore(store);