import { createContext, useContext, useMemo, useState } from "react";

export const UserContext = createContext(null);

export function useUserContext() {
	return useContext(UserContext);
}

export function UserContextProvider({ children }) {
	const [user, setUser] = useState(null)

	const userContextValue = useMemo(() => ({
		user,
		setUser
	}), [user])

	return (
		<UserContext.Provider value={userContextValue}>
			{children}
		</UserContext.Provider>
	)
}