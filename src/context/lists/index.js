import { createContext, useContext, useMemo, useState } from "react";
import data from "./data";

export const ListContext = createContext(null);

export function useListContext() {
	return useContext(ListContext);
}

export function ListContextProvider({ children }) {
	const [lists, setLists] = useState(data)

	const listContextValue = useMemo(() => ({
		lists,
		setLists
	}), [lists])

	return (
		<ListContext.Provider value={listContextValue}>
			{children}
		</ListContext.Provider>
	)
}

