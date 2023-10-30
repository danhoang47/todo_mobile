import { createContext, useContext, useMemo, useState } from "react";
import data from "./data";

export const TaskContext = createContext(null);

export function useTaskContext() {
	return useContext(TaskContext);
}

export function TaskContextProvider({ children }) {
	const [tasks, setTasks] = useState(data)

	const userContextValue = useMemo(() => ({
		tasks,
		setTasks
	}), [tasks])

	return (
		<TaskContext.Provider value={userContextValue}>
			{children}
		</TaskContext.Provider>
	)
}

