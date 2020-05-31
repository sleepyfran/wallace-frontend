import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Just, Nothing } from 'purify-ts'

import { saveToStorage } from '../../../shared/storage/storage'
import { User } from '../../../shared/types/user'
import { AuthState } from './types'

const initialState: AuthState = {
  loggedInUser: Nothing,
}

const authStore = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      saveToStorage('user', action.payload)
      state.loggedInUser = Just(action.payload)
    },

    removeUser(state) {
      saveToStorage('user', undefined)
      state.loggedInUser = Nothing
    },
  },
})

export const { setUser, removeUser } = authStore.actions

export default authStore.reducer
