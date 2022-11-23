import { createSlice } from '@reduxjs/toolkit'
import { uiActions } from './uiSlice'

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState: {
    itemsList: [],
    totalQuantity: 0,
    showCart: false,
    changed: false,
  },
  reducers: {
    replaceData: (state, action) => {
      state.itemsList = action.payload.itemsList
      state.totalQuantity = action.payload.itemsList?.length
    },
    addToCart: (state, action) => {
      state.changed = true
      const newItem = action.payload

      const existingItem = state.itemsList.find(
        (item) => item.id === newItem.id
      )

      if (existingItem) {
        existingItem.quantity += 1
        existingItem.totalPrice += newItem.price
      } else {
        state.itemsList.push({
          id: newItem.id,
          quantity: 1,
          price: newItem.price,
          totalPrice: newItem.price,
          name: newItem.name,
        })

        state.totalQuantity++
      }
    },
    removeCart: (state, action) => {
      state.changed = true

      const id = action.payload

      const existingItem = state.itemsList.find((f) => f.id === id)
      if (existingItem.quantity === 1) {
        state.itemsList = state.itemsList.filter((fil) => fil.id !== id)
        state.totalQuantity--
      } else {
        existingItem.quantity--
        existingItem.totalPrice -= existingItem.price
      }
    },
    setShowCart: (state, action) => {
      state.showCart = !state.showCart
    },
  },
})

export const cartActions = cartSlice.actions

export default cartSlice
