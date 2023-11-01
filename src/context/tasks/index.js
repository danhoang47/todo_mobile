import { createContext, useContext, useMemo, useState } from "react";

import data from "./data";
import { useListContext } from "../lists";
import { useTagContext } from "../tags";

export const TaskContext = createContext(null);

export function useTaskContext() {
	return useContext(TaskContext);
}

export function TaskContextProvider({ children }) {
	const [tasks, setTasks] = useState(data);
	const { lists } = useListContext();

	const joinedTasks = useMemo(() => 
		tasks.map((task) => ({
			...task,
			list: lists.find((list) => list.id === task.listId)
		})
	, [tasks]))

	const userContextValue = useMemo(
		() => ({
			joinedTasks,
			setTasks,
		}),
		[tasks]
	);

	return (
		<TaskContext.Provider value={userContextValue}>
			{children}
		</TaskContext.Provider>
	);
}
