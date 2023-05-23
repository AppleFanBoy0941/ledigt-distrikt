import { createContext, useState } from 'react'

export const UpdateContext = createContext()

export default function UpdateProvider({ children }) {
	const [lastUpdate, setLastUpdate] = useState(null)

	return <UpdateContext.Provider value={{ lastUpdate, setLastUpdate }}>{children}</UpdateContext.Provider>
}
