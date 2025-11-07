import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'


// Define a type for the slice state
interface CurrentTabState {
  tab: string
  previousTab: string
}

// Define the initial state using that type
const initialState: CurrentTabState = {
  tab: 'Home',
  previousTab: 'Home',
}

export const currentTabSlice= createSlice({
  name: 'currentTab',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    currentTab: (state, action: PayloadAction<string>) => {
      state.previousTab = state.tab
      state.tab = action.payload
    },
  },
})

export const { currentTab } = currentTabSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectSideMenuPopup = (state: RootState) => state.sideMenuPopUp.popUp

export default currentTabSlice.reducer