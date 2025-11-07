import { configureStore } from '@reduxjs/toolkit'
import currentTabSlice from './currentTab/currentTabSlice'
import sideMenuPopUpSlice from './sideMenuPopUp/sideMenuPopUpSlice'

export const store = configureStore({
  reducer: {
    sideMenuPopUp: sideMenuPopUpSlice,
    currentTab: currentTabSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch