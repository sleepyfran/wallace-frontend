import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { some, none } from 'fp-ts/lib/Option'

import { saveToStorage } from '../../../shared/storage/storage'
import { User } from '../../../shared/types/user'
import { AuthState } from './types'

const initialState: AuthState = {
  loggedInUser: none,
}

const authStore = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      saveToStorage('user', action.payload)
      state.loggedInUser = some(action.payload)
    },

    removeUser(state) {
      saveToStorage('user', undefined)
      state.loggedInUser = none
    },
  },
})

export const { setUser, removeUser } = authStore.actions

export default authStore.reducer
