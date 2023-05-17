import { createContext } from 'react'
import useCookie from 'react-use-cookie'

export const AuthContext = createContext()

export default function AuthProvider({ children }) {
	const [auth, setAuth] = useCookie('auth')

	return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>
}
