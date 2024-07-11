import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice'
import geoInfoReducer from './slices/geoInfoSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        geoInfo: geoInfoReducer
    }
})

export default store