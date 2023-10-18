import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { getCookie, setCookie } from 'cookies-next'
import toast from 'react-hot-toast'

export interface ICartItem {
  id: string
  title: string
  category: 'Wedding' | 'Birthday' | 'Anniversary' | 'Others'
  image: string
  price: number
}

interface State {
  cartArr: ICartItem[]
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
        const cart: ICartItem[] = JSON.parse(existingCart)
        state.cartArr = cart
      } else {
        state.cartArr = []
      }
    },
    addToCart: (state, action: PayloadAction<ICartItem>) => {
      const ifExist = state.cartArr.find(c => c.id === action.payload.id)
      if (ifExist) {
        toast.error('Item is already in the cart!')
        return
      } else {
        if (state.cartArr.length > 4) {
          toast.error("You can't add more than 5 items!")
          return
        }
        setCookie('cart', JSON.stringify([...state.cartArr, action.payload]))
        toast.success('Item added to cart!')
        state.cartArr.push(action.payload)
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const otherItems = state.cartArr.filter(item => item.id !== action.payload)
      state.cartArr = state.cartArr.filter(item => item.id !== action.payload)
      setCookie('cart', JSON.stringify(otherItems))
    },
    emptyCart: state => {
      state.cartArr = []
    },
  },
})

export const { initializeCart, addToCart, removeFromCart, emptyCart } = cartSlice.actions

export default cartSlice.reducer
