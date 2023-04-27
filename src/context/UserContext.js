import {createContext, useState} from 'react'

export const userContext = createContext()

export const UserContextProvider = ({children}) =>{
    const [user, setUser] = useState(
        localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo'))
        : null
        ) 
    return (
    <userContext.Provider value={{user, setUser}}>
           {children}
    </userContext.Provider>
    );
}
