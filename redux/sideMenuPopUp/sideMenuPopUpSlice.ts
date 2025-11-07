import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'


// Define a type for the slice state
interface SideMenuPopUpState {
  popUp: boolean
}

// Define the initial state using that type
const initialState: SideMenuPopUpState = {
  popUp: false,
}

export const sideMenuPopUpSlice= createSlice({
  name: 'sideMenuPopUp',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    show: (state) => {
      state.popUp = true
    },
    hide: (state) => {
        state.popUp = false
    },
  },
})

export const { show, hide } = sideMenuPopUpSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectSideMenuPopup = (state: RootState) => state.sideMenuPopUp.popUp

export default sideMenuPopUpSlice.reducer