import { createContext, useContext, useMemo, useState } from "react";
import data from "./data";

export const TagContext = createContext(null);

export function useTagContext() {
	return useContext(TagContext);
}

export function TagContextProvider({ children }) {
	const [tags, setTags] = useState(data)

	const TagContextValue = useMemo(() => ({
		tags,
		setTags
	}), [tags])

	return (
		<TagContext.Provider value={TagContextValue}>
			{children}
		</TagContext.Provider>
	)
}
