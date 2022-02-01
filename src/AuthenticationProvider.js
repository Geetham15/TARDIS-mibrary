import React, {useState, useEffect } from 'react'
import AuthenticationContext from './AuthenticationContext'

const AuthenticationProvider = ({children}) => {
    const [userId, setUserId] = useState('')
    const [username, setUsername] = useState('')
    const logIn = (logInUsername, logInUserId) => {
        setUsername(logInUsername)
        setUserId(logInUserId)
    }
    const logOut = () => {
        setUsername('')
    }
    useEffect(()=>{
      const getLoggedInUser = ()=> {
       if(window.sessionStorage.getItem('user_id')){
         console.log('Going to get session storage variables')
         logIn(window.sessionStorage.getItem('username'),window.sessionStorage.getItem('user_id'))
       }
      }
      getLoggedInUser()
    }, [])
    const authContext = {userId, username, logIn, logOut}
  return (
    <AuthenticationContext.Provider value ={authContext}>
      {children}
    </AuthenticationContext.Provider>
  )
}

export default AuthenticationProvider
