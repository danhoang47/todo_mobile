import { createContext, useContext, useMemo, useState } from "react";
import data from "./data";

export const StickyNoteContext = createContext(null);

export function useStickyNoteContext() {
	return useContext(StickyNoteContext);
}

export function StickyNoteContextProvider({ children }) {
	const [stickyNotes, setStickyNotes] = useState(data)

	const stickyNotesContextValue = useMemo(() => ({
		stickyNotes,
		setStickyNotes
	}), [stickyNotes])

	return (
		<StickyNoteContext.Provider value={stickyNotesContextValue}>
			{children}
		</StickyNoteContext.Provider>
	)
}


