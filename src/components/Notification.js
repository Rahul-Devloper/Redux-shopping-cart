import React from 'react'
import Alert from '@mui/material/Alert'
import { useDispatch, useSelector } from 'react-redux'
import { uiActions } from '../store/uiSlice'

const Notification = ({ type, message }) => {
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.ui.notification)

  const handleNotificationClose = () => {
    dispatch(
      uiActions?.showNotification({
        ...notification,
        open: false,
      })
    )
  }

  return (
    <>
      {notification?.open && (
        <Alert onClose={handleNotificationClose} severity={type}>
          {message}
        </Alert>
      )}
    </>
  )
}

export default Notification
