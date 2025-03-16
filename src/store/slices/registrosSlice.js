import { createSlice } from '@reduxjs/toolkit'

export const registrosSlice = createSlice({
name: 'registros',
  initialState:{
    botones: 10,
    nombresBotones: [],

  },
  reducers: {
    setBotones: (state, action) => {
        state.botones = action.payload;
    },
    setNombresBotones: (state, action) => {
        state.nombresBotones=action.payload;
    }
  },
})
// Action creators are generated for each case reducer function
export const { setBotones, setNombresBotones} = registrosSlice.actions