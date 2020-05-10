import { ThunkAction, Action, ThunkDispatch } from '@reduxjs/toolkit'

import RootReducer from './rootReducer'

type RootState = ReturnType<typeof RootReducer>

export type Thunk = ThunkAction<void, RootState, unknown, Action<string>>
export type Dispatch = ThunkDispatch<RootState, unknown, Action<string>>
