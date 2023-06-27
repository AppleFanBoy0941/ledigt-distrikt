import { createContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

export const AuthContext = createContext()

export default function AuthProvider({ children }) {
	const [auth, setAuth] = useLocalStorage('auth')

	return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>
}
