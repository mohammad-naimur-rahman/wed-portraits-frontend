import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { getCookie, setCookie } from 'cookies-next'
import toast from 'react-hot-toast'

interface State {
  cartArr: string[]
}

const initialState: State = {
  cartArr: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    initializeCart: state => {
      const existingCart = getCookie('cart')
      if (existingCart) {
        const cart: string[] = JSON.parse(existingCart)
        state.cartArr = cart
      } else {
        state.cartArr = []
      }
    },
    addToCart: (state, action: PayloadAction<string>) => {
      const ifExist = state.cartArr.find(c => c === action.payload)
      if (ifExist) {
        toast.error('Item is already in the cart!')
        return
      } else {
        setCookie('cart', JSON.stringify([...state.cartArr, action.payload]))
        toast.success('Item added to cart!')
        state.cartArr.push(action.payload)
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const otherItems = state.cartArr.filter(item => item !== action.payload)
      setCookie('cart', JSON.stringify(otherItems))
      state.cartArr = state.cartArr.filter(item => item !== action.payload)
    },
    emptyCart: state => {
      state.cartArr = []
    },
  },
})

export const { initializeCart, addToCart, removeFromCart, emptyCart } = cartSlice.actions

export default cartSlice.reducer
