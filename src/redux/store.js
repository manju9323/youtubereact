import { configureStore,combineReducers} from '@reduxjs/toolkit'
import userSlice from './userSlice'
import videoSlice from './videoSlice'
import { REGISTER, REHYDRATE,FLUSH,PAUSE,PURGE } from 'redux-persist'
import storage from "redux-persist/lib/storage"
import { PERSIST } from 'redux-persist/es/constants'
import persistReducer from 'redux-persist/es/persistReducer'
import persistStore from 'redux-persist/es/persistStore'
import Channel from './currentChannelview'


const persistConfig={
    key:"root",
    version:1,
    storage,
}

const rootReducer=combineReducers({ 
    user:userSlice,
    video:videoSlice,
    channel:Channel,
  })
const persistedReducer=persistReducer(persistConfig,rootReducer)

export const store = configureStore({
  reducer:persistedReducer,
  middleware:(getDefaultMiddleware)=>
  getDefaultMiddleware({
    serializableCheck:{
        ignoredActions:[FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER]
    },
  })
})

export const persistor=persistStore(store)