import React, { useEffect } from 'react'
import { Alert } from 'react-bootstrap'

const MessageBox = ({message , setMessage}) => {

  useEffect(() => {
    const unsubscribe = setTimeout(() => {
      setMessage({...message , isMessage: false})
    }, 5000);
    return () => unsubscribe
  })
  
  return (
    <Alert  className='py-2' style={{ position: 'fixed' , top: '50px' , left: '20px' , zIndex : '111111' }} variant={message.color}>{message.message}</Alert>
  )
}

export default MessageBox