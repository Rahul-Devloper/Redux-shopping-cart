import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import Auth from './components/Auth'
import Layout from './components/Layout'
import Notification from './components/Notification'
import { fetchData, sendCartData } from './store/cartActions'

//to prevent the notification component from rendering everytime when the app
//loads due to the useEffect, we are going to stop the notification from
//showing at the first render

let isFirstRender = true

function App() {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const notification = useSelector((state) => state.ui.notification)
  console.log('ui=>', notification)

  useEffect(() => {
    //since this is a get request  and this needs to perform at every render including
    // the first render , it is written inside another useEffect as the below useEffect
    //has been stopped for the first render
    dispatch(fetchData())
  }, [dispatch])

  useEffect(() => {
    if (isFirstRender) {
      isFirstRender = false
      return
      //this will set the firstRender to be false when app loads first time and stops sending the request
      //So, when the cart items are changed, useEffect will get triggered and that time,
      //only the firstRender will be false as only the code inside the useEffect will run and not the whole app
      //so, this time the fetchedRespons will take place
    }

    //below is the thunk pattern, where instead of calling the apis
    //directly in here we are defining a function called sednCartData
    //which acts like an action or actionCreator. It is basically a thunk function in redux
    //this sendCartData return a callback function which in turn dispatches
    //the required actions
    if (cart.changed) {
      dispatch(sendCartData(cart))
    }
  }, [cart, dispatch])

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

  return (
    <div className='App'>
      {notification && (
        <Notification
          type={notification?.type}
          message={notification?.message}
        />
      )}
      {!isLoggedIn && <Auth />}
      {isLoggedIn && <Layout />}
    </div>
  )
}

export default App
