import { configureStore } from '@reduxjs/toolkit'
import api from './api/apiSlice'
import cartSlice from './features/cartSlice'

const store = configureStore({
  reducer: {
    cart: cartSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware),
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
