import { createContext } from 'react'

const AuthenticationContext = createContext({
    userId: '',
    username: '',
    logIn: () =>{ },
    logOut: () => { },
})

export default AuthenticationContext