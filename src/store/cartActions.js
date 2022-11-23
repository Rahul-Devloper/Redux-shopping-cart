// we can define all actionCreators (thunkFunctions) in here

import { cartActions } from './cartSlice'
import { uiActions } from './uiSlice'

//these are action creators

// export const fetchData = ()=>async (dispatch)=>{}
//above is another way of symplifying this function
export const fetchData = () => {
  return async (dispatch) => {
    const fetchCartData = async () => {
      try {
        const res = await fetch(
          'https://redux-shopping-cart-301cf-default-rtdb.firebaseio.com/cartItems.json'
        )

        const data = await res.json()
        return data
      } catch (err) {
        dispatch(
          uiActions.showNotification({
            open: true,
            message: `Failed: ${err}`,
            type: 'error',
          })
        )
      }
    }

    try {
      const cartData = await fetchCartData()
      console.log('cartData=>', cartData)
      dispatch(cartActions.replaceData(cartData))
    } catch (error) {
      console.log(error)
    }
  }
}

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        open: true,
        message: 'Sending Request',
        type: 'warning',
      })
    )
    const fetchedResponse = async () => {
      try {
        const res = await fetch(
          'https://redux-shopping-cart-301cf-default-rtdb.firebaseio.com/cartItems.json',
          {
            method: 'PUT',
            body: JSON.stringify(cart),
          }
        )
        console.log(res, 'res')
        const data = await res.json()
        if (data?.error) {
          dispatch(
            uiActions.showNotification({
              open: true,
              message: JSON.stringify(data?.error),
              type: 'error',
            })
          )
          return
        }
        console.log('data=>', data)

        dispatch(
          uiActions.showNotification({
            open: true,
            message: 'Request Sent',
            type: 'success',
          })
        )
      } catch (err) {
        dispatch(
          uiActions.showNotification({
            open: true,
            message: `Failed: ${err}`,
            type: 'error',
          })
        )
      }
    }
    await fetchedResponse()
  }
}
