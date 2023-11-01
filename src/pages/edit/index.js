import { useEffect, useRef, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Text, View, TextInput, Pressable, ScrollView } from "react-native";

import { useTaskContext } from "../../context/tasks";
import { useListContext } from "../../context/lists";
import { useTagContext } from "../../context/tags";
import SubTask from "./subtask";

import styles from "./styles";
import Modal from "./modal";

function Edit({ route, navigation }) {
	const isCreateMode = !route.params;
	const { joinedTasks: tasks, setTasks } = useTaskContext();
	const { lists } = useListContext();
	const { tags } = useTagContext();
	const [task, setTask] = useState({
		id: Math.random(),
		state: 0,
		dueDate: new Date(),
		listId: lists[0].id,
	});

	useEffect(() => {
		if (!isCreateMode) {
			const { taskId } = route.params;
			setTask(tasks.find(({ id }) => id === taskId));
		}
	}, []);

	const onTagSelected = (id) => {
		setTask((prev) => {
			if (!prev?.tags || !prev.tags.find((tag) => tag.id === id)) {
				const currentTags = prev?.tags || [];
				return {
					...prev,
					tags: [...currentTags, { id }],
				};
			}

			return {
				...prev,
				tags: prev.tags.filter((tag) => tag.id !== id),
			};
		});
	};

	const onSubTaskRemoved = (subTaskId) => {
		setTask((prev) => ({
			...prev,
			subTasks: prev.subTasks.filter(
				(subTask) => subTask.id !== subTaskId
			),
		}));
	};

	const onSubTaskAdded = (subTask) => {
		if (
			!task?.subTasks ||
			!task?.subTasks?.find((sTask) => sTask.id === subTask.id)
		) {
			const currentSubTasks = task?.subTasks || [];

			setTask((prev) => ({
				...prev,
				subTasks: [...currentSubTasks, subTask],
			}));
		} else {
			setTask((prev) => ({
				...prev,
				subTasks: prev.subTasks.map((sTask) =>
					sTask.id === subTask.id ? subTask : sTask
				),
			}));
		}

		setSelectedSubTask({});
	};

	const [isModalOpen, setModalOpen] = useState(false);
	const [selectedSubTask, setSelectedSubTask] = useState();

	const onEditSubTaskPressed = (subTask) => {
		setSelectedSubTask(subTask);
		setModalOpen(true);
	};

	const onSubTaskChecked = (id) => {
		console.log(id);
		setTask((prev) => ({
			...prev,
			subTasks: prev.subTasks.map((subTask) =>
				subTask.id === id
					? {
							...subTask,
							isCompleted: !subTask?.isCompleted,
					  }
					: subTask
			),
		}));
	};

	const onTaskSavedPressed = () => {
		if (isCreateMode) {
			setTasks((prev) => [...prev, task]);
		} else {
			setTasks((prev) =>
				prev.map((t) => (t.id === task.id ? { ...task } : t))
			);
		}

		navigation.goBack();
	};

	const scrollRef = useRef(null);
	// TODO: get param from route.params

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Task:</Text>
				<Pressable onPress={() => navigation.goBack()}>
					<FontAwesome5 name="times" size={22} />
				</Pressable>
			</View>
			<View>
				<TextInput
					numberOfLines={1}
					multiline={false}
					placeholder={task?.title ?? "Title"}
					style={styles.textInputWithBorder}
					value={task?.title || ""}
					onChangeText={(text) => {
						setTask((prev) => ({
							...prev,
							title: text,
						}));
					}}
				/>
				<TextInput
					numberOfLines={10}
					multiline={true}
					placeholder={task?.description ?? "Description"}
					value={task?.description || ""}
					style={[
						styles.textInputWithBorder,
						{
							textAlignVertical: "top",
						},
					]}
					onChangeText={(text) => {
						setTask((prev) => ({
							...prev,
							description: text,
						}));
					}}
				/>
				<View style={styles.selectField}>
					<Text style={styles.selectInputLabel}>List</Text>
					<View style={styles.select}>
						<Picker
							style={{
								margin: -8,
							}}
							selectedValue={task?.listId || lists[0].id}
							onValueChange={(id) => {
								setTask((prev) => ({
									...prev,
									listId: id,
								}));
							}}
						>
							{lists.map(({ id, title }) => (
								<Picker.Item
									key={id}
									label={title}
									value={id}
								/>
							))}
						</Picker>
					</View>
				</View>
				<View style={styles.selectField}>
					<Text style={styles.selectInputLabel}>Due date</Text>
					<Pressable
						style={styles.select}
						onPress={() => {
							DateTimePickerAndroid.open({
								mode: "date",
								minimumDate: new Date(),
								value: task?.dueDate
									? new Date(task.dueDate)
									: new Date(),
								onChange: (event, date) => {
									setTask((prev) => ({
										...prev,
										dueDate: date.toISOString(),
									}));
								},
							});
						}}
					>
						<Text
							style={{
								padding: 9.4,
							}}
						>{`${
							task?.dueDate
								? new Date(task.dueDate).toLocaleDateString()
								: new Date().toLocaleDateString()
						}`}</Text>
					</Pressable>
				</View>
				<View style={styles.selectField}>
					<Text style={styles.selectInputLabel}>Tags</Text>
					<ScrollView
						horizontal={true}
						contentContainerStyle={{
							columnGap: 6,
						}}
					>
						{tags.map(({ id, title, color }) => (
							<Pressable
								key={id}
								style={{
									backgroundColor: color,
									borderRadius: 6,
									opacity: task?.tags?.find(
										(tag) => tag.id === id
									)
										? 1
										: 0.6,
								}}
								onPress={() => onTagSelected(id)}
							>
								<Text
									style={{
										paddingVertical: 6,
										paddingHorizontal: 10,
										color: "#fff",
										fontWeight: "bold",
									}}
								>
									{title}
								</Text>
							</Pressable>
						))}
					</ScrollView>
				</View>
			</View>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Subtask:</Text>
			</View>
			<Pressable
				style={styles.addNewTaskBtn}
				onPress={() => {
					setModalOpen(true);
				}}
			>
				<FontAwesome5 size={16} name="plus" color="#858383" />
				<Text style={styles.addNewTaskBtnTitle}>Add New Task</Text>
			</Pressable>
			<ScrollView style={styles.subTasksContainer} ref={scrollRef}>
				{task?.subTasks?.map((subTask) => (
					<SubTask
						key={subTask.id}
						subTask={subTask}
						onSubTaskRemoved={onSubTaskRemoved}
						simultaneousHandlers={scrollRef}
						onEditSubTaskPressed={onEditSubTaskPressed}
						onSubTaskChecked={onSubTaskChecked}
					/>
				))}
			</ScrollView>
			<Modal
				isVisible={isModalOpen}
				setVisible={() => setModalOpen((prev) => !prev)}
				onSubTaskAdded={onSubTaskAdded}
				subTask={selectedSubTask}
				setSubTask={setSelectedSubTask}
			/>
			<View style={styles.selectedTasksAction}>
				<Pressable onPress={() => navigation.goBack()}>
					<Text
						style={{
							fontSize: 16,
							textDecorationLine: "underline",
							fontWeight: "bold",
						}}
					>
						Cancel
					</Text>
				</Pressable>
				<Pressable
					style={{
						backgroundColor: "#ffd43b",
						borderRadius: 10,
					}}
					onPress={onTaskSavedPressed}
				>
					<Text
						style={{
							padding: 10,
							fontSize: 16,
							fontWeight: "bold",
							minWidth: 80,
							textAlign: "center",
						}}
					>
						Save
					</Text>
				</Pressable>
			</View>
		</View>
	);
}

export default Edit;
