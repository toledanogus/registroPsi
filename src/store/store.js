import { configureStore } from '@reduxjs/toolkit';
import { registrosSlice } from './slices/registrosSlice';

export const store = configureStore({
    reducer: {
        registros: registrosSlice.reducer,
    },
});