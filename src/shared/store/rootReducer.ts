import { combineReducers } from '@reduxjs/toolkit'

import AuthReducer from '../../auth/shared/store/auth.store'

const rootReducer = combineReducers({ auth: AuthReducer })

export default rootReducer
export type RootState = ReturnType<typeof rootReducer>
