import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import persistReducer from "redux-persist/es/persistReducer";
import AsyncStorage from '@react-native-async-storage/async-storage';

//ext persist confiuration
let persistConfig = {
    key: "root",
    storage: AsyncStorage
}
//ext persist confiuration
let persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
   // reducer: rootReducer 
   // for persist reducer otherwise rootReducer
    reducer: persistedReducer,
    // when to use redux persist then need to add middleware 
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
});

export default store;