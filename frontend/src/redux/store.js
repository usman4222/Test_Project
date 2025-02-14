import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import persistStore from 'redux-persist/es/persistStore'
import userReducer from './userSlice/userSlice'
import allUsersSlice from './userSlice/allUsersSlice'
import profileSlice from './userSlice/userProfileSlice'


//to store many reduers
const rootReducer = combineReducers({
  user: userReducer,
  allUsers: allUsersSlice,
  userProfile: profileSlice,

})

//to persist state in storage
const persistConfig = {
  key: 'root',
  storage,
  version: 1
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  //middleware to prevent default error
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(
    { serializableCheck: false }
  )
})

export const persister = persistStore(store)